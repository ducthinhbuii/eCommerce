import React from 'react'
import './styles.scss'
import { BreadCrumb } from './breadCrumb/BreadCrumb'
import { SideBar } from './sideBar/SideBar'
import { Products } from './products/Products'
import { Benefit } from '../home/benefit/Benefit'
import {NewsLetter} from '../home/newsLetter/NewsLetter'

export const Categories = () => {
  return (
    <div className="categories">
	    <div class="container product_section_container">
		    <div class="row">
		        <div class="col product_section clearfix">
                    <BreadCrumb/>
                    <SideBar/>
                    <Products/>
                </div>
            </div>
        </div>
            <Benefit />
            <NewsLetter />
    </div>
    
  )
}
