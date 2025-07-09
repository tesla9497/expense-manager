import Realm, { BSON } from "realm";

export class GeneralSettings extends Realm.Object<GeneralSettings> {
  _id: BSON.ObjectId = new BSON.ObjectId();
  onboarded: boolean = false;
  defaultAccount?: BSON.ObjectId;
  defaultCategory?: BSON.ObjectId;
  defaultSubcategory?: BSON.ObjectId;
  weekStart?: string = "monday";

  static primaryKey = "_id";
}
