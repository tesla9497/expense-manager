import Realm, { BSON } from "realm";

export class Account extends Realm.Object {
  _id: BSON.ObjectId = new BSON.ObjectId();
  name!: string;
  start_balance!: number;
  account_type?: string;
  icon?: string;
  color?: string;
  date!: Date;
  created: Date = new Date();
  modified!: Date;

  static primaryKey = "_id";
}
