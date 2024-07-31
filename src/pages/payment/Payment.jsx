import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {fetchDataFromAPI} from '../../ultis/api'
import './styless.scss'

export const Payment = () => {
    const {orderId} = useParams()
    const urlParams = new URLSearchParams(window.location.search);
    const transactionStatus = urlParams.get("vnp_ResponseCode");
    const vnp_TransactionNo = urlParams.get("vnp_TransactionNo");
    const totalPrice = urlParams.get("vnp_Amount") / 100;
    const token = localStorage.getItem("jwt")

    const updatePayment = async () => {
        console.log(orderId)
        console.log(vnp_TransactionNo)
        if(transactionStatus === "00"){
            const data = await fetchDataFromAPI(`/api/payment/update-payment?orderId=${orderId}&vnp_TransactionNo=${vnp_TransactionNo}`, token);
            const reset = await fetchDataFromAPI(`/api/cart/reset-cart/${orderId}`, token);
            console.log(data)
            console.log(reset)
        }
    }

    useEffect(() => {
        updatePayment()
    }, [])

    return (
        transactionStatus && 
        <div className='payment'>
            <div class="container">
            {transactionStatus === "00" ? (
                <div class="row justify-content-center">
                    <div class="col-md-5">
                        <div class="message-box _success">
                            <div className="price">
                                <i class="fa fa-check-circle" aria-hidden="true"></i>
                                <div className="text">
                                    {totalPrice.toLocaleString('vi-VN', {style:'currency',currency:'VND'})}
                                </div>
                            </div>
                            <h2> Your payment was successful </h2>
                            <p> Thank you for your payment. we will <br/>
                                be in contact with more details shortly </p>      
                        </div> 
                    </div> 
                </div> 
            ) : (
                <div class="row justify-content-center">
                    <div class="col-md-5">
                        <div class="message-box _success _failed">
                            <i class="fa fa-times-circle" aria-hidden="true"></i>
                            <h2> Your payment failed </h2>
                            <p>  Try again later </p> 
                        </div> 
                    </div> 
                </div> 
            )}
            </div>
        </div>
    )
}
