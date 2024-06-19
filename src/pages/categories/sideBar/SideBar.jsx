import React, { useState } from 'react'
import { RangeSlider } from '../../../components/rangeSlider/RangeSlider'

export const SideBar = () => {
    const [selectedSizes, setSelectedSizes] = useState([]);

    const handleSizeClick = (size) => {
        const newSelectedSizes = [...selectedSizes];
        if (newSelectedSizes.includes(size)) {
          setSelectedSizes(newSelectedSizes.filter((s) => s !== size));
        } else {
          setSelectedSizes([...newSelectedSizes, size]);
        }
    };

  return (
    <div class="sidebar">
    <div class="sidebar_section">
        <div class="sidebar_title">
            <h5>Product Category</h5>
        </div>
        <ul class="sidebar_categories">
            <li><a href="#">Men</a></li>
            <li ><a href="#"><span><i class="fa fa-angle-double-right" aria-hidden="true"></i></span>Women</a></li>
            <li><a href="#">Accessories</a></li>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Collection</a></li>
            <li><a href="#">Shop</a></li>
        </ul>
    </div>

    <div class="sidebar_section">
        <div class="sidebar_title">
            <h5>Filter by Price</h5>
        </div>
        <p>
            <RangeSlider/>
        </p>
        <div id="slider-range"></div>
        <div class="filter_button"><span>filter</span></div>
    </div>

    <div class="sidebar_section">
        <div class="sidebar_title">
            <h5>Sizes</h5>
        </div>
        <ul class="checkboxes">
            <li className={selectedSizes.includes('S') ? 'active' : ''}><i aria-hidden="true"
                className={selectedSizes.includes('S') ? 'fa-regular fa-square-check' : 'fa-regular fa-square'}
                onClick={() => handleSizeClick('S')}
            ></i><span>S</span></li>
            <li className={selectedSizes.includes('M') ? 'active' : ''}><i aria-hidden="true"
                className={selectedSizes.includes('M') ? 'fa-regular fa-square-check' : 'fa-regular fa-square'}
                onClick={() => handleSizeClick('M')}
            ></i><span>M</span></li>
            <li className={selectedSizes.includes('XL') ? 'active' : ''}><i aria-hidden="true"
                className={selectedSizes.includes('XL') ? 'fa-regular fa-square-check' : 'fa-regular fa-square'}
                onClick={() => handleSizeClick('XL')}
            ></i><span>XL</span></li>
            <li className={selectedSizes.includes('XXL') ? 'active' : ''}><i aria-hidden="true"
                className={selectedSizes.includes('XXL') ? 'fa-regular fa-square-check' : 'fa-regular fa-square'}
                onClick={() => handleSizeClick('XXL')}
            ></i><span>XXL</span></li>
        </ul>
    </div>

    <div class="sidebar_section">
        <div class="sidebar_title">
            <h5>Color</h5>
        </div>
        <ul class="checkboxes">
            <li><i class="fa-regular fa-square" aria-hidden="true"></i><span>Black</span></li>
            <li class="active"><i class="fa-regular fa-square-check" aria-hidden="true"></i><span>Pink</span></li>
            <li><i class="fa-regular fa-square" aria-hidden="true"></i><span>White</span></li>
            <li><i class="fa-regular fa-square" aria-hidden="true"></i><span>Blue</span></li>
            <li><i class="fa-regular fa-square" aria-hidden="true"></i><span>Orange</span></li>
            <li><i class="fa-regular fa-square" aria-hidden="true"></i><span>White</span></li>
            <li><i class="fa-regular fa-square" aria-hidden="true"></i><span>Blue</span></li>
            <li><i class="fa-regular fa-square" aria-hidden="true"></i><span>Orange</span></li>
            <li><i class="fa-regular fa-square" aria-hidden="true"></i><span>White</span></li>
            <li><i class="fa-regular fa-square" aria-hidden="true"></i><span>Blue</span></li>
            <li><i class="fa-regular fa-square" aria-hidden="true"></i><span>Orange</span></li>
        </ul>
        <div class="show_more">
            <span><span>+</span>Show More</span>
        </div>
    </div>

</div>
  )
}
