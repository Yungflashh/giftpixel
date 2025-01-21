import React from "react";
import { FaQuoteRight } from "react-icons/fa";
import PropTypes from "prop-types";

const TestimonialCard = ({ text, name, image, highlight }) => {
  const cardStyle = {
    backgroundColor: highlight ? "rgba(255, 80, 80, 1)" : "#fff",
    color: highlight ? "#fff" : "#555",
    borderRadius: "10px",
    padding: "20px",  // Reduced padding for better fit
    width: "100%", // Make card width flexible
    maxWidth: "350px", // Reduced maximum width
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    opacity: highlight ? 1 : 0.6,
    transform: highlight ? "scale(1.05)" : "scale(1)",
    transition: "all 0.3s ease",
    position: "relative",
    margin: "10px",
  };

  const quoteIconStyle = {
    color: highlight ? "#fff" : "#555",
    fontSize: "1.8rem",  // Slightly smaller quote icon
    marginBottom: "15px",  // Reduced margin
  };

  const textStyle = {
    fontSize: "0.9rem",  // Smaller text for tighter fit
    lineHeight: "1.4",   // Adjusted line height for compact text
    marginBottom: "15px",  // Reduced space between text and author info
  };

  const authorInfoStyle = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "absolute",
    bottom: "-70px",  // Adjusted position for better placement on small screens
    left: "50%",
    transform: "translateX(-50%)",
  };

  const authorImageStyle = {
    width: "60px",  // Further reduced size
    height: "60px",
    borderRadius: "50%",
    border: highlight ? "3px solid #fff" : "3px solid #FF6E6E",
    marginBottom: "8px",  // Reduced space below the image
  };

  const authorNameStyle = {
    fontSize: "0.875rem",  // Smaller font for author's name
    color: highlight ? "#121111" : "#333",
    fontWeight: "bold",
    marginTop: "5px",
  };

  // Media query styles for smaller screens (e.g., mobile)
  const mediaQueries = {
    "@media (max-width: 768px)": {
      cardStyle: {
        padding: "15px",  // Further reduced padding
        maxWidth: "90%",   // Make the card take up more space on medium screens
      },
      quoteIconStyle: {
        fontSize: "1.6rem",  // Smaller quote icon for medium screens
      },
      textStyle: {
        fontSize: "0.85rem",  // Smaller text size for better readability
      },
      authorImageStyle: {
        width: "50px",  // Further reduced author image size
        height: "50px",
      },
      authorNameStyle: {
        fontSize: "0.75rem",  // Smaller font size for author's name
      },
    },
    "@media (max-width: 480px)": {
      cardStyle: {
        padding: "10px",  // Further reduced padding for very small screens
        maxWidth: "100%",  // Full width for tiny screens
      },
      quoteIconStyle: {
        fontSize: "1.4rem",  // Much smaller quote icon
      },
      textStyle: {
        fontSize: "0.75rem",  // Adjust text size for very small screens
      },
      authorImageStyle: {
        width: "40px",  // Further reduced author image size
        height: "40px",
      },
      authorNameStyle: {
        fontSize: "0.7rem",  // Even smaller font for author's name
      },
    },
  };

  // Helper function to apply media query styles dynamically
  const applyMediaQueryStyles = (styleObj) => {
    let style = { ...styleObj };
    for (const query in mediaQueries) {
      if (window.matchMedia(query).matches) {
        style = { ...style, ...mediaQueries[query] };
      }
    }
    return style;
  };

  return (
    <div style={applyMediaQueryStyles(cardStyle)}>
      <div style={applyMediaQueryStyles(quoteIconStyle)}>
        <FaQuoteRight />
      </div>
      <p style={applyMediaQueryStyles(textStyle)}>{text}</p>
      <div style={authorInfoStyle}>
        <img src={image} alt={name} style={applyMediaQueryStyles(authorImageStyle)} />
        <p style={applyMediaQueryStyles(authorNameStyle)}>{name}</p>
      </div>
    </div>
  );
};

TestimonialCard.propTypes = {
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  highlight: PropTypes.bool,
};

export default TestimonialCard;
