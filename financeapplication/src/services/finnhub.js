const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY
const BASE_URL = "/finnhub/api/v1"

export const searchStocks = async (query) => {
    const res = await fetch(
        `${BASE_URL}/search?q=${query}&token=${API_KEY}`
    )
    if (!res.ok) throw new Error("Search failed")
    return res.json()
}

export const getQuote = async (symbol) => {
    const res = await fetch(
        `${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`
    )
    if (!res.ok) throw new Error("Quote failed")
    return res.json()
}

export const getCandles = async (symbol,from,to, resolution = "D") => {
    
    const res = await fetch(
        `${BASE_URL}/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${API_KEY}`
    )
    if (!res.ok) throw new Error("Candle data failed")
    return res.json()
}

export const getCompanyProfile = async (symbol) => {
    const res = await fetch(
        `${BASE_URL}/stock/profile2?symbol=${symbol}&token=${API_KEY}`
    );
    if(!res.ok) throw new Error("Profile failed");
    return res.json();
}