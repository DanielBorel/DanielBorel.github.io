import React, { Component } from 'react';
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    let carouselItems = this.props.carouselItems;
    return (
       <div className="carousel slide cid-rnToATNuq5"  id="slider1-x">
          <div className="full-screen">
            <div className="mbr-slider">
              <ol className="carousel-indicators">
                  { carouselItems.map((data,i) => {
                    return (
                      <li data-target="#slider1-x" className={data.isActive} data-slide-to={i} key={data.itemName + i}></li>
                    )
                  })}
              </ol>
              <div className="carousel-inner">
                  { carouselItems.map((data,i) => {
                    return (
                      <div className={"carousel-item slider-fullscreen-image" + data.isActive} style={{backgroundImage: `url(${data.ImgUrl})`}} key={data.itemName}>
                        <div className="container container-slide">
                            <div className="image_wrapper">
                                <div className="mbr-overlay"></div>
                                <div className="carousel-caption justify-content-center">
                                    <div className="col-10 align-center">
                                        <h2 className="mbr-fonts-style display-1"><strong>{data.itemName}</strong></h2>
                                        { i === 0 ? <h2 className="mbr-fonts-style display-5"><strong>{this.props.ourservicesDescrption}</strong></h2> : null}
                                        <p className="lead mbr-text mbr-fonts-style display-5">{data.descryption}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
              <a className="carousel-control carousel-control-prev" role="button" data-slide="prev" href="#slider1-x">
                <span aria-hidden="true" className="mbri-left mbr-iconfont"></span><span className="sr-only">Previous</span></a>
              <a className="carousel-control carousel-control-next" role="button" data-slide="next" href="#slider1-x">
                <span aria-hidden="true" className="mbri-right mbr-iconfont"></span><span className="sr-only">Next</span></a>
            </div>
          </div>
       </div>
    );
  }
}
