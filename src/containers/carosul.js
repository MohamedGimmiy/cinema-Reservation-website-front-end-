import React, { Component } from "react";

import { Carousel } from 'react-responsive-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from '../images/1.jpg';
import img2 from '../images/2.jpg';
import img3 from '../images/3.jpg';

export class CarouselComponent extends Component {
    render() {
        return (
            <div className='container mb-5'>
                <div className='row'>
                    <div className='col-md-12'>
                    <Carousel showThumbs={false} autoPlay={true} dynamicHeight={true} showArrows={true} >
                <div>
                    <img  src={ img1 } width={1600} height={500} alt=''/>
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src={img2} height={500} alt='' />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src={img3} height={500} alt='' />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
                    </div>
                </div>
            </div>


        );
    }
};

//ReactDOM.render(<CarouselComponent />, document.querySelector('.demo-carousel'));

