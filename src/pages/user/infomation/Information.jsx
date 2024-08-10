import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'
import {storage} from '../../../components/firebase/FirebaseConfig'
import Validation from './Validate';
import { postDataToAPI } from '../../../ultis/postApi';


export const Information = () => {
    const [file, setFile] = useState("https://haycafe.vn/wp-content/uploads/2022/02/Avatar-trang-den.png");
    const [imgUpload, setImgUpload] = useState()
    const {auth} = useOutletContext()
    const [value, setValue] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })
    const jwt = localStorage.getItem("jwt");
    const [error, setError] = useState('')

    useEffect(()=>{
        if(auth.userInfo){
            setValue({
                firstName: auth.userInfo.firstName,
                lastName: auth.userInfo.lastName,
                email: auth.userInfo.email
            })
        }
    }, [auth.auth])

    const handleInput = (e) => {
        const newObject = {...value, [e.target.name]: e.target.value}
        setValue(newObject)
    }

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
        setImgUpload(e.target.files[0])
    }

    const handleChangeUserInfo = async (e) => {
        try {
            e.preventDefault()
            const errorInput = Validation(value)
            setError(errorInput)
            console.log(errorInput)
            if(Object.keys(errorInput).length === 0){
                const data = {
                    firstName: value.firstName,
                    lastName: value.lastName,
                    email: value.email,
                }
                if(imgUpload){
                    const imgRef = ref(storage, `images/${imgUpload.name}`)
                    const snapshot = await uploadBytes(imgRef, imgUpload);
                    const downloadURL = await getDownloadURL(snapshot.ref);
                    data.avatar = downloadURL
                }
                const res =await postDataToAPI(`/api/user/update/${auth.userInfo.id}`,data, jwt)
                console.log(res)
                
            }
        } catch (error) {
            
        }

    }

    return (
    auth.userInfo && 
        <div class="col-md-8 cart custom-cart">
            <div class="title" style={{height: '30px'}}>
                <div class="row">
                    <div class="col"><h4><b>My Account</b></h4></div>
                </div>
            </div>    
            <div class="row border-top border-bottom"></div>
            <div className="avatar"
                style={{textAlign: 'center', padding: '20px'}}
            >
                <div className="avatar-img">
                    <img src={auth.userInfo.avatar ? auth.userInfo.avatar : file} alt="" 
                    style={{width: '100px', height: '100px', borderRadius: '50%', marginBottom: '20px'}}/>

                </div>
                <div className="avatar-name">{auth.userInfo.firstName} {auth.userInfo.lastName}</div>
                <input type="file" accept="image/jpg"
                    style={{margin: '16px 0 0'}}
                    onChange={handleChange}
                />

            </div>
            <form>
            <div class="row">
                <div class="col">
                    <p>First Name</p>
                    <input type="text" name="firstName" value={value.firstName} onChange={handleInput}/>
                </div>
                <div class="col">
                    <p>Last Name</p>
                    <input type="text" name="lastName" value={value.lastName} onChange={handleInput}/>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <p>Email</p>
                    <input type="text" name="email" value={value.email} onChange={handleInput}/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button style={{margin: '10px 0px 0px 0px'}} class="btn"
                    onClick={handleChangeUserInfo}
                    >UPDATE</button>
                </div>
            </div>
            </form>
        </div>
    )
}
