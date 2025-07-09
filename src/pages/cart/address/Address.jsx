import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { postDataToAPI } from '../../../ultis/postApi'

export const Address = () => {
    const navigate = useNavigate()
    const {auth} = useOutletContext()
    const [indexAddress, setIndexAddress]= useState(0)
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: ''
    })
    const token = localStorage.getItem("jwt")

    const handleSelectAddress = (e) => {
        console.log(parseInt(e.target.value))
        setIndexAddress(parseInt(e.target.value))
    }

    const handleUseCurrentAddress = async () => {
        console.log('check')
        console.log(auth)
        const address2 = auth.userInfo.listAddress[indexAddress];
        console.log(address2)
        const data = await postDataToAPI(`/api/order/create-new/${auth.userInfo.id}`, {
            street: address2.street,
            city: address2.city,
            state: address2.state
        }, token);
        console.log(data)
        navigate('/cart/order', { state: {
            street: address2.street,
            city: address2.city,
            state: address2.state,
            orderId: data.orderId
        } })
    }

    const handleUseNewAddress = async () => {
        const data = await postDataToAPI(`/api/order/create-new/${auth.userInfo.id}`, address, token);
        navigate('/cart/order', { state: {
            street: address.street,
            city: address.city,
            state: address.state,
            orderId: data.orderId
        }})
        console.log(data)
    }

    return (
        <div class="col-md-4 summary">
            <div><h5><b>YOUR ADDRESS</b></h5></div>
            <select style={{margin: '14px 0px 0px 0px'}} onChange={handleSelectAddress}>
                {
                    auth?.userInfo?.listAddress?.map((address, index) => {

                        return (
                            <option value={index} class="text-muted">{address.street}, {address.city}, {address.state}</option>
                        )
                    })
                }
            </select>
            <button onClick={handleUseCurrentAddress} style={{margin: '16px 0px 8px 0px'}} class="btn">USE CURRENT ADDRESS</button>
            <form>
                <div><h5 style={{margin: '0px 0px 18px 0px'}}><b>New Address</b></h5></div>
                <p>STREET</p>
                <input value={address.street} onChange={(e) => {setAddress({...address, street: e.target.value})}} id="street" style={{margin: '0px 0px 16px 0px'}} placeholder="Enter your street"/>
                <p>CITY</p>
                <input value={address.city} onChange={(e) => {setAddress({...address, city: e.target.value})}} id="city" style={{margin: '0px 0px 16px 0px'}} placeholder="Enter your city"/>
                <p>PROVINCE</p>
                <input value={address.state} onChange={(e) => {setAddress({...address, state: e.target.value})}} id="city" style={{margin: '0px'}} placeholder="Enter your province"/>
            </form>
            <button onClick={handleUseNewAddress} style={{margin: '10px 0px 0px 0px'}} class="btn">USE NEW ADDRESS</button>
            <div class="back-to-shop"><a href="#" onClick={(e) => {e.preventDefault(); navigate('/')}}>&larr;</a><span class="text-muted">Back to shop</span></div>
        </div>
    )
}
