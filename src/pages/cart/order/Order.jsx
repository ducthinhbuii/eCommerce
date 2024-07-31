import React from 'react'
import { useLocation, useOutletContext } from 'react-router-dom';
import { postDataToAPI } from '../../../ultis/postApi'

export const Order = () => {
    
    const {data} = useOutletContext()
    console.log(data)
    const {state} = useLocation();
    console.log(state)
    const token = localStorage.getItem("jwt")

    const handleCheckOut = async() => {
        console.log('checkout')
        console.log(data)
        console.log({
            orderId: state.orderId,
            totalPrice: data.totalPrice
        })
        const res = await postDataToAPI(`/api/payment/create-payment`,{
            orderId: state.orderId,
            totalPrice: data.totalPrice
        },
        token);
        console.log(res)
        if(res.status === "ok" && res.url){
            window.location.href = res.url
        }
    }
    
    return (
        <div class="col-md-4 summary">
            <div><h5><b>Summary</b></h5></div>
            <hr/>
            <form>
                <select><option class="text-muted">{state.street}, {state.city}, {state.state}</option></select>
                <p>GIVE CODE</p>
                <input id="code" placeholder="Enter your code"/>
            </form>
            <div class="row" style={{borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0"}}>
                <div class="col">TOTAL PRICE</div>
                <div class="col text-right">{data.totalPrice.toLocaleString('vi-VN', {style:'currency',currency:'VND'})}</div>
            </div>
            <button class="btn" onClick={() => handleCheckOut()}>CHECKOUT</button>
            <div class="back-to-shop"><a href="#" onClick={(e) => {e.preventDefault(); navigate('/')}}>&larr;</a><span class="text-muted">Back to shop</span></div>
        </div>
    )
}
