import React, { useEffect } from 'react'
import { USPopularStocks } from '../assets/assets'
import { StockSearch } from '../components/StockSearch';
import { useState } from 'react';
import { getQuote } from '../services/finnhub';
import { getCompanyProfile } from '../services/finnhub';

const Investments = () => {
  const [activeAsset, setActiveAsset] = useState(null);
  const [quote, setQuote] = useState(null);
  const [companyProfile, setCompanyProfile] = useState(null);
  const [watchlist,setWatchlist] = useState([]);

  useEffect(() => {
    if (!activeAsset) return;
    const fetchQuote = async () => {
      const data = await getQuote(activeAsset.symbol);
      setQuote(data);
      console.log("Quote:", quote);
    };
    fetchQuote();
  }, [activeAsset]);

  useEffect(() => {
    if (!activeAsset) return;
    const fetchProfile = async () => {
      try {
        const data = await getCompanyProfile(activeAsset.symbol);
        setCompanyProfile(data);
      } catch (err) {
        console.error("Profile error", err);
        setCompanyProfile(null);
      }
    };
    fetchProfile();
  }, [activeAsset]);

  const handleAddToWatchlist = () => {
    if(!activeAsset) return;
    setWatchlist(prev => {
      const exists = prev.find(
        item => item.symbol === activeAsset.symbol
      );
      if(exists) return prev;
      return[
        ...prev,
        {
          name:activeAsset.name,
          symbol:activeAsset.symbol
        }
      ];
    });
  };

  useEffect(()=>{
    const saved = localStorage.getItem("watchlist");
    if(saved) {
      setWatchlist(JSON.parse(saved));
    }
  },[]);

  useEffect(()=>{
    localStorage.setItem("watchlist",JSON.stringify(watchlist))
  },[watchlist]);

  return (
    <div className='flex gap-4 p-6'>
      <div className='flex flex-col items-center justify-center gap-2 bg-slate-500 h-144 w-160 rounded-lg p-4'>
        <div className='bg-slate-100 text-slate-900 w-full h-12 rounded-lg border border-slate-900'>
          <StockSearch setActiveAsset={setActiveAsset} />
        </div>
        <div className='bg-slate-50 h-124 w-full rounded-lg border border-slate-900 p-4'>
          <div>
            {quote && (
              <div className='border border-slate-900 border-2 rounded-lg p-2'>
                <div className='flex flex-col items-center'>
                  <div className='flex w-full justify-between items-center mb-4'>
                    <div className='flex flex-col items-start justify-center'>
                      <p className='text-md text-slate-900 font-bold'>{activeAsset.name}</p>
                      <p className='text-sm text-slate-700 font-light'>{activeAsset.symbol}</p>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                      <p className='text-black font-semibold text-lg'>${quote.c}</p>
                      <p className={`text-sm font-semibold ${quote.d > 0 ? "text-green-600" : "text-red-500"}`}>{quote.d} ({quote.dp}%)</p>
                    </div>
                  </div>
                  <div className='flex w-full justify-between items-center border border-slate-900 h-12 rounded-lg px-3'>
                    <p className='text-sm font-semibold text-slate-900'>previous close : {quote.pc.toFixed(2)}</p>
                    <p className='text-sm font-semibold text-slate-900'>open : {quote.o.toFixed(2)}</p>
                  </div>
                </div>
                <div className='flex flex-col items-center justify-center mt-6'>
                  <div className='flex flex-col'>
                    <div className='h-2 bg-gray-400 w-84 rounded-full'></div>
                    <div className='flex justify-between items-center w-84'>
                      <p className='text-sm font-semibold text-slate-900'>low: {quote.l.toFixed(2)}</p>
                      <p className='text-sm font-semibold text-slate-900'>high: {quote.h.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
          <div className='mt-6'>
            {companyProfile && companyProfile.name && (
              <div className='flex flex-col bg-slate-300 rounded-lg'>
                <h2 className='flex items-center justify-center text-center text-md font-semibold text-slate-50 bg-slate-900 rounded-t-lg h-12'>Company Overview</h2>
                <div className='grid grid-cols-2 gap-1 p-2'>
                  <p>Company Name</p>
                  <p>:  {companyProfile.name}</p>
                  <p>Exchane</p>
                  <p>:  {companyProfile.exchange}</p>
                  <p>Industry</p>
                  <p>:  {companyProfile.finnhubIndustry}</p>
                  <p>IPO</p>
                  <p>:  {companyProfile.ipo}</p>
                </div>
              </div>
            )}
          </div>
          {quote && companyProfile ? (
            <button onClick={handleAddToWatchlist} className='bg-slate-600 text-slate-50 w-full h-12 rounded-lg mt-6 text-md font-semibold'>Add to WatchList</button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className='flex flex-col items-center justify-center gap-4 bg-slate-500 h-144 w-160 rounded-lg p-4'>
        <div className='flex flex-col items-center justify-center gap-2 bg-slate-50 h-64 w-full rounded-lg border border-slate-900 p-2'>
          <h1 className='flex items-center justify-center bg-slate-900 text-slate-50 font-semibold w-full h-12 rounded-lg'>Market Overview</h1>
          <div className='flex flex-col gap-1 border border-slate-900 border-2 w-full h-48 overflow-auto rounded-lg p-2'>
            {
              USPopularStocks.map((item, index) => (
                <div key={item.symbol} className='flex justify-between items-center bg-slate-300 w-full h-12 px-2 rounded-lg'>
                  <div className='flex flex-col'>
                    <p>{item.name}</p>
                    <p>{item.symbol}</p>
                  </div>
                  <div>
                    <button onClick={()=>setActiveAsset({name:item.name,symbol:item.symbol})} className='flex items-center justify-center bg-slate-900 h-8 text-slate-50 font-semibold text-md px-3 rounded-lg'>Overview</button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className='flex flex-col items-center justify-center gap-2 bg-slate-50 h-64 w-full rounded-lg border border-slate-900 p-2'>
          <h1 className='flex items-center justify-center text-slate-50 font-semibold bg-slate-900 w-full h-12 rounded-lg'>Watchlist</h1>
          <div className='border border-slate-900 border-2 rounded-lg w-full h-48 p-2 overflow-auto'>
            {watchlist.length === 0 && (
              <p className='flex items-center justify-center text-md font-semibold text-slate-900'>No stocks added</p>
            )}
            {watchlist.map(item=>(
              <div className='flex items-center justify-between h-12 p-2 bg-slate-300 rounded-lg w-full mb-2'>
                <div className='flex flex-col'>
                  <p className='text-md font-semibold text-slate-900'>{item.name}</p>
                  <p className='text-sm font-light text-slate-900'>{item.symbol}</p>
                </div>
                <div>
                  <button onClick={()=>setActiveAsset({name:item.name,symbol:item.symbol})} className='bg-slate-900 px-3 text-slate-50 rounded-lg h-8'>View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Investments