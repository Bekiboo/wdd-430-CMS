import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('1', 'Meeting', 'Can I meet with you sometime? I need help with assignment 3', 'Mark Smith'),
    new Message('2', 'Assignment', 'When is assignment 3 due?', 'Bro. Jackson'),
    new Message('3', 'Grades', 'The grades for this assignment have been posted', 'Steve Johnson')
  ]

  onAddMessage(message: Message) {
    this.messages.push(message)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
