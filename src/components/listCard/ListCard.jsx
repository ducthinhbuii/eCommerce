import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { addCartItem } from '../../redux/actions';
import { getAllCartItems } from '../../redux/selector';

export const ListCard = () => {
    const dispatch = useDispatch();
    const data = useSelector(getAllCartItems);
    console.log(data)

    const handleAddToCart = (product) => {
        dispatch(addCartItem(product))
    }

    return (
        <div class="row">
            <div class="col">
                <div class="product-grid">
                    <div class="product-item men">
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
                    </div>
                </div>
            </div>
        </div>
    )
}
