
const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
const BASE_URL = "https://www.alphavantage.co/query";

const fetchFromAlphaVantage = async (params) => {
    const query = new URLSearchParams({
        ...params,
        apikey : API_KEY,
    }).toString();
    const response = await fetch(`${BASE_URL}?${query}`);
    return response.json();
};

export const fetchUSCurrentPrice = async (symbol) => {
    const data = await fetchFromAlphaVantage({
        function :"GLOBAL_QUOTE",
        symbol,
    });

    const quote = data["Global Quote"];
    if(!quote){
        throw new Error("Data not available at the moment..!")
    }
    return {
        price: quote["05. price"],
        change: quote["09. change"],
        changePercent: quote["10. change percent"],
    };
};

export const fetchUSHistoryData = async (symbol) =>{
    const data = await fetchFromAlphaVantage({
        function:"TIME_SERIES_DAILY",
        symbol,
        outputsize:"compact",
    })

    console.log(data)

    const timeSeries = data["Time Series (Daily)"];
    if(!timeSeries){
        if(data.Note){
            throw new Error("API limit reached");
        }
        if(data["Error Message"]){
            throw new Error("Invalid symbol");
        }
        throw new Error("No historical data")
    }

    return timeSeries;
}

export const searchStocks = async (keywords) => {
    const data = await fetchFromAlphaVantage({
        function:"SYMBOL_SEARCH",
        keywords,
    })
    return data.bestMatches || [];
}