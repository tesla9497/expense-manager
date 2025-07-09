import { BSON } from "realm";
import { useQuery, useRealm } from "@realm/react";
// Types
import { CategoryType } from "@/types/database";
// Models
import { Category } from "../model";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../static/category";

export const useCategory = () => {
  const realm = useRealm();
  const categories = useQuery(Category);
  const category = [
    ...EXPENSE_CATEGORIES,
    ...INCOME_CATEGORIES,
    ...categories,
  ].sort((a, b) => a.name.localeCompare(b.name));

  const addCategory = (category: CategoryType) => {
    realm.write(() => {
      realm.create("Category", {
        _id: new BSON.ObjectId(),
        ...category,
      });
    });
  };

  const updateCategory = (category: CategoryType) => {
    realm.write(() => {
      realm.create("Category", category, true);
    });
  };

  const deleteCategory = (id: BSON.ObjectId) => {
    const category = realm.objectForPrimaryKey("Category", id);
    if (category) {
      realm.write(() => {
        realm.delete(category);
      });
    }
  };

  return {
    category,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};
