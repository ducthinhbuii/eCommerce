import React, { useState, useEffect } from 'react'
import './styles.scss'

export const RangeSlider = () => {
  const [value, setValue] = useState(0);

  return (
    <div className='ranger'>
        <div className="sliderValue">
            {/* <span className={isValueChangedByUser ? 'show' : ''} style={{left: `${value/2}%`}}>{value}</span> */}
        </div>
        <div className="field">
            {/* <div className="value left">0</div> */}
            <input type="number"/>
            <i class="fa-solid fa-circle-right"></i>
            {/* <input type='range' min='0' max='1000' step='1' value={value} onChange={(e) => {
              setValue(e.target.value)
            }}
            /> */}
            <input type="number"/>
            {/* <div className="value right">1000</div> */}
        </div>
    </div>
  )
}
