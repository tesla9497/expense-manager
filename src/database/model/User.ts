import Realm, { BSON } from "realm";

export class User extends Realm.Object<User> {
  _id: BSON.ObjectId = new BSON.ObjectId();
  name!: string;
  email!: string;
  avatar?: string;
  role: string = "guest";
  created: Date = new Date();
  modified!: Date;

  static primaryKey = "_id";
}
