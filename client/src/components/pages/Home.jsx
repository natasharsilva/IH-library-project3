import React, { Component } from 'react';
import { Button, Carousel, CarouselItem, CarouselControl,  CarouselIndicators, CarouselCaption } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookReader , faMapMarkerAlt, faUsers, faBookOpen} from '@fortawesome/free-solid-svg-icons'

import './../../index.scss';


const items = [
  {
    // src: '../../../public/images/logo.svg',
    altText: `"What an amazing app! Now I can share my books with everyone from my company"`,
    //  caption: 'Slide 1'
  },
  {
    // src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: 'Amazing!',
    // caption: 'Slide 2'
  },
  {
    // src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    altText: '"Love it!"',
    // caption: 'Slide 3'
  }
];


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }



  render() { 
    
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });


    return (
      <div className="Home">
        <div className="home-header">
          <img src="../../../images/logo.svg" alt="logo"></img>
          <h2>Smart Shelf</h2>
          <Button href="/signup" className="button-home" color="primary" size="lg" border-radius="30px" block>Get Started</Button>
        </div>
        <div className="home-features">
          <div className="features features-1">
            <FontAwesomeIcon icon={faUsers} size="4x" className="icon"/>
            <h3>Create and share your own library</h3>
            <p>Make your library online and share it with your friends and colleagues. Create a wonderful community of books!</p>
          </div>
          <div className="features features-2">
            <FontAwesomeIcon icon={faBookOpen} size="4x" className="icon"/>
            <h3>Keep track of your physical books</h3>
            <p>Register your books easily and efficiently with their ISBN number and add your own review before you borrow them to your friends!</p>
          </div>
          <div className="features features-3">
            <FontAwesomeIcon icon={faBookReader} size="4x" className="icon"/>
            <h3>Find and contribute to other libraries</h3>
            <p>Search for available libraries nearby you can borrow books from... And ask to be a part of them!</p>
          </div>
          <div className="home-location">
            <FontAwesomeIcon icon={faMapMarkerAlt} size="4x" className="icon"/>
            <h3>Find libraries near you</h3>  
          </div>
        </div>
        <div className="testimonials features">
          <h2>Testimonials</h2>
          <Carousel
              activeIndex={activeIndex}
              next={this.next}
              previous={this.previous}>
              <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
              {slides}
              <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
              <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
          </Carousel>
        </div>
      </div>
    );
  }
}
