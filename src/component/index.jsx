import React, { useState, useEffect } from 'react';
import './styles.css';

export default function LoadMoreData(){

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [disableButton, setDisableButton] = useState(false);

    async function fetchProducts(){
        try{
            setLoading(true)

            const response = await fetch(
                `https://dummyjson.com/products?limit=20&skip=${
                count === 0 ? 0 : count * 20}`);

            const result = await response.json();

            if(result && result.products && result.products.length){
                setProducts((prevData) => [...prevData, ...result.products])
                setLoading(false)
            };
        }
        catch(e){
            setLoading(false)
            console.log(e)
        }
    };

    useEffect(()=>{
        fetchProducts()
    },[count]);

    useEffect(()=>{
        if (products && products.length === 100) setDisableButton(true);
    },[products]);

    if(loading){
        return <div>Loading Data ! Please Wait.</div>
    };

    return (
        <div className="load-more-data">
            <div className='product-con'>
                {
                    products && products.length 
                    ? products.map((item)=>(
                        <div key={item.id} className='product'>
                            <img src={item.thumbnail} alt={item.title} />
                            <p>{item.title}</p>
                        </div>
                    ))
                    : null
                }
            </div>
            <div className='buttton-con'>
                <button disabled={disableButton} onClick={() => setCount(count + 1)}>Load More Products!</button>
                {
                    disableButton ? <p>You have reached too many products.</p> : null
                }
            </div>
        </div>
    );
};