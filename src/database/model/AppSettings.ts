import Realm, { BSON } from "realm";

export class AppSettings extends Realm.Object<AppSettings> {
  _id: BSON.ObjectId = new BSON.ObjectId();
  encrypted: boolean = false;

  static primaryKey = "_id";
}
