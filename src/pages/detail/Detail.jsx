import React from 'react'
import './styles.scss'
import { BreadCrumbs } from './breadCrumbs/BreadCrumbs'
import { ItemDetail } from './itemDetail/ItemDetail'
import { Tab } from './tab/Tab'
import {Benefit} from '../home/benefit/Benefit'
import {NewsLetter} from '../home/newsLetter/NewsLetter'

export const Detail = () => {
  return (
    <>
      <div class="container single_product_container">
        <BreadCrumbs/>
        <ItemDetail/>
      </div>
      <Tab/>
      <Benefit/>
      <NewsLetter/>
    </>
  )
}
