import React from 'react'
import { useRef,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Livetrackingandbenefits from '../components/Livetrackingandbenefits';
import Calltoaction from '../components/Calltoaction';
import Featuresdisplay from '../components/Featuresdisplay';
import Footer from '../components/Footer';


const Home = () => {
  const featuresRef = useRef(null);
  const location = useLocation();
  useEffect(()=>{
    const params = new URLSearchParams(location.search);
    const scrollTo = params.get("scroll");
    if(scrollTo === "features"){
      setTimeout(()=>{
        featuresRef.current?.scrollIntoView({
          behavior:"smooth",
        });
      },100);
    }
  },[location]);
  return (
    <div>
      <Header />
      <div ref={featuresRef}>
        <Featuresdisplay />
      </div>
      <Livetrackingandbenefits />
      <Calltoaction />
      <Footer />
    </div>
  )
}

export default Home