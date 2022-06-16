import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  private contacts: Contact[] = [];
  private maxContactId: number;

  constructor(private http: HttpClient) {
    this.contacts = this.getContacts();
  }

  getContacts(): Contact[] {
    this.http
      .get(
        'https://cms-wdd430-connault-9ca0c-default-rtdb.firebaseio.com/contacts.json'
      )
      .subscribe({
        next: (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort();
          this.contactListChangedEvent.next([...this.contacts]);
        },
        error: (e) => console.log(e.message),
      });
    return;
  }

  getContact(id: string) {
    return this.contacts.find((contact) => contact.id == id);
  }

  storeContact() {
    const contactsJson = JSON.stringify(this.contacts);
    this.http
      .put(
        'https://cms-wdd430-connault-9ca0c-default-rtdb.firebaseio.com/contacts.json',
        contactsJson,
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
      .subscribe(() => {
        this.contactListChangedEvent.next([...this.contacts]);
      });
  }

  addContact(newContact: Contact) {
    if (!newContact) return;

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContact()
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) return;

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContact()
  }

  deleteContact(contact: Contact) {
    if (!contact) return;
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;

    this.contacts.splice(pos, 1);
    this.storeContact()
  }

  getMaxId(): number {
    let contactIds: number[] = [];
    this.contacts.forEach((contact) => {
      contactIds.push(parseInt(contact.id));
    });
    return Math.max(...contactIds);
  }
}
