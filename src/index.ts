import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import { Chat } from "./entity/Chat";
import { Message, MessageType } from "./entity/Message";
import { Recipient } from "./entity/Recipient";

createConnection().then(async connection => {

  const user1 = new User({
    username: 'ethan',
    password: '$2a$08$NO9tkFLCoSqX1c5wk3s7z.JfxaVMKA.m7zUDdDwEquo4rvzimQeJm', // 111
    name: 'Ethan Gonzalez',
    picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
    phone: '+391234567890',
  });
  await connection.manager.save(user1);

  const user5 = new User({
    username: 'ray',
    password: '$2a$08$6.mbXqsDX82ZZ7q5d8Osb..JrGSsNp4R3IKj7mxgF6YGT0OmMw242', // 555
    name: 'Ray Edwards',
    picture: 'https://randomuser.me/api/portraits/thumb/men/3.jpg',
    phone: '+391234567894',
  });
  await connection.manager.save(user5);




  /*await connection.manager.save(new Chat({
    allTimeMembers: [user1, user5],
    listingMembers: [user1, user5],
    messages: [
      new Message({
        sender: user1,
        content: 'I should buy a boat',
        type: MessageType.TEXT,
        holders: [user1, user5],
        recipients: [
          new Recipient({
            user: user5,
          }),
        ],
      }),
      new Message({
        sender: user1,
        content: 'You still there?',
        type: MessageType.TEXT,
        holders: [user1, user5],
        recipients: [
          new Recipient({
            user: user5,
          }),
        ],
      }),
    ],
  }));*/




  /*const chat1 = new Chat({
    allTimeMembers: [user1, user5],
    listingMembers: [user1, user5],
  });
  await connection.manager.save(chat1);

  await connection.manager.save([
    new Message({
      chat: chat1,
      sender: user1,
      content: 'I should buy a boat',
      type: MessageType.TEXT,
      holders: [user1, user5],
      recipients: [
        new Recipient({
          user: user5,
        }),
      ],
    }),
    new Message({
      chat: chat1,
      sender: user1,
      content: 'You still there?',
      type: MessageType.TEXT,
      holders: [user1, user5],
      recipients: [
        new Recipient({
          user: user5,
        }),
      ],
    })
  ]);*/




  const chat1 = new Chat({
    allTimeMembers: [user1, user5],
    listingMembers: [user1, user5],
  });
  await connection.manager.save(chat1);

  await connection.manager.save(new Message({
    chat: chat1,
    sender: user1,
    content: 'I should buy a boat',
    type: MessageType.TEXT,
    holders: [user1, user5],
    recipients: [
      new Recipient({
        user: user5,
      }),
    ],
  }));

  await connection.manager.save(new Message({
    chat: chat1,
    sender: user1,
    content: 'You still there?',
    type: MessageType.TEXT,
    holders: [user1, user5],
    recipients: [
      new Recipient({
        user: user5,
      }),
    ],
  }));




  const messages = await connection.manager.find(Message);
  console.log(messages);

  const recipients = await connection.manager.find(Recipient);
  console.log(recipients);

}).catch(error => console.log(error));
