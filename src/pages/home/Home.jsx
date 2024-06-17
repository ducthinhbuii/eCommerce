import React from 'react'
import './styles.scss'
import {Slider} from './slider/Slider'
import { Banner } from './banner/Banner'
import { NewArrive } from './newArrive/NewArrive'
import { Deal } from './deal/Deal'
import { BestSeller } from './bestSeller/BestSeller'
import { Benefit } from './benefit/Benefit'
import { Blog } from './blog/Blog'
import { NewsLetter } from './newsLetter/NewsLetter'

export const Home = () => {
  return (
    <>
      <Slider/>
      <Banner/>
      <NewArrive/>
      <Deal/>
      <BestSeller/>
      <Benefit/>
      <Blog/>
      <NewsLetter/>
    </>
  )
}
