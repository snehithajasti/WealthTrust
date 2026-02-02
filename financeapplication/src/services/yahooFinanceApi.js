const BASE_URL = "https;//query1.finance.yahoo.com/v8/finance/chart";

export const fetchIndiaCurrentPrice = async (symbol) => {
    const response = await fetch(
        `${BASE_URL}/${symbol}?interval=1d&range=1d`
    );
    const data = await response.json();

    const result = data?.chart?.result?.[0];

    if(!result){
        throw new Error("No data from Yahoo Finance");
    }

    return result.meta.regularMarketPrice;
};