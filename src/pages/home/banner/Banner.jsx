import React from 'react'

export const Banner = () => {
  return (
    <div class="banner">
		<div class="container">
			<div class="row">
				<div class="col-md-4">
					<div class="banner_item align-items-center" style={{ backgroundImage: 'url(https://raw.githubusercontent.com/thanhnam232/SaveSomthing/main/slider_1.jpg)' }}>
						<div class="banner_category">
							<a href="categories.html">women's</a>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="banner_item align-items-center" style={{ backgroundImage: 'url(https://raw.githubusercontent.com/thanhnam232/SaveSomthing/main/slider_1.jpg)' }}>
						<div class="banner_category">
							<a href="categories.html">accessories's</a>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="banner_item align-items-center" style={{ backgroundImage: 'url(https://raw.githubusercontent.com/thanhnam232/SaveSomthing/main/slider_1.jpg)' }}>
						<div class="banner_category">
							<a href="categories.html">men's</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
  )
}
