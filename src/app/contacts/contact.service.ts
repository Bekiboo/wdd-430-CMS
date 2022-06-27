import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelectedEvent = new Subject<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  private contacts: Contact[] = [];

  constructor(private http: HttpClient) {
    this.contacts = this.getContacts();
  }

  getContacts(): Contact[] {
    this.http.get('http://localhost:3000/contacts').subscribe({
      next: (contacts: Contact[]) => {
        this.contacts = contacts;
        this.sortAndSend();

        this.contactListChangedEvent.next([...this.contacts]);
      },
      error: (e) => console.log(e.message),
    });
    return;
  }

  getContact(id: any) {
    return this.contacts.find((contact) => contact.id == id);
  }

  sortAndSend() {
    this.contacts.sort();
    this.contactListChangedEvent.next([...this.contacts]);
  }

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; contact: Contact }>(
        'http://localhost:3000/contacts',
        contact,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new contact to contacts
        this.contacts.push(responseData.contact);
        this.sortAndSend();
      });
  }

  updateContact(originalContact: Contact, newContact: Contact) {    
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex((d) => d.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Contact to the id of the old Contact
    newContact.id = originalContact.id;
    newContact._id = originalContact._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });    

    // update database
    this.http
      .put('http://localhost:3000/contacts/' + originalContact.id, newContact, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.contacts[pos] = newContact;
        this.sortAndSend();
      });
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex((d) => d.id === contact.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe((response: Response) => {
        this.contacts.splice(pos, 1);
        this.sortAndSend();
      });
  }
}
