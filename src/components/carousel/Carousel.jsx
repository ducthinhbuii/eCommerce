import React, { useRef } from 'react'
import useFetch from '../../hooks/useFetch';
import Spinner from '../spinner/Spinner';
import { useNavigate } from 'react-router-dom';

export const Carousel = () => {
    const carouselContainer = useRef();
    let url = `/api/product/?category=684115eab87d0074f2ddf1fb`
    const {data, isLoading, error} = useFetch(url);
    const navigate = useNavigate()
    
    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth)
                : container.scrollLeft + (container.offsetWidth); 

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        isLoading ? <Spinner isLogin={true}/> :
        (!isLoading && data) ? 
        <div class="row">
            <div class="col">
                <div class="product_slider_container">
                    <div class="owl-carousel owl-theme product_slider" ref={carouselContainer}>
                    {data?.products?.length >  0 && data?.products?.map((product) => {
                        return (
                            <>
                                <div class="owl-item product_slider_item">
                                    <div class="product-item" onClick={() => {navigate(`/detail?categoryId=${product.category.categoryId}&productId=${product.id}`)}}>
                                        <div class="product discount">
                                            <div class="product_image">
                                                <img src={product.imgUrl} alt=""/>
                                            </div>
                                            <div class="favorite favorite_left"></div>
                                            <div class="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center"><span>-{product.discountPrice.toLocaleString('vi-VN', {style:'currency',currency:'VND'})}</span></div>
                                            <div class="product_info">
                                                <h6 class="product_name"><a href="single.html">{product.name}</a></h6>
                                                <div class="product_price">{product.price.toLocaleString('vi-VN', {style:'currency',currency:'VND'})}<span>{(product.discountPrice + product.price).toLocaleString('vi-VN', {style:'currency',currency:'VND'})}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                    </div>


                    <div class="product_slider_nav_left product_slider_nav d-flex align-items-center justify-content-center flex-column"
                        onClick={() => navigation("left")}>
                        <i class="fa fa-chevron-left" aria-hidden="true"></i>
                    </div>
                    <div class="product_slider_nav_right product_slider_nav d-flex align-items-center justify-content-center flex-column"
                        onClick={() => navigation("right")}>
                        <i class="fa fa-chevron-right" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        </div>
        :
        <div className="error-message text-center text-danger p-4">Lỗi tải dữ liệu: {error}</div>
    )
}
