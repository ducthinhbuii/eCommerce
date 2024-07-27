import React from 'react'

export const Banner = () => {
  return (
    <div class="banner">
		<div class="container">
			<div class="row">
				<div class="col-md-4">
					<div class="banner_item align-items-center" style={{ backgroundImage: 'url(https://icrrd.com/public/media/14-05-2021-122644sell-like-crazy.jpg)' }}>
						<div class="banner_category">
							<a href="categories.html">Book</a>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="banner_item align-items-center" style={{ backgroundImage: 'url(https://fnsharp.com/cdn/shop/articles/greek-cooking-tools-featured_1080x.jpg?v=1617738818)' }}>
						<div class="banner_category">
							<a href="categories.html">Cook</a>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="banner_item align-items-center" style={{ backgroundImage: 'url(https://baiviet.queenmobile.net/wp-content/uploads/2023/09/l4u0d6bykr0nw.jpg)' }}>
						<div class="banner_category">
							<a href="categories.html">Smart Phone</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
  )
}
