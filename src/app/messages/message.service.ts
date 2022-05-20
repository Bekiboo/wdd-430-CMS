import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageSelectedEvent = new EventEmitter<Message>();
  messageChangedEvent = new EventEmitter<Message[]>()

  private messages: Message[] = [];

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  getMessages() {
    return [...this.messages];
  }

  getMessage(id: string) {
    return this.messages.find((message) => message.id == id);
  }

  addMessage(message: Message) {
    this.messages.push(message)
    this.messageChangedEvent.emit(this.messages.slice())
  }
}
