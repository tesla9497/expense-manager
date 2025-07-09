import Realm, { BSON } from "realm";

export class Category extends Realm.Object {
  _id: BSON.ObjectId = new BSON.ObjectId();
  name!: string;
  icon?: string;
  type!: string;
  custom?: boolean;
  created: Date = new Date();
  modified!: Date;

  static primaryKey = "_id";
}
