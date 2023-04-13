import "./Carousel.scss";
import "@splidejs/react-splide/css";

import { Splide, SplideSlide } from "@splidejs/react-splide";

export default function Carousel({ itemData }) {
	console.log(itemData);
	return (
		<div className="carousel-wrapper">
			<Splide data-splide='{"type":"loop"}'>
				{itemData.images.map((item) => {
					return (
						<SplideSlide className="slide" key={item}>
							<img src={`http://localhost:5000/images/${item}`}></img>
						</SplideSlide>
					);
				})}
			</Splide>
		</div>
	);
}
