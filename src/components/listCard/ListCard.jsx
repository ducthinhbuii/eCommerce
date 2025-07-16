import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch';
import {useSelector, useDispatch} from 'react-redux'
import { homeSlice } from '../../pages/home/addSlice';
import { getAllCartItems, getUserInfo } from '../../redux/selector';
import Spinner from '../spinner/Spinner';
import { postDataToAPI } from '../../ultis/postApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCartItemAsync} from '../../pages/home/addSlice';

export const ListCard = () => {
    const [pageSize, setPageSize] = useState(12);
    const [pageNumber, setPageNumber] = useState(1);
    let url = `/api/product/?pageSize=${pageSize}&pageNumber=${pageNumber - 1}`
    const {data, isLoading, error} = useFetch(url);
    const loading = useSelector((state) => state.home.loading);
    const [arrCurNumOfPages, setArrCurNumOfPages] = useState([])
    const totalPage = Math.ceil(data?.totalCount / pageSize);
    const auth = useSelector(getUserInfo);
    const token = localStorage.getItem("jwt");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const data = useSelector(getAllCartItems);
    // console.log(data)
    console.log(error);

    const notify = (text) => toast(text);

    const handleAddToCart = async (product) => {
        try {
            console.log("ok");
            await dispatch(addCartItemAsync({ userId: auth.userInfo.id, product, token })).unwrap();
            notify("🛒 Đã thêm vào giỏ hàng!");
        } catch (error) {
            console.log("Lỗi thêm giỏ hàng:", error);
            notify("❌ Thêm sản phẩm thất bại!");
            if (auth?.auth == false) {
                navigate('/login');
            }
        }
    }

    const settingPagination = (data) => {
        if (data) {
        //   setNumOfPages(data.total_pages);
    
          const dotsInitial = '...'
          const dotsLeft = '... '
          const dotsRight = ' ...'
    
          let tempArr = [];
          for (let i = 1; i <= totalPage; i++) {
            tempArr.push(i);
          }
    
          if(totalPage >= 5) {
            if(pageNumber >= 1 && pageNumber <= 3){
              tempArr = [1,2,3,4,dotsLeft,totalPage]
            }
            else if (pageNumber === 4) {
              tempArr = [1,2,3,4,5, dotsInitial, totalPage]
            }
            else if (pageNumber > 4 && pageNumber < totalPage - 2) {                              
              tempArr = [1, dotsLeft, pageNumber - 1, pageNumber, pageNumber + 1, dotsRight, totalPage]
            }
            else if (pageNumber > totalPage - 3) {               
              const sliced = Array.from({ length: 3 }, (_, index) => totalPage - 2 + index);  
              tempArr = [1, dotsLeft, ...sliced]                    
            }
          }
          setArrCurNumOfPages(tempArr);
        }
    }

    const handlePrePage = (page) => {
        if(pageNumber !== 1){
          setPageNumber(pageNumber - 1);
        }
    }
    
    const handleNextPage = (page) => {
        if(pageNumber !== totalPage){
            setPageNumber(pageNumber + 1);
        }
    }

    useEffect(() => {
        settingPagination(data)
    }, [data])

    return (
        (isLoading || loading) ? <Spinner isLogin={true}/> :
        (!isLoading && !loading && data ) ? 
        <div class="row">
            <div class="col">
                <div class="product-grid">
                    {data?.products?.length >  0 && data?.products?.map((product) => {
                        return (
                            <>
                                <div class="product-item men">
                                    <div class="product discount product_filter" onClick={() => {navigate(`/detail?categoryId=${product.category.categoryId}&productId=${product.id}`)}}>
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
                                    <div class="red_button add_to_cart_button"
                                        onClick={() => handleAddToCart(product)}
                                    ><a>add to cart</a></div>
                                </div>
                            </>
                        )
                    })}
                </div>
                <div class="product_sorting_container product_sorting_container_bottom clearfix">
                    <div class="pages d-flex flex-row align-items-center">
                        <div class="page_first"><i class="fa-solid fa-angles-left"></i></div>
                        <div class="page_prev" onClick={() => {handlePrePage(pageNumber)}}><i class="fa-solid fa-angle-left"></i></div>
                        {
                            arrCurNumOfPages.map((page) => {
                                return (
                                    <div className={pageNumber === page ? 'page_current' : 'page_total'}
                                    onClick={
                                        () => {
                                        if(page === '...'){
                                            setPageNum(arrCurNumOfPages[arrCurNumOfPages.length-3] + 1)
                                            return
                                        }
                                        if(page === ' ...'){
                                            setPageNum(arrCurNumOfPages[3] + 2)
                                            return
                                        }
                                        if(page === '... '){
                                            setPageNum(arrCurNumOfPages[3] - 2)
                                            return
                                        }
                                        setPageNumber(page);
                                        }}
                                    >
                                        <span>{page}</span>
                                    </div>
                                )
                            })
                        }
                        {/* <div class="page_total"><span>of</span>5</div> */}
                        <div class="page_next" onClick={() => {handleNextPage(pageNumber)}}><i class="fa-solid fa-angle-right"></i></div>
                        <div class="page_final"><i class="fa-solid fa-angles-right"></i></div>
                    </div>

                </div>
            </div>
        </div>
        :
        <div className="error-message text-center text-danger p-2">Lỗi tải dữ liệu: {error}</div>
        
    )
}
