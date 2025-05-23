
import React, { useState } from 'react'
import useFetch from '../../../hooks/useFetch'

export const Tab = ({productId}) => {
    const [activeTab, setActiveTab] = useState('tab_1')
    const handleActiveTab = (tab) => {
        console.log('ok')
        if(activeTab !== tab) {
            setActiveTab(tab)
        }
    }
    const {data, isLoading} = useFetch(`/api/product/${productId}`)

    return (
        data && !isLoading &&
    <div class="tabs_section_container">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="tabs_container">
                        <ul class="tabs d-flex flex-sm-row flex-column align-items-left align-items-md-center justify-content-center">
                            <li class={activeTab === 'tab_1' ? 'tab active' : 'tab'} data-active-tab="tab_1"
                                onClick={() => handleActiveTab('tab_1')}
                            ><span>Description</span></li>
                            <li class={activeTab === 'tab_2' ? 'tab active' : 'tab'} data-active-tab="tab_2"
                                onClick={() => handleActiveTab('tab_2')}
                            ><span>Additional Information</span></li>
                            <li class={activeTab === 'tab_3' ? 'tab active' : 'tab'} data-active-tab="tab_3"
                                onClick={() => handleActiveTab('tab_3')}
                            ><span>Reviews (2)</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">


                    <div id="tab_1"
                        class={activeTab === 'tab_1' ? 'tab_container active' : 'tab_container'}
                        
                    >
                        <div class="row">
                            <div class="tab_title">
                                <h4>Description</h4>
                                <div className='tab_content' dangerouslySetInnerHTML={{ __html: data.description } } />
                            </div>
                        </div>
                    </div>


                    <div id="tab_2" 
                        class={activeTab === 'tab_2' ? 'tab_container active' : 'tab_container'}
                        
                    >
                        <div class="row">
                            <div class="col additional_info_col">
                                <div class="tab_title additional_info_title">
                                    <h4>Additional Information</h4>
                                </div>
                                <p>COLOR:<span>Gold, Red</span></p>
                                <p>SIZE:<span>L,M,XL</span></p>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Tab Reviews --> */}

                    <div id="tab_3" 
                        class={activeTab === 'tab_3' ? 'tab_container active' : 'tab_container'}
                        
                    >
                        <div class="row">

                            {/* <!-- User Reviews --> */}

                            <div class="col-lg-6 reviews_col">
                                <div class="tab_title reviews_title">
                                    <h4>Reviews (2)</h4>
                                </div>

                                {/* <!-- User Review --> */}

                                <div class="user_review_container d-flex flex-column flex-sm-row">
                                    <div class="user">
                                        <div class="user_pic"></div>
                                        <div class="user_rating">
                                            <ul class="star_rating">
                                                <li><i class="fa-solid fa-star" aria-hidden="true"></i></li>
                                                <li><i class="fa-solid fa-star" aria-hidden="true"></i></li>
                                                <li><i class="fa-solid fa-star" aria-hidden="true"></i></li>
                                                <li><i class="fa-solid fa-star" aria-hidden="true"></i></li>
                                                <li><i class="fa-regular fa-star" aria-hidden="true"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="review">
                                        <div class="review_date">27 Aug 2016</div>
                                        <div class="user_name">Brandon William</div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                </div>

                                {/* <!-- User Review --> */}

                                <div class="user_review_container d-flex flex-column flex-sm-row">
                                    <div class="user">
                                        <div class="user_pic"></div>
                                        <div class="user_rating">
                                            <ul class="star_rating">
                                                <li><i class="fa-solid fa-star" aria-hidden="true"></i></li>
                                                <li><i class="fa-solid fa-star" aria-hidden="true"></i></li>
                                                <li><i class="fa-solid fa-star" aria-hidden="true"></i></li>
                                                <li><i class="fa-solid fa-star" aria-hidden="true"></i></li>
                                                <li><i class="fa-regular fa-star" aria-hidden="true"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="review">
                                        <div class="review_date">27 Aug 2016</div>
                                        <div class="user_name">Brandon William</div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Add Review --> */}

                            <div class="col-lg-6 add_review_col">

                                <div class="add_review">
                                    <form id="review_form" action="post">
                                        <div>
                                            <h1>Add Review</h1>
                                            <input id="review_name" class="form_input input_name" type="text" name="name" placeholder="Name*" required="required" data-error="Name is required."/>
                                            <input id="review_email" class="form_input input_email" type="email" name="email" placeholder="Email*" required="required" data-error="Valid email is required."/>
                                        </div>
                                        <div>
                                            <h1>Your Rating:</h1>
                                            <ul class="user_star_rating">
                                                <li><i class="fa-solid fa-star" aria-hidden="true"></i></li>
                                                <li><i class="fa-solid fa-star" aria-hidden="true"></i></li>
                                                <li><i class="fa-solid fa-star" aria-hidden="true"></i></li>
                                                <li><i class="fa-solid fa-star" aria-hidden="true"></i></li>
                                                <li><i class="fa-regular fa-star" aria-hidden="true"></i></li>
                                            </ul>
                                            <textarea id="review_message" class="input_review" name="message"  placeholder="Your Review" rows="4" required data-error="Please, leave us a review."></textarea>
                                        </div>
                                        <div class="text-left text-sm-right">
                                            <button id="review_submit" type="submit" class="red_button review_submit_btn trans_300" value="Submit">submit</button>
                                        </div>
                                    </form>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
    )
}