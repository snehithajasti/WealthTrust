export const TIMEFRAMES = {
    "1W" : 7,
    "1M" : 30,
    "3M" : 90,
    "1Y" : 365
}

export const getUnixRange = (days) => {
    const to = Math.floor(Date.now()/1000)
    const from = to-days*24*60*60
    return {from,to}
}

export const formatFinnhubData = (prices,timestamps) => {
    return prices.map((price,index)=>({
        date:new Date(timestamps[index]*1000).toLocaleDateString("en-US",{
            month : "short",
            day:"numeric"
        }),
        price
    }))
}