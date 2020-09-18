export interface CardModel {
  front: string;
  back: string;
}

class CardHandler {
  db: PouchDB.Database;

  constructor(db: PouchDB.Database) {
    this.db = db;
  }

  put = async (card: CardModel) => {
    this.db.put(card);
  };
}

export default CardHandler;
