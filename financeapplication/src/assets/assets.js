import applogo from './applogo.png';
import arrow from './arrow.png';
import cards from './atm-card.png'
import tickmark from './tickmark.png';
import trash from './trash.png';
import closemark from './close.png';
import search from './search.png';
import income from './income.png';
import spending from './spending.png';
import balance from './balance.png';
import picture1 from './picture1.jpeg';
import picture2 from './picture2.jpeg';
import picture3 from './picture3.jpeg';

export const assets = {
    applogo,
    arrow,
    cards,
    tickmark,
    trash,
    closemark,
    search,
    income,
    spending,
    balance,
    picture1,
    picture2,
    picture3
}

export const expenseCategories = ["Food", "Entertainment", "Shopping", "Transportation", "Housing"];
export const incomeCategories = ["Income", "Passive Income", "Freelancing", "Business", "Bonus"];
export const goalCategories = ["Savings", "Travel Fund", "Emergency", "Bike"];
export const paymentTypeCategories = ["Cash", "UPI", "Card", "Bank Transfer"];
export const budgetCategories = ["Food", "Entertainment", "Shopping", "Transportation", "Housing"];
export const budgetedCategories = [
    {
        id: 1,
        category: "Food",
        spent: 500,
        limit: 3000
    },
    {
        id: 2,
        category: "Shopping",
        spent: 3000,
        limit: 5000
    }
]
export const goalCreationCategories = ["New Vechicle", "New Home", "Holiday Trip", "Emergency Fund", "Health Care"];
export const createdGoalCategories = [
    {
        id: 1,
        category: "New Home",
        goal: 1000000,
        targetDate: new Date(31 - 12 - 2028)
    },
    {
        id: 2,
        category: "Emergency Fund",
        goal: 200000,
        targetDate: new Date(30 - 6 - 2026)
    }
]




export const USPopularStocks = [
    {
        name: "Alphabet Inc",
        symbol : "GOOGL"
    },
    {
        name: "Microsoft Corp",
        symbol : "MSFT"
    },
    {
        name: "Amazon.com Inc",
        symbol : "AMZN"
    },
    {
        name: "Apple Inc",
        symbol : "AAPL"
    },
    {
        name: "Tesla Inc",
        symbol: "TSLA"
    }
]

export const CATEGORY_COLORS = {
  Food: "#4F46E5",
  Housing: "#22C55E",
  Shopping: "#F97316",
  Transportation: "#06B6D4",
  Entertainment: "#EC4899",
  Others: "#9CA3AF"
};

export const GOAL_COLORS = {
  "New Vechicle": "#4F46E5",
  "New Home": "#22C55E",
  "Holiday Trip": "#F97316",
  "Emergency Fund": "#06B6D4",
  "Health Care": "#EC4899",
  Others: "#9CA3AF"
};




export default assets