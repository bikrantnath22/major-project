import React from 'react'
import { Carousel, CarouselItem } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Img1 from './images/image4.jpg'
import Img2 from './images/image5.jpg'
import Img3 from './images/image7.jpg'



function Slideshow () {
    return (
        <div>
            <Carousel>
                <CarouselItem>
                    <img src={Img1}  margin-left="5px" height="500px" width="100%" alt="Img1"/>
                </CarouselItem>
                <CarouselItem>
                    <img src={Img2}   margin-left="5px" height="500px" width="100%" alt="Img1"/>
                </CarouselItem>
                <CarouselItem>
                    <img src={Img3}  margin-left="5px" height="500px" width="100%" alt="Img1"/>
                </CarouselItem>
            </Carousel>
        </div>
    )
}
export default Slideshow;