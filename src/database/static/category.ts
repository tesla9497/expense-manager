import { BSON } from "realm";
// prettier-ignore
export const EXPENSE_CATEGORIES = [
  { _id: new BSON.ObjectId(), icon: "Food", name: "Food", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Clothing", name: "Clothing", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Entertainment", name: "Entertainment", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Health", name: "Health", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Travel", name: "Travel", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Stationery", name: "Stationery", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Gift", name: "Gift", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Taxi", name: "Taxi", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Cosmetics", name: "Cosmetics", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Other", name: "Other", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Groceries", name: "Groceries", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Utilities", name: "Utilities", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Rent", name: "Rent", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Savings", name: "Savings", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Insurance", name: "Insurance", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Investments", name: "Investments", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Subscriptions", name: "Subscriptions", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Charity", name: "Charity", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "PetCare", name: "Pet Care", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Electronics", name: "Electronics", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "HomeImprovement", name: "Home Improvement", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Furniture", name: "Furniture", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Automobile", name: "Automobile", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Education", name: "Education", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "ChildCare", name: "Child Care", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Fitness", name: "Fitness", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Books", name: "Books", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Movies", name: "Movies", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Music", name: "Music", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Gaming", name: "Gaming", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "WorkExpenses", name: "Work Expenses", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Medical", name: "Medical", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "PersonalCare", name: "Personal Care", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Party", name: "Party", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Alcohol", name: "Alcohol", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Toys", name: "Toys", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Gardening", name: "Gardening", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Hobbies", name: "Hobbies", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Photography", name: "Photography", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Beauty", name: "Beauty", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Tools", name: "Tools", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Art", name: "Art", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Crafts", name: "Crafts", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "DIY", name: "DIY", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Bills", name: "Bills", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Taxes", name: "Taxes", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Loans", name: "Loans", type: "Expense", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId("664444444444444444444444"), icon: "Other", name: "Other", type: "Expense", custom: false, created: new Date(), modified: new Date() },
];
// prettier-ignore
export const INCOME_CATEGORIES = [
  { _id: new BSON.ObjectId(), icon: "Salary", name: "Salary", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Business", name: "Business", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Freelancing", name: "Freelancing", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Investments", name: "Investments", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Dividends", name: "Dividends", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "RentalIncome", name: "Rental Income", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Interest", name: "Interest", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Royalties", name: "Royalties", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "SideHustle", name: "Side Hustle", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Gifts", name: "Gifts", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Bonuses", name: "Bonuses", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Commission", name: "Commission", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "GovernmentBenefits", name: "Government Benefits", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Pension", name: "Pension", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "TaxRefund", name: "Tax Refund", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Scholarship", name: "Scholarship", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Grants", name: "Grants", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Lottery", name: "Lottery", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Cashback", name: "Cashback", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Crowdfunding", name: "Crowdfunding", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "StockTrading", name: "Stock Trading", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "CryptoEarnings", name: "Crypto Earnings", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Inheritance", name: "Inheritance", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Consulting", name: "Consulting", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Tutoring", name: "Tutoring", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "Resale", name: "Resale", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId(), icon: "PassiveIncome", name: "Passive Income", type: "Income", custom: false, created: new Date(), modified: new Date() },
  { _id: new BSON.ObjectId("664444444444444444444444"), icon: "Other", name: "Other", type: "Income", custom: false, created: new Date(), modified: new Date() },
];
