import React, { useRef } from 'react'

export const Carousel = () => {
    const carouselContainer = useRef();
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
<div class="row">
    <div class="col">
        <div class="product_slider_container">
            <div class="owl-carousel owl-theme product_slider" ref={carouselContainer}>
                <div class="owl-item product_slider_item">
                    <div class="product-item">
                        <div class="product discount">
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
                    </div>
                </div>


                <div class="owl-item product_slider_item">
                    <div class="product-item women">
                        <div class="product">
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
                    </div>
                </div>


                <div class="owl-item product_slider_item">
                    <div class="product-item women">
                        <div class="product">
                            <div class="product_image">
                                <img src="https://raw.githubusercontent.com/thanhnam232/SaveSomthing/main/product_1.png" alt=""/>
                            </div>
                            <div class="favorite"></div>
                            <div class="product_info">
                                <h6 class="product_name"><a href="single.html">Blue Yeti USB Microphone Blackout Edition</a></h6>
                                <div class="product_price">$120.00</div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="owl-item product_slider_item">
                    <div class="product-item accessories">
                        <div class="product">
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
                    </div>
                </div>


                <div class="owl-item product_slider_item">
                    <div class="product-item women men">
                        <div class="product">
                            <div class="product_image">
                                <img src="https://raw.githubusercontent.com/thanhnam232/SaveSomthing/main/product_1.png" alt=""/>
                            </div>
                            <div class="favorite"></div>
                            <div class="product_info">
                                <h6 class="product_name"><a href="single.html">Pryma Headphones, Rose Gold & Grey</a></h6>
                                <div class="product_price">$180.00</div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="owl-item product_slider_item">
                    <div class="product-item accessories">
                        <div class="product discount">
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
                    </div>
                </div>


                <div class="owl-item product_slider_item">
                    <div class="product-item women">
                        <div class="product">
                            <div class="product_image">
                                <img src="https://raw.githubusercontent.com/thanhnam232/SaveSomthing/main/product_1.png" alt=""/>
                            </div>
                            <div class="favorite"></div>
                            <div class="product_info">
                                <h6 class="product_name"><a href="single.html">Samsung CF591 Series Curved 27-Inch FHD Monitor</a></h6>
                                <div class="product_price">$610.00</div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="owl-item product_slider_item">
                    <div class="product-item accessories">
                        <div class="product">
                            <div class="product_image">
                                <img src="https://raw.githubusercontent.com/thanhnam232/SaveSomthing/main/product_1.png" alt=""/>
                            </div>
                            <div class="favorite"></div>
                            <div class="product_info">
                                <h6 class="product_name"><a href="single.html">Blue Yeti USB Microphone Blackout Edition</a></h6>
                                <div class="product_price">$120.00</div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="owl-item product_slider_item">
                    <div class="product-item men">
                        <div class="product">
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
                    </div>
                </div>


                <div class="owl-item product_slider_item">
                    <div class="product-item men">
                        <div class="product">
                            <div class="product_image">
                                <img src="https://raw.githubusercontent.com/thanhnam232/SaveSomthing/main/product_1.png" alt=""/>
                            </div>
                            <div class="favorite"></div>
                            <div class="product_info">
                                <h6 class="product_name"><a href="single.html">Pryma Headphones, Rose Gold & Grey</a></h6>
                                <div class="product_price">$180.00</div>
                            </div>
                        </div>
                    </div>
                </div>
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
  )
}
