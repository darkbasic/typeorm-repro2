import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, CreateDateColumn
} from "typeorm";
import { Chat } from "./Chat";
import { User } from "./User";
import { Recipient } from "./Recipient";

export enum MessageType {
  TEXT,
  LOCATION,
  PICTURE,
}

interface MessageConstructor {
  sender?: User;
  content?: string;
  type?: MessageType;
  recipients?: Recipient[];
  holders?: User[];
  chat?: Chat;
}

@Entity()
export class Message {
  constructor({sender, content, type, recipients, holders, chat}: MessageConstructor = {}) {
    if (sender) {
      this.sender = sender;
    }
    if (content) {
      this.content = content;
    }
    if (type) {
      this.type = type;
    }
    if (recipients) {
      this.recipients = recipients.map(recipient => ({...recipient, message: this}));
    }
    if (holders) {
      this.holders = holders;
    }
    if (chat) {
      this.chat = chat;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.senderMessages, {eager: true})
  sender: User;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: number;

  @Column({nullable: true})
  type: MessageType;

  @OneToMany(type => Recipient, recipient => recipient.message, {cascade: true, eager: true})
  recipients: Recipient[];

  @ManyToMany(type => User, user => user.holderMessages, {eager: true})
  @JoinTable()
  holders: User[];

  @ManyToOne(type => Chat, chat => chat.messages)
  chat: Chat;
}
