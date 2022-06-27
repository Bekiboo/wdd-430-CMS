import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageSelectedEvent = new Subject<Message>();
  messageChangedEvent = new Subject<Message[]>();

  private messages: Message[] = [];

  constructor(private http: HttpClient) {
    // this.messages = this.getMessages();
  }

  getMessages(): Message[] {    
    this.http.get('http://localhost:3000/messages').subscribe({
      next: (messages: Message[]) => {
        this.messages = messages;         
        this.sortAndSend();
      },
      error: (e) => console.log(e.message),
    });
    return;
  }

  getMessage(id: string) {
    return this.messages.find((message) => message.id == id);
  }

  sortAndSend() {
    this.messages.sort();
    this.messageChangedEvent.next([...this.messages]);
  }

  addMessage(message: Message) {
    if (!message) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; msg: Message }>(
        'http://localhost:3000/messages',
        message,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new message to messages
        this.messages.push(responseData.msg);
        this.sortAndSend();
      });
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) {
      return;
    }

    const pos = this.messages.findIndex((d) => d.id === originalMessage.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Message to the id of the old Message
    newMessage.id = originalMessage.id;
    newMessage._id = originalMessage._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put('http://localhost:3000/messages/' + originalMessage.id, newMessage, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.messages[pos] = newMessage;
        this.sortAndSend();
      });
  }

  deleteMessage(message: Message) {
    if (!message) {
      return;
    }

    const pos = this.messages.findIndex((d) => d.id === message.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete('http://localhost:3000/messages/' + message.id)
      .subscribe((response: Response) => {
        this.messages.splice(pos, 1);
        this.sortAndSend();
      });
  }
}
