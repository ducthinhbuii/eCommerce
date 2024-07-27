import React, { useEffect } from 'react'
import './styles.css'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCartItems, getUserInfo } from '../../redux/selector'
import { getCart, saveUserLogin, saveUserLogout } from '../../redux/actions'
import { fetchDataFromAPI } from '../../ultis/api'
import useFetch from '../../hooks/useFetch'

export const Header = () => {
	const auth = useSelector(getUserInfo)
    const {data, isLoading, error} = useFetch(`/api/cart/${auth.userInfo?.id}`)
	const cart = useSelector(getAllCartItems)
	const navigate = useNavigate();
	const jwt = localStorage.getItem("jwt");
	const dispatch = useDispatch();

	useEffect(() => {
		if(data?.cartId){
			dispatch(getCart(data))
		}
        dispatchUserInfo();
        console.log("render")
    }, [data])

    const dispatchUserInfo = async () => {
        if (jwt) {
            try {
                const userInfo = await fetchDataFromAPI("/api/user/me", jwt);
				if(userInfo.error){
					handleLogout()
				} else {
					dispatch(saveUserLogin(userInfo));
					console.log(userInfo);
				}
            } catch (error) {
				handleLogout()
                console.log(error);
            }
        }
    };

	const handleLogout = ()=> {
		console.log('logout')
		localStorage.clear();
		dispatch(saveUserLogout())
	}

	return (
		<>
		<header class="header trans_300">
			<div class="top_nav">
				<div class="container">
					<div class="row">
						<div class="col-md-6">
							<div class="top_nav_left">free shipping on all u.s orders over $50</div>
						</div>
						<div class="col-md-6 text-right">
							<div class="top_nav_right">
								<ul class="top_nav_menu">


									<li class="currency">
										<a href="#">
											usd
											<i class="fa fa-angle-down"></i>
										</a>
										<ul class="currency_selection">
											<li><a href="#">cad</a></li>
											<li><a href="#">aud</a></li>
											<li><a href="#">eur</a></li>
											<li><a href="#">gbp</a></li>
										</ul>
									</li>
									<li class="language">
										<a href="#">
											English
											<i class="fa fa-angle-down"></i>
										</a>
										<ul class="language_selection">
											<li><a href="#">French</a></li>
											<li><a href="#">Italian</a></li>
											<li><a href="#">German</a></li>
											<li><a href="#">Spanish</a></li>
										</ul>
									</li>
									{/* <li class="account">
										<a href="#">
											My Account
											<i class="fa fa-angle-down"></i>
										</a>
										{auth?.auth ? (
											<ul class="account_selection">
											<li><a><i class="fa-solid fa-user"></i>{auth.userInfo.firstName +" "+ auth.userInfo.lastName}</a></li>
											<li><a><i class="fa-solid fa-right-from-bracket"></i>Logout</a></li>
											</ul>
											
										) : (
											<ul class="account_selection">
											<li><a onClick={() => navigate('/login')}><i class="fa fa-sign-in" aria-hidden="true"></i>Sign In</a></li>
											<li><a onClick={() => navigate('/register')}><i class="fa fa-user-plus" aria-hidden="true"></i>Register</a></li>
											</ul>
										)}
										
									</li> */}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="main_nav_container">
				<div class="container">
					<div class="row">
						<div class="col-lg-12 text-right">
							<div class="logo_container">
								<a href="#">colo<span>shop</span></a>
							</div>
							<nav class="navbar">
								<ul class="navbar_menu">
									<li><a href="#" onClick={(e) => {e.preventDefault(); navigate('/')}}>home</a></li>
									<li><a href="#" onClick={(e) => {e.preventDefault(); navigate('/categories')}}>shop</a></li>
									<li><a href="#">promotion</a></li>
									<li><a href="#">pages</a></li>
									<li><a href="#">blog</a></li>
									<li><a href="#">contact</a></li>
								</ul>
								<ul class="navbar_user">
									<li><a href="#"><i class="fa fa-search" aria-hidden="true"></i></a></li>
									<li className='navbar_user_account'>
										<a style={{display: 'inline-block', width: 'auto', padding: '0 16px'}} href="#">
										<i style={{marginRight: '10px'}} class="fa fa-user" aria-hidden="true"></i>
										{auth && auth.userInfo && auth.userInfo.username ? auth.userInfo.username : 'Login'}
										</a>
										{auth?.auth ? (

										<ul class="account_selection">
											<li><a><i class="fa-solid fa-user"></i>{auth.userInfo.firstName +" "+ auth.userInfo.lastName}</a></li>
											<li><a onClick={handleLogout}><i class="fa-solid fa-right-from-bracket"></i>Logout</a></li>
										</ul>
										) : (
										<ul class="account_selection">
											<li><a onClick={() => navigate('/login')}><i class="fa-solid fa-user"></i>Login</a></li>
											<li><a onClick={() => navigate('/register')}><i class="fa fa-user-plus"></i>Register</a></li>
										</ul>
										)}
									</li>
									<li class="checkout">
										<a
											onClick={() => navigate('/cart')}
										>
											<i class="fa fa-shopping-cart" aria-hidden="true"></i>
											<span id="checkout_items" class="checkout_items">{cart?.totalItem}</span>
										</a>
									</li>
								</ul>
								<div class="hamburger_container">
									<i class="fa fa-bars" aria-hidden="true"></i>
								</div>
							</nav>
						</div>
					</div>
				</div>
			</div>

		</header>
		<div class="fs_menu_overlay"></div>
		<div class="hamburger_menu">
		<div class="hamburger_close"><i class="fa fa-times" aria-hidden="true"></i></div>
		<div class="hamburger_menu_content text-right">
			<ul class="menu_top_nav">
			<li class="menu_item has-children">
				<a href="#">
				usd
				<i class="fa fa-angle-down"></i>
				</a>
				<ul class="menu_selection">
				<li><a href="#">cad</a></li>
				<li><a href="#">aud</a></li>
				<li><a href="#">eur</a></li>
				<li><a href="#">gbp</a></li>
				</ul>
			</li>
			<li class="menu_item has-children">
				<a href="#">
				English
				<i class="fa fa-angle-down"></i>
				</a>
				<ul class="menu_selection">
				<li><a href="#">French</a></li>
				<li><a href="#">Italian</a></li>
				<li><a href="#">German</a></li>
				<li><a href="#">Spanish</a></li>
				</ul>
			</li>
			<li class="menu_item has-children">
				<a href="#">
				My Account
				<i class="fa fa-angle-down"></i>
				</a>
				{auth?.auth ? (
				<ul class="menu_selection">
					<li><a><i class="fa-solid fa-user"></i>{auth.userInfo.firstName +" "+ auth.userInfo.lastName}</a></li>
					<li><a><i class="fa-solid fa-right-from-bracket"></i>Logout</a></li>
				</ul>
				) : (
				<ul class="menu_selection">
					<li><a onClick={() => navigate('/login')}><i class="fa fa-sign-in" aria-hidden="true"></i>Sign In</a></li>
					<li><a onClick={() => navigate('/register')}><i class="fa fa-user-plus" aria-hidden="true"></i>Register</a></li>
				</ul>
				) }
			</li>
			<li class="menu_item"><a href="#">home</a></li>
			<li class="menu_item"><a href="#">shop</a></li>
			<li class="menu_item"><a href="#">promotion</a></li>
			<li class="menu_item"><a href="#">pages</a></li>
			<li class="menu_item"><a href="#">blog</a></li>
			<li class="menu_item"><a href="#">contact</a></li>
			</ul>
		</div>
		</div>
	</>
	)
}
