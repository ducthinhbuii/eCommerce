import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch';
import {useSelector, useDispatch} from 'react-redux'
import { addCartItem } from '../../redux/actions';
import { getAllCartItems, getUserInfo } from '../../redux/selector';
import Spinner from '../spinner/Spinner';
import { postDataToAPI } from '../../ultis/postApi';

export const ListCard = () => {
    const [pageSize, setPageSize] = useState(12);
    const [pageNumber, setPageNumber] = useState(1);
    let url = `/api/product/?pageSize=${pageSize}&pageNumber=${pageNumber - 1}`
    const {data, isLoading, error} = useFetch(url);
    const [arrCurNumOfPages, setArrCurNumOfPages] = useState([])
    const totalPage = Math.ceil(data?.totalCount / pageSize);
    const auth = useSelector(getUserInfo);
    const token = localStorage.getItem("jwt");
    const dispatch = useDispatch();
    // const data = useSelector(getAllCartItems);
    // console.log(data)

    const handleAddToCart = async (product) => {
        console.log(product)
        dispatch(addCartItem({product: product}))
        const data = await postDataToAPI(`/api/cart/add/${auth.userInfo.id}`, {
            productId: product.id,
            quantity: 1,
            price: product.price,
            discountPrice: product.discountPrice
        }, token);
        console.log(data)
        // dispatch(addCartItem(product))
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
        isLoading ? <Spinner isLogin={true}/> :
        !isLoading && data && 
        <div class="row">
            <div class="col">
                <div class="product-grid">
                    {data.products.length >  0 && data.products?.map((product) => {
                        return (
                            <>
                                <div class="product-item men">
                                    <div class="product discount product_filter">
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
                    {/* <div class="product-item men">
                        <div class="product discount product_filter">
                            <div class="product_image">
                                <img src="https://raw.githubusercontent.com/thanhnam232/SaveSomthing/main/product_1.png" alt=""/>
                            </div>
                            <div class="favorite favorite_left"></div>
                            <div class="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center"><span>-$20</span></div>
                            <div class="product_info">
                                <h6 class="product_name"><a href="single.html">Fujifilm X100T 16 MP Digital Camera (Silver) Fujifilm X100T 16 MP Digital Camera (Silver)</a></h6>
                                <div class="product_price">$520.00<span>$590.00</span></div>
                            </div>
                        </div>
                        <div class="red_button add_to_cart_button"
                            onClick={() => handleAddToCart({
                                id: 1,
                                product_image: 'https://raw.githubusercontent.com/thanhnam232/SaveSomthing/main/product_1.png',
                                product_name: 'Fujifilm X100T 16 MP Digital Camera (Silver)',
                                product_price: 520
                            })}
                        ><a>add to cart</a></div>
                    </div>


                    <div class="product-item women">
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
                        <div class="red_button add_to_cart_button"
                            onClick={() => handleAddToCart({
                                id: 2,
                                product_image: '2',
                                product_name: '2',
                                product_price: 3
                            })}
                        ><a>add to cart</a></div>
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
                                <h6 class="product_name"><a href="#single.html">Fujifilm X100T 16 MP Digital Camera (Silver)</a></h6>
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
    )
}
