import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit, OnDestroy {
  selectedContact: Contact
  contacts: Contact[];
  subscription: Subscription

  constructor(private contactService: ContactService) {}


  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (array: Contact[]) => {this.contacts = array}
    );
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }
}
