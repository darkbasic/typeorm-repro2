import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import { Chat } from "./entity/Chat";
import { Message, MessageType } from "./entity/Message";
import { Recipient } from "./entity/Recipient";

createConnection().then(async connection => {

  async function addSampleData() {
    const user1 = new User({
      username: 'ethan',
      password: '$2a$08$NO9tkFLCoSqX1c5wk3s7z.JfxaVMKA.m7zUDdDwEquo4rvzimQeJm', // 111
      name: 'Ethan Gonzalez',
      picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
      phone: '+391234567890',
    });
    await connection.manager.save(user1);

    const user3 = new User({
      username: 'avery',
      password: '$2a$08$UHgH7J8G6z1mGQn2qx2kdeWv0jvgHItyAsL9hpEUI3KJmhVW5Q1d.', // 333
      name: 'Avery Stewart',
      picture: 'https://randomuser.me/api/portraits/thumb/women/1.jpg',
      phone: '+391234567892',
    });
    await connection.manager.save(user3);




    await connection.manager.save(new Chat({
      allTimeMembers: [user1, user3],
      listingMembers: [user1, user3],
      messages: [
        new Message({
          sender: user1,
          content: 'You on your way?',
          type: 1,
          holders: [user1, user3],
          recipients: [
            new Recipient({
              user: user3,
            }),
          ],
        }),
        new Message({
          sender: user3,
          content: 'Yep!',
          type: 1,
          holders: [user1, user3],
          recipients: [
            new Recipient({
              user: user1,
            }),
          ],
        }),
      ],
    }));
  }
  await addSampleData();




  /*const message = await connection
    .createQueryBuilder(Message, "message")
    .whereInIds(1)
    .getOne();
  console.log(message);
  await connection.getRepository(Message).remove(message);*/

  const recipients = await connection
    .createQueryBuilder(Recipient, "recipient")
    .innerJoin('recipient.message', 'message', 'message.id = :messageId', {messageId: 1})
    .getMany();
  for (let recipient of recipients) {
    console.log(recipient);
    try {
      await connection.getRepository(Recipient).remove(recipient);
    } catch (e) {
      console.error(e);
    }
  }

}).catch(error => console.log(error));
