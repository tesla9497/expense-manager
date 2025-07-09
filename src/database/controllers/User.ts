import { BSON } from "realm";
import { useQuery, useRealm } from "@realm/react";
// Types
import { UserType } from "@/types/database";
// Models
import { User } from "../model";

const useUserDatabase = () => {
  const realm = useRealm();
  const user = useQuery<User>(User);

  const createUser = (usr: UserType) => {
    realm.write(() => {
      realm.create("User", {
        _id: new BSON.ObjectId(),
        ...usr,
      });
    });
  };

  const deleteUser = () => {
    if (user) {
      realm.write(() => {
        realm.delete(user);
      });
    }
  };

  const updateUser = (usr: UserType) => {
    realm.write(() => {
      realm.create("User", usr, true);
    });
  };

  return {
    user,
    createUser,
    deleteUser,
    updateUser,
  };
};
export { useUserDatabase };
