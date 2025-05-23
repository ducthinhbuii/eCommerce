import React from 'react'

export const Footer = () => {
  return (
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="footer_nav_container d-flex flex-sm-row flex-column align-items-center justify-content-lg-start justify-content-center text-center">
              <ul class="footer_nav">
                <li><a href="#">Blog</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="contact.html">Contact us</a></li>
              </ul>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="footer_social d-flex flex-row align-items-center justify-content-lg-end justify-content-center">
              <ul>
                <li><a href="#"><i class="fa-brands fa-facebook" aria-hidden="true"></i></a></li>
                <li><a href="#"><i class="fa-brands fa-twitter" aria-hidden="true"></i></a></li>
                <li><a href="#"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a></li>
                <li><a href="#"><i class="fa-brands fa-skype" aria-hidden="true"></i></a></li>
                <li><a href="#"><i class="fa-brands fa-pinterest" aria-hidden="true"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="footer_nav_container">
              <div class="cr">©2018 All Rights Reserverd. Made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="#">Colorlib</a> &amp; distributed by <a href="https://themewagon.com">ThemeWagon</a></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
