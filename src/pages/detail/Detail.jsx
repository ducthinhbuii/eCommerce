import React from 'react'
import './styles.scss'
import { BreadCrumb } from '../categories/breadCrumb/BreadCrumb'
import { ItemDetail } from './itemDetail/ItemDetail'
import { Tab } from './tab/Tab'
import {Benefit} from '../home/benefit/Benefit'
import {NewsLetter} from '../home/newsLetter/NewsLetter'

export const Detail = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryId = urlParams.get("categoryId")
  const productId = urlParams.get("productId")

  return (
    <>
      <div class="container single_product_container">
        <BreadCrumb categoryId={categoryId}/>
        <ItemDetail productId={productId}/>
      </div>
      <Tab productId={productId}/>
      <Benefit/>
      <NewsLetter/>
    </>
  )
}
