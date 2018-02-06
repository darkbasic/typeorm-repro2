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

    const user2 = new User({
      username: 'bryan',
      password: '$2a$08$xE4FuCi/ifxjL2S8CzKAmuKLwv18ktksSN.F3XYEnpmcKtpbpeZgO', // 222
      name: 'Bryan Wallace',
      picture: 'https://randomuser.me/api/portraits/thumb/men/2.jpg',
      phone: '+391234567891',
    });
    await connection.manager.save(user2);

    const user3 = new User({
      username: 'avery',
      password: '$2a$08$UHgH7J8G6z1mGQn2qx2kdeWv0jvgHItyAsL9hpEUI3KJmhVW5Q1d.', // 333
      name: 'Avery Stewart',
      picture: 'https://randomuser.me/api/portraits/thumb/women/1.jpg',
      phone: '+391234567892',
    });
    await connection.manager.save(user3);

    const user4 = new User({
      username: 'katie',
      password: '$2a$08$wR1k5Q3T9FC7fUgB7Gdb9Os/GV7dGBBf4PLlWT7HERMFhmFDt47xi', // 444
      name: 'Katie Peterson',
      picture: 'https://randomuser.me/api/portraits/thumb/women/2.jpg',
      phone: '+391234567893',
    });
    await connection.manager.save(user4);

    const user5 = new User({
      username: 'ray',
      password: '$2a$08$6.mbXqsDX82ZZ7q5d8Osb..JrGSsNp4R3IKj7mxgF6YGT0OmMw242', // 555
      name: 'Ray Edwards',
      picture: 'https://randomuser.me/api/portraits/thumb/men/3.jpg',
      phone: '+391234567894',
    });
    await connection.manager.save(user5);

    const user6 = new User({
      username: 'niko',
      password: '$2a$08$fL5lZR.Rwf9FWWe8XwwlceiPBBim8n9aFtaem.INQhiKT4.Ux3Uq.', // 666
      name: 'Niccolò Belli',
      picture: 'https://randomuser.me/api/portraits/thumb/men/4.jpg',
      phone: '+391234567895',
    });
    await connection.manager.save(user6);

    const user7 = new User({
      username: 'mario',
      password: '$2a$08$nDHDmWcVxDnH5DDT3HMMC.psqcnu6wBiOgkmJUy9IH..qxa3R6YrO', // 777
      name: 'Mario Rossi',
      picture: 'https://randomuser.me/api/portraits/thumb/men/5.jpg',
      phone: '+391234567896',
    });
    await connection.manager.save(user7);




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

    await connection.manager.save(new Chat({
      allTimeMembers: [user1, user4],
      listingMembers: [user1, user4],
      messages: [
        new Message({
          sender: user1,
          content: 'Hey, it\'s me',
          type: 1,
          holders: [user1, user4],
          recipients: [
            new Recipient({
              user: user4,
            }),
          ],
        }),
      ],
    }));

    await connection.manager.save(new Chat({
      allTimeMembers: [user1, user5],
      listingMembers: [user1, user5],
      messages: [
        new Message({
          sender: user1,
          content: 'I should buy a boat',
          type: 1,
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
          type: 1,
          holders: [user1, user5],
          recipients: [
            new Recipient({
              user: user5,
            }),
          ],
        }),
      ],
    }));

    await connection.manager.save(new Chat({
      allTimeMembers: [user3, user4],
      listingMembers: [user3, user4],
      messages: [
        new Message({
          sender: user3,
          content: 'Look at my mukluks!',
          type: 1,
          holders: [user3, user4],
          recipients: [
            new Recipient({
              user: user4,
            }),
          ],
        }),
      ],
    }));

    await connection.manager.save(new Chat({
      allTimeMembers: [user2, user5],
      listingMembers: [user2, user5],
      messages: [
        new Message({
          sender: user2,
          content: 'This is wicked good ice cream.',
          type: 1,
          holders: [user2, user5],
          recipients: [
            new Recipient({
              user: user5,
            }),
          ],
        }),
        new Message({
          sender: user5,
          content: 'Love it!',
          type: 1,
          holders: [user2, user5],
          recipients: [
            new Recipient({
              user: user2,
            }),
          ],
        }),
      ],
    }));

    await connection.manager.save(new Chat({
      allTimeMembers: [user1, user6],
      listingMembers: [user1],
    }));

    await connection.manager.save(new Chat({
      allTimeMembers: [user2, user1],
      listingMembers: [user2],
    }));

    await connection.manager.save(new Chat({
      name: 'Ethan\'s group',
      picture: 'https://randomuser.me/api/portraits/thumb/lego/1.jpg',
      allTimeMembers: [user1, user3, user4, user6],
      listingMembers: [user1, user3, user4, user6],
      actualGroupMembers: [user1, user4, user6],
      admins: [user1, user6],
      owner: user1,
      messages: [
        new Message({
          sender: user1,
          content: 'I made a group',
          type: 1,
          holders: [user1, user3, user4, user6],
          recipients: [
            new Recipient({
              user: user3,
            }),
            new Recipient({
              user: user4,
            }),
            new Recipient({
              user: user6,
            }),
          ],
        }),
        new Message({
          sender: user1,
          content: 'Ops, Avery was not supposed to be here',
          type: 1,
          holders: [user1, user4, user6],
          recipients: [
            new Recipient({
              user: user4,
            }),
            new Recipient({
              user: user6,
            }),
          ],
        }),
        new Message({
          sender: user4,
          content: 'Awesome!',
          type: 1,
          holders: [user1, user4, user6],
          recipients: [
            new Recipient({
              user: user1,
            }),
            new Recipient({
              user: user6,
            }),
          ],
        }),
      ],
    }));

    await connection.manager.save(new Chat({
      name: 'Ray\'s group',
      allTimeMembers: [user3, user6],
      listingMembers: [user3, user6],
      actualGroupMembers: [user3, user6],
      admins: [user6],
      owner: user6,
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
