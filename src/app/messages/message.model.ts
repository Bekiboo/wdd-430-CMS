import { Contact } from "../contacts/contact.model";

export class Message {
  _id: Contact;
    constructor(
      public id: string,
      public subject: string,
      public msgText: string,
      public sender: string,
    ) {}
  }
  