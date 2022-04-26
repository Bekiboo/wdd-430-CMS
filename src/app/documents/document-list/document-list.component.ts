import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

  documents: Document[] = [
    new Document(
      '1',
      'CIT 260 - Object Oriented Programming',
      'Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'https://www.youtube.com/watch?v=NCHYDtA60-g',
      null
    ),
    new Document(
      '2',
      'CIT 366 - Full Stack Web Dev',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'https://www.youtube.com/watch?v=NCHYDtA60-g',
      null
    ),
    new Document(
      '3',
      'CIT 425 - Data Warehousing',
      'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'https://www.youtube.com/watch?v=NCHYDtA60-g',
      null
    ),
    new Document(
      '4',
      'CIT 460 - Enterprise Dev',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'https://www.youtube.com/watch?v=NCHYDtA60-g',
      null
    ),
    new Document(
      '5',
      'CIT 495 - Senior Practicum',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      'https://www.youtube.com/watch?v=NCHYDtA60-g',
      null
    ),
  ];

  constructor() {}

  ngOnInit(): void {}
}
