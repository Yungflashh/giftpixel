import React, { useState } from "react";
import TestimonialCard from "./TestimonialCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TestimonialSlider = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const sliderStyle = {
    padding: "50px 0",
    textAlign: "center",
    position: "relative",
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const dotStyle = {
    color: "#ff6e6e",
  };

  const subtitleStyle = {
    fontSize: "1rem",
    color: "#777",
    marginBottom: "30px",
  };

  const contentStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    gap: "20px",
  };

  const navBtnStyle = {
    background: "none",
    border: "none",
    fontSize: "2rem",
    color: "#333",
    cursor: "pointer",
  };

  const navigationStyle = {
    position: "absolute",
    bottom: "-80px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "20px",
  };

  return (
    <div style={sliderStyle}>
      <h2 style={titleStyle}>
        Testimonial <span style={dotStyle}>.</span>
      </h2>
      <p style={subtitleStyle}>See what people say about us</p>

      <div style={contentStyle}>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            style={{
              opacity: index === currentIndex ? 1 : 0,
              display: index === currentIndex ? "block" : "none",
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <TestimonialCard
              text={testimonial.text}
              name={testimonial.name}
              image={testimonial.image}
              highlight={index === currentIndex}
            />
          </div>
        ))}
      </div>

      <div style={navigationStyle}>
        <button
          style={navBtnStyle}
          onClick={handlePrev}
          aria-label="Previous Testimonial"
        >
          <FaChevronLeft />
        </button>
        <button
          style={navBtnStyle}
          onClick={handleNext}
          aria-label="Next Testimonial"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;  