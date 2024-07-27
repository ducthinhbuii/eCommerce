import React, { useEffect, useState } from 'react'
import './styles.scss'
import { useDispatch, useSelector} from 'react-redux'
import { getAllCartItems, getCartTotalMoney, getUserInfo } from '../../redux/selector'
import { useNavigate } from 'react-router-dom'
import { addCartItem, clearCartItem, downQuantityCartItem, upQuantityCartItem } from '../../redux/actions'
import { postDataToAPI } from '../../ultis/postApi'

export const Cart = () => {
    const auth = useSelector(getUserInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const data = useSelector(getAllCartItems);
    const token = localStorage.getItem("jwt");
    
    const handleDownQuantity = async (e, product) => {
        e.preventDefault();
        dispatch(downQuantityCartItem(product))
        const data = await postDataToAPI(`/api/cart/remove/${auth.userInfo.id}`, {
            productId: product.id,
            quantity: 1,
            price: product.price,
            discountPrice: product.discountPrice
        }, token);
        console.log(data)
    }

    const handleUpQuantity = async (e, product) => {
        e.preventDefault();
        dispatch(addCartItem({product: product}))
        const data = await postDataToAPI(`/api/cart/add/${auth.userInfo.id}`, {
            productId: product.id,
            quantity: 1,
            price: product.price,
            discountPrice: product.discountPrice
        }, token);
        console.log(data)
    }

    const handleClearCartItem = async (product) => {
        console.log('clear')
        dispatch(clearCartItem(product))
        const data = await postDataToAPI(`/api/cart/remove-cart-item/${auth.userInfo.id}`, {
            productId: product.id,
            price: product.price,
            discountPrice: product.discountPrice
        }, token);
        console.log(data)
    }

    return (
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
                            {/* <div class="row border-top border-bottom">
                                <div class="row main align-items-center">
                                    <div class="col-2"><img class="img-fluid" src="https://i.imgur.com/1GrakTl.jpg"/></div>
                                    <div class="col">
                                        <div class="row text-muted">Shirt</div>
                                        <div class="row">Cotton T-shirt</div>
                                    </div>
                                    <div class="col">
                                        <a href="#">-</a><a href="#" class="border">1</a><a href="#">+</a>
                                    </div>
                                    <div class="col">&euro; 44.00 <span class="close">&#10005;</span></div>
                                </div>
                            </div> */}
                            {/* <div class="row">
                                <div class="row main align-items-center">
                                    <div class="col-2"><img class="img-fluid" src="https://i.imgur.com/ba3tvGm.jpg"/></div>
                                    <div class="col">
                                        <div class="row text-muted">Shirt</div>
                                        <div class="row">Cotton T-shirt</div>
                                    </div>
                                    <div class="col">
                                        <a href="#">-</a><a href="#" class="border">1</a><a href="#">+</a>
                                    </div>
                                    <div class="col">&euro; 44.00 <span class="close">&#10005;</span></div>
                                </div>
                            </div> */}
                            {/* <div class="row border-top border-bottom">
                                <div class="row main align-items-center">
                                    <div class="col-2"><img class="img-fluid" src="https://i.imgur.com/pHQ3xT3.jpg"/></div>
                                    <div class="col">
                                        <div class="row text-muted">Shirt</div>
                                        <div class="row">Cotton T-shirt</div>
                                    </div>
                                    <div class="col">
                                        <a href="#">-</a><a href="#" class="border">1</a><a href="#">+</a>
                                    </div>
                                    <div class="col">&euro; 44.00 <span class="close">&#10005;</span></div>
                                </div>
                            </div> */}
                            <div class="back-to-shop"><a href="#" onClick={(e) => {e.preventDefault(); navigate('/')}}>&larr;</a><span class="text-muted">Back to shop</span></div>
                        </div>
                        <div class="col-md-4 summary">
                            <div><h5><b>Summary</b></h5></div>
                            <hr/>
                            {/* <div class="row">
                                <div class="col" style={{paddingLeft:"0"}}>ITEMS 3</div>
                                <div class="col text-right">&euro; 132.00</div>
                            </div> */}
                            <form>
                                <p>SHIPPING</p>
                                <select><option class="text-muted">Standard-Delivery- &euro;5.00</option></select>
                                <p>GIVE CODE</p>
                                <input id="code" placeholder="Enter your code"/>
                            </form>
                            <div class="row" style={{borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0"}}>
                                <div class="col">TOTAL PRICE</div>
                                <div class="col text-right">{data.totalPrice.toLocaleString('vi-VN', {style:'currency',currency:'VND'})}</div>
                            </div>
                            <button class="btn">CHECKOUT</button>
                            <div class="back-to-shop"><a href="#" onClick={(e) => {e.preventDefault(); navigate('/')}}>&larr;</a><span class="text-muted">Back to shop</span></div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
