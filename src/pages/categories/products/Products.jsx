import React, { useEffect, useState } from 'react'
import useFetch from '../../../hooks/useFetch';
import {useDispatch, useSelector} from 'react-redux';
import { getPriceRange, getUserInfo } from '../../../redux/selector';
import Spinner from '../../../components/spinner/Spinner'
import { homeSlice } from '../../home/addSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postDataToAPI } from '../../../ultis/postApi';
import { useNavigate } from 'react-router-dom';

export const Products = ({categoryId}) => {
    const rangePrice = useSelector(getPriceRange);
    const [pageSize, setPageSize] = useState(6);
    const [pageNumber, setPageNumber] = useState(1);
    const [sort, setSort] = useState('');
    const token = localStorage.getItem("jwt");
    const auth = useSelector(getUserInfo);
    const [isLoad, setIsLoad] = useState(false)
    const [arrCurNumOfPages, setArrCurNumOfPages] = useState([])
    let url = categoryId 
        ? `/api/product/?category=${categoryId}&pageSize=${pageSize}&pageNumber=${pageNumber - 1}&sort=${sort}` 
        : `/api/product/?pageSize=${pageSize}&pageNumber=${pageNumber - 1}&sort=${sort}`;
    
    if(rangePrice && rangePrice.minPrice && rangePrice.maxPrice){
        url += `&minPrice=${rangePrice.minPrice}&maxPrice=${rangePrice.maxPrice}`
    }
    const {data, isLoading, error} = useFetch(url);
    const totalPage = Math.ceil(data?.totalCount / pageSize);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const notify = (text) => toast(text);

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
    
    useEffect(()=> {
        settingPagination(data)
    }, [data])
    
    return (
        (isLoading && isLoad) ? <Spinner isLogin={true}/> :
        !isLoading && !isLoad && data &&
        <div class="main_content">
            <div class="products_iso">
                <div class="row">
                    <div class="col">
                        <div class="product_sorting_container product_sorting_container_top">
                            <ul class="product_sorting">
                                <li>
                                    <span class="type_sorting_text">
                                        {
                                            sort === '' ? 'Default Sorting' : (sort === 'price_low' ? 'Asc Price' : 'Desc Price')
                                        }
                                    </span>
                                    <i class="fa fa-angle-down"></i>
                                    <ul class="sorting_type">
                                        <li class="type_sorting_btn" onClick={()=>{setSort('')}}><span>Default</span></li>
                                        <li class="type_sorting_btn" onClick={()=>{setSort('price_low')}} ><span>Asc Price</span></li>
                                        <li class="type_sorting_btn" onClick={()=>{setSort('price_high')}} ><span>Desc Price</span></li>
                                    </ul>
                                </li>
                                <li>
                                    <span>Show</span>
                                    <span class="num_sorting_text">{pageSize}</span>
                                    <i class="fa fa-angle-down"></i>
                                    <ul class="sorting_num">
                                        <li class="num_sorting_btn" onClick={()=>{setPageSize(6)}}><span>6</span></li>
                                        <li class="num_sorting_btn" onClick={()=>{setPageSize(9)}}><span>9</span></li>
                                        <li class="num_sorting_btn" onClick={()=>{setPageSize(12)}}><span>12</span></li>
                                    </ul>
                                </li>
                            </ul>

                            <div class="pages d-flex flex-row align-items-center">
                                {rangePrice && rangePrice.minPrice && rangePrice.minPrice > 0 && rangePrice.maxPrice && rangePrice.maxPrice &&
                                    <span>Range Price: &nbsp;
                                        {parseInt(rangePrice.minPrice).toLocaleString('vi-VN', {style:'currency',currency:'VND'})} - 
                                        {parseInt(rangePrice.maxPrice).toLocaleString('vi-VN', {style:'currency',currency:'VND'})}</span>
                                }
                    
                            </div>
                            

                        </div>
    
                        <div class="product-grid">
                        {
                            data?.products?.length >  0 && data?.products?.map((product) => {
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
                                            ><a href="#">add to cart</a></div>
                                        </div>
                                    </>
                                )
                            })
                        }
                            

                    

                            {
                            /* <div class="product-item women">
                                <div class="product product_filter">
                                    <div class="product_image">
                                        <img src="https://raw.githubusercontent.com/thanhnam232/SaveSomthing/main/product_1.png" alt=""/>
                                    </div>
                                    <div class="favorite"></div>
                                    <div class="product_bubble product_bubble_left product_bubble_green d-flex flex-column align-items-center"><span>new</span></div>
                                    <div class="product_info">
                                        <h6 class="product_name"><a href="single.html">Samsung CF591 Series Curved 27-Inch FHD Monitor</a></h6>
                                        <div class="product_price">$610.00</div>
                                    </div>
                                </div>
                                <div class="red_button add_to_cart_button"><a href="#">add to cart</a></div>
                            </div>
            
                            <div class="product-item women">
                                <div class="product product_filter">
                                    <div class="product_image">
                                        <img src="https://raw.githubusercontent.com/thanhnam232/SaveSomthing/main/product_1.png" alt=""/>
                                    </div>
                                    <div class="favorite"></div>
                                    <div class="product_info">
                                        <h6 class="product_name"><a href="single.html">Blue Yeti USB Microphone Blackout Edition</a></h6>
                                        <div class="product_price">$120.00</div>
                                    </div>
                                </div>
                                <div class="red_button add_to_cart_button"><a href="#">add to cart</a></div>
                            </div>
                            <div class="product-item accessories">
                                <div class="product product_filter">
                                    <div class="product_image">
                                        <img src="https://raw.githubusercontent.com/thanhnam232/SaveSomthing/main/product_1.png" alt=""/>
                                    </div>
                                    <div class="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center"><span>sale</span></div>
                                    <div class="favorite favorite_left"></div>
                                    <div class="product_info">
                                        <h6 class="product_name"><a href="single.html">DYMO LabelWriter 450 Turbo Thermal Label Printer</a></h6>
                                        <div class="product_price">$410.00</div>
                                    </div>
                                </div>
                                <div class="red_button add_to_cart_button"><a href="#">add to cart</a></div>
                            </div>
                            <div class="product-item women men">
                                <div class="product product_filter">
                                    <div class="product_image">
                                        <img src="https://raw.githubusercontent.com/thanhnam232/SaveSomthing/main/product_1.png" alt=""/>
                                    </div>
                                    <div class="favorite"></div>
                                    <div class="product_info">
                                        <h6 class="product_name"><a href="single.html">Pryma Headphones, Rose Gold & Grey</a></h6>
                                        <div class="product_price">$180.00</div>
                                    </div>
                                </div>
                                <div class="red_button add_to_cart_button"><a href="#">add to cart</a></div>
                            </div>
                            <div class="product-item accessories">
                                <div class="product discount product_filter">
                                    <div class="product_image">
                                        <img src="https://raw.githubusercontent.com/thanhnam232/SaveSomthing/main/product_1.png" alt=""/>
                                    </div>
                                    <div class="favorite favorite_left"></div>
                                    <div class="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center"><span>-$20</span></div>
                                    <div class="product_info">
                                        <h6 class="product_name"><a href="single.html">Fujifilm X100T 16 MP Digital Camera (Silver)</a></h6>
                                        <div class="product_price">$520.00<span>$590.00</span></div>
                                    </div>
                                </div>
                                <div class="red_button add_to_cart_button"><a href="#">add to cart</a></div>
                            </div>
                            <div class="product-item women">
                                <div class="product product_filter">
                                    <div class="product_image">
                                        <img src="https://raw.githubusercontent.com/thanhnam232/SaveSomthing/main/product_1.png" alt=""/>
                                    </div>
                                    <div class="favorite"></div>
                                    <div class="product_info">
                                        <h6 class="product_name"><a href="single.html">Samsung CF591 Series Curved 27-Inch FHD Monitor</a></h6>
                                        <div class="product_price">$610.00</div>
                                    </div>
                                </div>
                                <div class="red_button add_to_cart_button"><a href="#">add to cart</a></div>
                            </div>
                            <div class="product-item accessories">
                                <div class="product product_filter">
                                    <div class="product_image">
                                        <img src="https://raw.githubusercontent.com/thanhnam232/SaveSomthing/main/product_1.png" alt=""/>
                                    </div>
                                    <div class="favorite"></div>
                                    <div class="product_info">
                                        <h6 class="product_name"><a href="single.html">Blue Yeti USB Microphone Blackout Edition</a></h6>
                                        <div class="product_price">$120.00</div>
                                    </div>
                                </div>
                                <div class="red_button add_to_cart_button"><a href="#">add to cart</a></div>
                            </div>
                            <div class="product-item men">
                                <div class="product product_filter">
                                    <div class="product_image">
                                        <img src="https://raw.githubusercontent.com/thanhnam232/SaveSomthing/main/product_1.png" alt=""/>
                                    </div>
                                    <div class="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center"><span>sale</span></div>
                                    <div class="favorite favorite_left"></div>
                                    <div class="product_info">
                                        <h6 class="product_name"><a href="single.html">DYMO LabelWriter 450 Turbo Thermal Label Printer</a></h6>
                                        <div class="product_price">$410.00</div>
                                    </div>
                                </div>
                                <div class="red_button add_to_cart_button"><a href="#">add to cart</a></div>
                            </div>
                            <div class="product-item men">
                                <div class="product product_filter">
                                    <div class="product_image">
                                        <img src="https://raw.githubusercontent.com/thanhnam232/SaveSomthing/main/product_1.png" alt=""/>
                                    </div>
                                    <div class="favorite"></div>
                                    <div class="product_info">
                                        <h6 class="product_name"><a href="single.html">Pryma Headphones, Rose Gold & Grey</a></h6>
                                        <div class="product_price">$180.00</div>
                                    </div>
                                </div>
                                <div class="red_button add_to_cart_button"><a href="#">add to cart</a></div>
                            </div>
                            <div class="product-item women men">
                                <div class="product product_filter">
                                    <div class="product_image">
                                        <img src="https://raw.githubusercontent.com/thanhnam232/SaveSomthing/main/product_1.png" alt=""/>
                                    </div>
                                    <div class="favorite"></div>
                                    <div class="product_info">
                                        <h6 class="product_name"><a href="single.html">Pryma Headphones, Rose Gold & Grey</a></h6>
                                        <div class="product_price">$180.00</div>
                                    </div>
                                </div>
                                <div class="red_button add_to_cart_button"><a href="#">add to cart</a></div>
                            </div>
                            <div class="product-item accessories">
                                <div class="product discount product_filter">
                                    <div class="product_image">
                                        <img src="https://raw.githubusercontent.com/thanhnam232/SaveSomthing/main/product_1.png" alt=""/>
                                    </div>
                                    <div class="favorite favorite_left"></div>
                                    <div class="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center"><span>-$20</span></div>
                                    <div class="product_info">
                                        <h6 class="product_name"><a href="single.html">Fujifilm X100T 16 MP Digital Camera (Silver)</a></h6>
                                        <div class="product_price">$520.00<span>$590.00</span></div>
                                    </div>
                                </div>
                                <div class="red_button add_to_cart_button"><a href="#">add to cart</a></div>
                            </div> */}
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
            </div>
        </div>
    )
}
