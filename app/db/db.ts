import PouchDB from 'pouchdb';

import CardHandler from '../models/card';

class DB {
  db: PouchDB.Database;

  Card: CardHandler;

  constructor() {
    this.db = new PouchDB('dev');

    this.Card = new CardHandler(this.db);

    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.logInitialization(this.db);
    }
  }

  logInitialization = async (db: PouchDB.Database) => {
    try {
      const info = await db.info();
      // eslint-disable-next-line no-console
      console.log(info);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to get DB info', err);
    }
  };
}

export default new DB();
