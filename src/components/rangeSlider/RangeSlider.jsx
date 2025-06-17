import React, { useState, useEffect } from 'react'
import {useDispatch } from 'react-redux';
import './styles.scss'
import { rangePriceSlice } from '../../pages/categories/sideBar/rangePriceSlice';

export const RangeSlider = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const dispatch = useDispatch();

  const handleFilter = () => {
    console.log(minPrice, maxPrice)
    dispatch(rangePriceSlice.actions.rangePrice({minPrice, maxPrice}));
  }

  return (
    <>
    <p>
    <div className='ranger'>
        <div className="sliderValue">
            {/* <span className={isValueChangedByUser ? 'show' : ''} style={{left: `${value/2}%`}}>{value}</span> */}
        </div>
        <div className="field">
            {/* <div className="value left">0</div> */}
            <input style={{textAlign: 'center'}} min={0} type="number" value={minPrice} onChange={(e)=>{setMinPrice(e.target.value)}}/>
            <i class="fa-solid fa-circle-right"></i>
            {/* <input type='range' min='0' max='1000' step='1' value={value} onChange={(e) => {
              setValue(e.target.value)
            }}
            /> */}
            <input style={{textAlign: 'center'}} min={0} type="number" value={maxPrice} onChange={(e)=>{setMaxPrice(e.target.value)}}/>
            {/* <div className="value right">1000</div> */}
        </div>
    </div>
    </p>
    <div id="slider-range"></div>
    <div onClick={handleFilter} class="filter_button"><span>filter</span></div>
    </>
  )
}
