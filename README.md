# @thomascsd/stools

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)

## About <a name = "about"></a>

My Swiss knife

## Getting Started <a name = "getting_started"></a>

Flowing features;

- Wrap [async-airtable](https://github.com/GV14982/async-airtable) to access AirTable API easily.

### Deep dependency

stools use [typedi](https://github.com/typestack/typedi) as dependency injection, and [async-airtable](https://github.com/GV14982/async-airtable) as access AirTable API.

```
npm install typedi reflect-metadata asyncairtable
```

### Installing

```
npm install @thomascsd/stools
```

## Usage <a name = "usage"></a>

```javascript
import { Service, Container } from 'typedi';
import { DataService, BaseModel, API_KEY_TOKEN } from '@thomascsd/stools';

Container.set(API_KEY_TOKEN, process.env.<your api key>);

const BASE_ID = '<your base id>';

export class Contact extends BaseModel {
  name: string;
  email: string;
  mobile: string;
}

@Service()
export class ContactService {
  constructor(private db: DataService) {}

  async getContacts(): Promise<Contact[]> {
    return await this.db.getDatas<Contact>(BASE_ID, '<your table name of AirTable>');
  }

  async saveContact(contact: Contact) {
    return await this.db.saveData<Contact>(BASE_ID, '<your table name of AirTable>', contact);
  }

  async updateContact(contact: Contact) {
    return await this.db.updateData<Contact>(BASE_ID, '<your table name of AirTable>', contact);
  }
}

```
