import React from 'react'
import './styles.scss'
import {Slider} from './slider/Slider'
import { Banner } from './banner/Banner'
import { NewArrive } from './newArrive/NewArrive'
import { Deal } from './deal/Deal'
import { BestSeller } from './bestSeller/BestSeller'

export const Home = () => {
  return (
    <>
      <Slider/>
      <Banner/>
      <NewArrive/>
      <Deal/>
      <BestSeller/>
    </>
  )
}
