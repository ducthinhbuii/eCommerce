import React from 'react'
import './styles.scss'

export const RangeSlider = () => {
  return (
    <div className='ranger'>
        <div className="sliderValue">
            <span>100</span>
        </div>
        <div className="field">
            <div className="value left">0</div>
            <input type='range' min='0' max='200' step='1'/>
            <div className="value right">200</div>
        </div>
    </div>
  )
}
