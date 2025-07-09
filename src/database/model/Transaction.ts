import Realm, { BSON } from "realm";

export class Transaction extends Realm.Object {
  _id: BSON.ObjectId = new BSON.ObjectId();
  account_id?: BSON.ObjectId;
  to_account_id?: BSON.ObjectId;
  from_account_id?: BSON.ObjectId;
  transaction_type!: string;
  amount!: number;
  description!: string;
  category?: BSON.ObjectId;
  subcategory?: BSON.ObjectId;
  running_balance?: number;
  to_running_balance?: number;
  from_running_balance?: number;
  iscleared: boolean = false;
  date!: Date;
  created: Date = new Date();
  modified!: Date;

  static primaryKey = "_id";
}
