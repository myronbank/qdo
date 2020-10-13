import React, { Component } from 'react';
import Image1 from "../webStaticbackground/DSCF8515_edited.jpg";
import Image2 from "../webStaticbackground/DSCF8574_edited.jpg";
import Image3 from "../webStaticbackground/DSCF8602_edited.jpg";

class Slideshow extends Component {
  state = {
    slideIndex: 1,
    status: [
      true,
      false,
      false
    ]
  }

  plusSlides(current) {
    console.log('event fired');
    const maxNumberOfImages = this.state.status.length;
    if (this.state.slideIndex >= maxNumberOfImages && current == 1) { current = 1 }
    else if (this.state.slideIndex == 1 && current == -1) {
      current = maxNumberOfImages;
    }
    else { current += this.state.slideIndex }
    this.showSlides(current, this.state.slideIndex);
  }

  // currentSlide = (n) => {
  //   this.showSlides(n);
  // }

  showSlides(current, prev) {
    const status = [...this.state.status];
    console.log(status);
    for (let i = 0; i < this.state.status.length; i++) {
      status[i] = false;
    }
    status[current - 1] = true;
    this.setState({ status, slideIndex: current });
  }
  // const dot = this.dot.current.children;
  // dot[prev - 1].className.replace('active', "");
  // dot[current - 1].className += 'active';


  // var i;
  // var slides = document.getElementsByClassName("mySlides");
  // var dots = document.getElementsByClassName("dot");
  // if (n > slides.length) { slideIndex = 1 }
  // if (n < 1) { slideIndex = slides.length }
  // for (i = 0; i < slides.length; i++) {
  //   slides[i].style.display = "none";
  // }
  // for (i = 0; i < dots.length; i++) {
  //   dots[i].className = dots[i].className.replace(" active", "");
  // }
  // slides[slideIndex - 1].style.display = "block";
  // dots[slideIndex - 1].className += " active";
  //   <div style="text-align:center" ref={this.dot}>
  //   <span class="dot" onClick={currentSlide(1)}></span>
  //   <span class="dot" onClick={currentSlide(2)}></span>
  //   <span class="dot" onClick={currentSlide(3)}></span>
  // </div>
  render() {
    return (
      <React.Fragment>
        <div className="slideshow-containter">
          {this.state.status[0] && <div className="mySlides fade">
            <img src={Image1} />
          </div>}
          {this.state.status[1] && <div className="mySlides fade">
            <img src={Image2} />
          </div>}
          {this.state.status[2] && <div className="mySlides fade">
            <img src={Image3} />
          </div>}
          <a className="prev" onClick={() => this.plusSlides(-1)}>&#10094;</a>
          <a className="next" onClick={() => this.plusSlides(1)}>&#10095;</a>
        </div>
      </React.Fragment>
    );
  }
}

export default Slideshow;