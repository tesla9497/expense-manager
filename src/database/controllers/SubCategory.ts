import { BSON } from "realm";
import { useQuery, useRealm } from "@realm/react";
// Types
import { SubCategoryType } from "@/types/database";
// Models
import { SubCategory } from "../model";

export const useSubCategory = () => {
  const realm = useRealm();
  const subCategory = useQuery(SubCategory);

  const addSubCategory = (subCategory: SubCategoryType) => {
    realm.write(() => {
      realm.create("SubCategory", {
        _id: new BSON.ObjectId(),
        ...subCategory,
      });
    });
  };

  const updateSubCategory = (subCategory: SubCategoryType) => {
    realm.write(() => {
      realm.create("SubCategory", subCategory, true);
    });
  };

  const deleteSubCategory = (id: string) => {
    const subCategory = realm.objectForPrimaryKey("SubCategory", id);
    if (subCategory) {
      realm.write(() => {
        realm.delete(subCategory);
      });
    }
  };

  return {
    subCategory,
    addSubCategory,
    updateSubCategory,
    deleteSubCategory,
  };
};
