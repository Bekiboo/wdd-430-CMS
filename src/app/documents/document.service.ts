import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  private documents: Document[] = [];
  private maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.documents = this.getDocuments();
  }

  getDocuments(): Document[] {
    this.http
      .get(
        'https://cms-wdd430-connault-9ca0c-default-rtdb.firebaseio.com/documents.json'
      )
      .subscribe({
        next: (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort();
          this.documentListChangedEvent.next([...this.documents]);
        },
        error: (e) => console.log(e.message),
      });
    return;
  }

  getDocument(id: string) {
    return this.documents.find((document) => document.id == id);
  }

  storeDocument() {
    const documentsJson = JSON.stringify(this.documents);
    this.http
      .put(
        'https://cms-wdd430-connault-9ca0c-default-rtdb.firebaseio.com/documents.json',
        documentsJson,
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
      .subscribe(() => {
        this.documentListChangedEvent.next([...this.documents]);
      });
  }

  addDocument(newDocument: Document) {
    if (!newDocument) return;

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocument()
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) return;

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) return;

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocument()
  }

  deleteDocument(document: Document) {
    if (!document) return;
    const pos = this.documents.indexOf(document);
    if (pos < 0) return;

    this.documents.splice(pos, 1);
    this.storeDocument()
  }

  getMaxId(): number {
    let documentIds: number[] = [];
    this.documents.forEach((document) => {
      documentIds.push(parseInt(document.id));
    });
    return Math.max(...documentIds);
  }
}
