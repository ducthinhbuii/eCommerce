import React, { useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import { homeSlice } from '../../home/addSlice';
import { postDataToAPI } from '../../../ultis/postApi';
import { useDispatch, useSelector } from 'react-redux';
import {getUserInfo } from '../../../redux/selector';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ItemDetail = ({productId}) => {
	const [imgMain, setImgMain] = useState()
	const [isLoad, setIsLoad] = useState(false)
	const dispatch = useDispatch();
	const auth = useSelector(getUserInfo);
    const token = localStorage.getItem("jwt");
	const handleClickImg = (url) => {
		setImgMain(url)
	}

	const notify = (text) => toast(text);

	const {data, isLoading} = useFetch(`/api/product/${productId}`);
  	useEffect(() => {
		if(data){
			console.log(data)
			setImgMain(data.imgUrl)
		}
	}, [data])

	const handleAddToCart = async (product) => {
        setIsLoad(true);
        console.log(product)
        dispatch(homeSlice.actions.addCartItem({product: product}))
        const data = await postDataToAPI(`/api/cart/add/${auth.userInfo.id}`, {
            productId: product.id,
            quantity: 1,
            price: product.price,
            discountPrice: product.discountPrice
        }, token);
        console.log(data)
        if(data === "Add Item to Cart"){
            notify("Add Item Successfully")
        } else {
            notify("Add Item Error, Try Again!")
        }
        setIsLoad(false)
    }

	return (
		data && !isLoading &&
		<div class="row">
			<div class="col-lg-7">
				<div class="single_product_pics">
					<div class="row">
						<div class="col-lg-3 thumbnails_col order-lg-1 order-2">
							<div class="single_product_thumbnails">
								<ul>
									<li
										onClick={() => handleClickImg(data.imgUrl)}
									>
										<img src={data.imgUrl}/>
									</li>
									<li
										onClick={() => handleClickImg(data.imgUrl)}
									>
										<img src={data.imgUrl}/>
									</li>
									<li
										onClick={() => handleClickImg(data.imgUrl)}
									>
										<img src={data.imgUrl}/>
									</li>
								</ul>
							</div>
						</div>
						<div class="col-lg-9 image_col order-lg-2 order-1">
							<div class="single_product_image">
								<div class="single_product_image_background" style={{backgroundImage:`url(${imgMain})`}}></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-lg-5">
				<div class="product_details">
					<div class="product_details_title">
						<h2>{data.name}</h2>
						{/* <p>Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Pellentesque diam dolor, elementum etos lobortis des mollis ut...</p> */}
					</div>
					<div class="free_delivery d-flex flex-row align-items-center justify-content-center">
						<span class="ti-truck"></span><span>free delivery</span>
					</div>
					<div class="original_price">{data.price.toLocaleString('vi-VN', {style:'currency',currency:'VND'})}</div>
					<div class="product_price">{data.discountPrice.toLocaleString('vi-VN', {style:'currency',currency:'VND'})}</div>
					<ul class="star_rating">
						<li><i class="fa-solid fa-star" aria-hidden="true"></i></li>
						<li><i class="fa-solid fa-star" aria-hidden="true"></i></li>
						<li><i class="fa-solid fa-star" aria-hidden="true"></i></li>
						<li><i class="fa-solid fa-star" aria-hidden="true"></i></li>
						<li><i class="fa-regular fa-star" aria-hidden="true"></i></li>
					</ul>
					<div class="product_color">
						<span>Select Color:</span>
						<ul>
							<li style={{background: "#e54e5d"}}></li>
							<li style={{background: "#252525"}}></li>
							<li style={{background: "#60b3f3"}}></li>
						</ul>
					</div>
					<div class="quantity d-flex flex-column flex-sm-row align-items-sm-center">
						<span>Quantity:</span>
						<div class="quantity_selector">
							<span class="minus"><i class="fa fa-minus" aria-hidden="true"></i></span>
							<span id="quantity_value">1</span>
							<span class="plus"><i class="fa fa-plus" aria-hidden="true"></i></span>
						</div>
						<div class="red_button2 add_to_cart_button2"
							onClick={() => handleAddToCart(data)}
						><a href="#">add to cart</a></div>
						<div class="product_favorite d-flex flex-column align-items-center justify-content-center"></div>
					</div>
				</div>
			</div>
		</div>
	)
}
