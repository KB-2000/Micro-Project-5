import React, { useEffect, useState } from 'react'
import styles from './quote.module.css'
import quote_icon from '../assets/quote_icon.svg'

export const Quote = () => {
    const [quote,setQuote] = useState("Loading...");
    const [quoteId,setQuoteId] = useState();
    
    useEffect(()=>{
        const fetchData = async ()=> {
            try {
                const response = await fetch("https://api.adviceslip.com/advice");
                const data = await response.json();
                setQuote(data.slip.advice);
                setQuoteId(data.slip.id);
            } catch(error) {
                console.log(error.message);
            }
        }
        setInterval(fetchData,60000);
    }) 
  return (
    <>
               <div className={styles.quote}>
                    <h1>Quote #{quoteId}</h1>
                    <p>"{quote}"</p>
                    <img src={quote_icon} alt="Quote icon" />
                </div>
    </>
  )
}
