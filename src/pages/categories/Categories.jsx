import React, { useState } from 'react'
import './styles.scss'
import { useParams } from 'react-router-dom'
import { BreadCrumb } from './breadCrumb/BreadCrumb'
import { SideBar } from './sideBar/SideBar'
import { Products } from './products/Products'
import { Benefit } from '../home/benefit/Benefit'
import {NewsLetter} from '../home/newsLetter/NewsLetter'

export const Categories = () => {
  const {categoryId} = useParams()

  return (
    <div className="categories">
	    <div class="container product_section_container">
		    <div class="row">
		        <div class="col product_section clearfix">
                    <BreadCrumb categoryId={categoryId}/>
                    <SideBar categoryId={categoryId}/>
                    <Products categoryId={categoryId}/>
                </div>
            </div>
        </div>
            <Benefit />
            <NewsLetter />
    </div>
    
  )
}
