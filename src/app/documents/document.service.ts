import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentSelectedEvent = new Subject<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  private documents: Document[] = [];

  constructor(private http: HttpClient) {
    this.documents = this.getDocuments();
  }

  getDocuments(): Document[] {
    this.http.get('http://localhost:3000/documents').subscribe({
      next: (documents: Document[]) => {
        this.documents = documents;
        this.sortAndSend();
      },
      error: (e) => console.log(e.message),
    });
    return;
  }

  getDocument(id: string) {
    return this.documents.find((document) => document.id == id);
  }

  sortAndSend() {
    this.documents.sort();
    this.documentListChangedEvent.next([...this.documents]);
  }

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; document: Document }>(
        'http://localhost:3000/documents',
        document,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        this.sortAndSend();
      });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex((d) => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    // newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put(
        'http://localhost:3000/documents/' + originalDocument.id,
        newDocument,
        { headers: headers }
      )
      .subscribe((response: Response) => {
        this.documents[pos] = newDocument;
        this.sortAndSend();
      });
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex((d) => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete('http://localhost:3000/documents/' + document.id)
      .subscribe((response: Response) => {
        this.documents.splice(pos, 1);
        this.sortAndSend();
      });
  }
}
