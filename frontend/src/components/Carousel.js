import "./Carousel.scss";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import graphic1 from "../images/graphic1.svg";

export default function Carousel({ itemData }) {
    // const cImage = `http://localhost:5000/images/${item}`;
    console.log(itemData);
    return (
        <div className="carousel-wrapper">
            <Splide data-splide='{"type":"loop"}'>
                {itemData.images.map((item) => {
                    return (
                        <SplideSlide className="slide" key={item}>
                            <img
                                src={`http://localhost:5000/images/${item}`}
                            ></img>
                        </SplideSlide>
                    );
                })}
            </Splide>
        </div>
    );
}
