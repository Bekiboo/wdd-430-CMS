import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageSelectedEvent = new Subject<Message>();
  messageChangedEvent = new Subject<Message[]>()

  private messages: Message[] = [];
  maxMessageId: number

  constructor(private http: HttpClient) {
    this.messages = this.getMessages();
  }

  getMessages(): Message[] {
    this.http
      .get(
        'https://cms-wdd430-connault-9ca0c-default-rtdb.firebaseio.com/messages.json'
      )
      .subscribe({
        next: (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messages.sort();
          this.messageChangedEvent.next([...this.messages]);
        },
        error: (e) => console.log(e.message),
      });
    return;
  }

  getMessage(id: string) {
    return this.messages.find((message) => message.id == id);
  }

  storeMessage() {
    const messagesJson = JSON.stringify(this.messages);
    this.http
      .put(
        'https://cms-wdd430-connault-9ca0c-default-rtdb.firebaseio.com/messages.json',
        messagesJson,
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
      .subscribe(() => {
        this.messageChangedEvent.next([...this.messages]);
      });
  }

  addMessage(message: Message) {
    this.messages.push(message)
    this.storeMessage()
  }

  getMaxId(): number {
    let messageIds: number[] = [];
    this.messages.forEach((message) => {
      messageIds.push(parseInt(message.id));
    });
    return Math.max(...messageIds);
  }
}
