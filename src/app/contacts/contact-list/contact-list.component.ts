import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  selectedContact: Contact

  constructor(private contactService: ContactService) {}

  contacts: Contact[];

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactchangedEvent.subscribe(
      (array: Contact[]) => {this.contacts = array}
    );
  }
}
