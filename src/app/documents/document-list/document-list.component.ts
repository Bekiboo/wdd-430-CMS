import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  selectedDocument: Document;

  constructor(private documentService: DocumentService) {}

  documents: Document[];

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.documentService.documentChangedEvent.subscribe(
      (array: Document[]) => {this.documents = array}
    );
  }
}
