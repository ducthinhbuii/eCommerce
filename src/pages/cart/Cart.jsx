import React, { useEffect, useState } from 'react'
import './styles.scss'
import { useDispatch, useSelector} from 'react-redux'
import { getAllCartItems, getCartTotalMoney, getUserInfo } from '../../redux/selector'
import { Outlet, useNavigate } from 'react-router-dom'
import { addCartItemAsync, clearCartItemAsync, downQuantityCartItemAsync, homeSlice } from '../home/addSlice'
import Spinner from '../../components/spinner/Spinner'

export const Cart = () => {
    const auth = useSelector(getUserInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const data = useSelector(getAllCartItems);
    const token = localStorage.getItem("jwt");
    const loading = useSelector((state) => state.home.loading);
    
    const handleDownQuantity = async (e, product) => {
        e.preventDefault();
        await dispatch(downQuantityCartItemAsync({ userId: auth.userInfo.id, product, token })).unwrap();
    }

    const handleUpQuantity = async (e, product) => {
        e.preventDefault();
        await dispatch(addCartItemAsync({ userId: auth.userInfo.id, product, token })).unwrap();
    }

    const handleClearCartItem = async (product) => {
        await dispatch(clearCartItemAsync({ userId: auth.userInfo.id, product, token })).unwrap();
    }

    return (
        loading ? <Spinner /> :
        data && data.cartItems &&
        <div className="cart">
            <div className="container">
                <div class="card">
                    <div class="row">
                        <div class="col-md-8 cart custom-cart">
                            <div class="title">
                                <div class="row">
                                    <div class="col"><h4><b>Shopping Cart</b></h4></div>
                                    <div class="col align-self-center text-right text-muted">{data.cartItems.length} items</div>
                                </div>
                            </div>    
                            {
                                data.cartItems.map((cart) => {
                                    return (
                                        <div class="row border-top border-bottom">
                                            <div class="row main align-items-center">
                                                <div class="col-2"><img class="img-fluid" src={cart.product.imgUrl}/></div>
                                                <div class="col">
                                                    <div class="row text-muted">{cart.product.category.name}</div>
                                                    <div class="row text-name">{cart.product.name}</div>
                                                </div>
                                                <div class="col">
                                                    <a href="#" onClick={(e)=>handleDownQuantity(e, cart.product)}>-</a>
                                                    <a href="#" class="border">{cart.quantity}</a>
                                                    <a href="#" onClick={(e)=>{handleUpQuantity(e, cart.product)}}>+</a>
                                                </div>
                                                <div class="col">{(cart.product.price * cart.quantity).toLocaleString('vi-VN', {style:'currency',currency:'VND'})} 
                                                <span class="close" onClick={() => {handleClearCartItem(cart.product)}}>&#10005;</span></div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
        
                            <div class="back-to-shop"><a href="#" onClick={(e) => {e.preventDefault(); navigate('/')}}>&larr;</a><span class="text-muted">Back to shop</span></div>
                        </div>
                        <Outlet context={{data, auth}}/>
                    
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
