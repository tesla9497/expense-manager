import Realm, { BSON } from "realm";

export class SubCategory extends Realm.Object {
  _id: BSON.ObjectId = new BSON.ObjectId();
  name!: string;
  icon?: string;
  category!: BSON.ObjectId;
  created: Date = new Date();
  modified!: Date;

  static primaryKey = "_id";
}
