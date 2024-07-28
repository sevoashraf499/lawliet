import { useState, useEffect } from "react";
import { Container, Image } from "react-bootstrap";

// react slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// my styles
import "./../styles/Testimonials.scss";

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`my-custom-nav-arrows-class ${className}`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`my-custom-nav-arrows-class ${className}`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          "https://66a5336c5dc27a3c190aea7c.mockapi.io/api/testimonials"
        );
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  const settings = {
    lazyLoad: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // these settings applies under 1024
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992, // these settings applies under 992
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576, // these settings applies under 576
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // dots: false,
        },
      },
    ],
  };

  return (
    <Container className="section-4-container" id="testimonials">
      <h1 className="display-5">Clients Testimonials</h1>

      <Slider {...settings}>
        {testimonials?.map((testimonial, index) => {
          return (
            <div className="testimonial-card" key={index}>
              <div className="text">
                <h5 className="h5 title">{testimonial.title}</h5>
                <span className="description">{testimonial.description}</span>
              </div>

              <div className="person">
                <Image src={testimonial.image} alt="person" />

                <div className="person-info-box">
                  <h5 className="h5 name">{testimonial.name}</h5>
                  <span className="position">{testimonial.position}</span>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </Container>
  );
};

export default Testimonials;
