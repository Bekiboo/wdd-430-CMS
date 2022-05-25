import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactchangedEvent = new EventEmitter<Contact[]>();

  private contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts() {
    return [...this.contacts];
  }

  getContact(id: string) {
    return this.contacts.find((contact) => contact.id == id);
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    console.log(this.contacts.slice());
    
    this.contactchangedEvent.emit(this.contacts.slice());
  }
}
