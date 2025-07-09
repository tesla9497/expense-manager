import Realm, { BSON } from "realm";

export class UserPreference extends Realm.Object<UserPreference> {
  _id: BSON.ObjectId = new BSON.ObjectId();
  currency: string = "USD";
  currency_symbol: string = "$";
  language: string = "en";
  region: string = "US";
  date_format: string = "dd/mm/yyyy";
  dark_mode: boolean = false;
  notifications: boolean = true;
  once_done: boolean = false;
  static primaryKey = "_id";
}
