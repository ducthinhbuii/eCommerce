import React from 'react'
import '../cart/styles.scss'
import './styles.scss'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUserInfo } from '../../redux/selector'

export const User = () => {

    const auth = useSelector(getUserInfo)
    const navigate = useNavigate()

    return (
        <div className="cart">
            <div className="container">
                <div class="card">
                    <div class="row">
                        
                        <div class="col-md-4 summary" style={{borderRadius: '1rem'}}>
                            <div class="title" style={{height: '30px'}}>
                                <div class="row">
                                    <div class="col">
                                        <div className="user-info"
                                            style={{display: 'flex', alignItems:'center', justifyContent: 'center'}}
                                        >
                                            <div className="avatar" style={{marginRight: '10px', fontSize: '20px'}}>
                                                <i className="fa fa-user"></i>
                                            </div>
                                            <div className="name">Bui Duc Thinh</div>
                                        </div>
                                    </div>
                                </div>
                            </div>    
                            <div class="row border-top border-bottom"></div>
                            <div className="my-account"
                                onClick={()=>{navigate('/user-info')}}
                                style={{display: 'flex', alignItems:'center', justifyContent: 'center', padding: '20px'}}
                            >
                                <div style={{marginRight: '10px', fontSize: '20px'}} className="icon"><i class="fa-solid fa-house"></i></div>
                                <div className="name">My Account</div>
                            </div>

                            <div className="order-status"
                                onClick={()=>{navigate('/user-info/order-status')}}
                                style={{display: 'flex', alignItems:'center', justifyContent: 'center', padding: '20px'}}
                            >
                                <div style={{marginRight: '10px', fontSize: '20px'}} className="icon"><i class="fa-solid fa-cart-shopping"></i></div>
                                <div className="name">Order Status</div>
                            </div>
                            
                        </div>
                        <Outlet context={{auth}}/>
                    
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
