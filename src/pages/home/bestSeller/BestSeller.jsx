import React from 'react'
import { Carousel } from '../../../components/carousel/Carousel'

export const BestSeller = () => {
  return (
    <div class="best_sellers">
        <div class="container">
            <div class="row">
                <div class="col text-center">
                    <div class="section_title new_arrivals_title">
                        <h2>Best Sellers</h2>
                    </div>
                </div>
            </div>
            <Carousel/>
        </div>
    </div>
  )
}
