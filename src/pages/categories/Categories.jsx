import React from 'react'
import './styles.scss'
import { BreadCrumb } from './breadCrumb/BreadCrumb'
import { SideBar } from './sideBar/SideBar'
import { Products } from './products/Products'

export const Categories = () => {
  return (
    <>
	    <div class="container product_section_container">
		    <div class="row">
		        <div class="col product_section clearfix">
                    <BreadCrumb/>
                    <SideBar/>
                    <Products/>
                </div>
            </div>
        </div>
    </>
  )
}
