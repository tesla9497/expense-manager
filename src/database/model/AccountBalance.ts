import Realm, { BSON } from "realm";

export class AccountBalance extends Realm.Object {
  _id: BSON.ObjectId = new BSON.ObjectId();
  account_id!: BSON.ObjectId;
  balance!: number;
  created: Date = new Date();
  modified!: Date;

  static primaryKey = "_id";
}
