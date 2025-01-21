import { useState, useEffect } from 'react';

const AboutSection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    section: {
      backgroundColor: "rgba(242, 223, 216, 1)", // Light pink background
      padding: "4rem 2rem",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", // Single column on mobile, two columns on desktop
      alignItems: "center", // Align text and image in the center
      gap: "2rem",
    },
    imageContainer: {
      display: "flex",
      justifyContent: isMobile ? "center" : "flex-start", // Center on mobile, align left on desktop
      alignItems: "center",
      alignSelf: isMobile ? "initial" : "flex-end", // Move image to bottom on larger screens
      order: isMobile ? "2" : "1", // Show image below text on mobile
      position: "relative", // Needed for bottom positioning
      marginBottom: "-63px", // Needed for bottom positioning
    },
    
    image: {
      width: isMobile ? "70%" : "90%", // Adjust size based on screen
      objectFit: "contain",
    },
    textContainer: {
      order: isMobile ? "1" : "2", // Show text above image on mobile
      textAlign: isMobile ? "center" : "left",
    },
    titleContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: isMobile ? "center" : "flex-start",
      marginBottom: "1rem",
    },
    dot: {
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      backgroundColor: "#b91c1c", // Deep red
      marginRight: "0.5rem",
    },
    title: {
      fontSize: "2rem",
      color: "#b91c1c", // Deep red
      margin: 0,
    },
    text: {
      fontSize: "1rem",
      color: "#4b5563", // Neutral gray
      lineHeight: "1.8",
      marginBottom: "1rem",
    },
  };

  return (
    <section id="about-us" style={styles.section}>
      <div style={styles.container}>
        {/* Image Container */}
        <div style={styles.imageContainer}>
          <img
            src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1737150910/Group_64_fq7zu1.png"
            alt="Mobile App Screenshot"
            style={styles.image}
          />
        </div>

        {/* Text Container */}
        <div style={styles.textContainer}>
          <div style={styles.titleContainer}>
            <span style={styles.dot}></span>
            <h2 style={styles.title}>About Us</h2>
          </div>
          <p style={styles.text}>
            Welcome to GiftPixel, your go-to platform for creating personalized
            Promise Cards that bring joy and connection to every occasion. At
            GiftPixel, we believe in the power of thoughtful gestures and
            meaningful interactions. Our platform allows you to create and
            share unique Promise Cards with your loved ones, strengthening
            bonds and spreading happiness.
          </p>
          <p style={styles.text}>
            With GiftPixel, you can create personalized Promise Cards by adding
            any type of gift items or money to your promise list, making each
            interaction thoughtful and unique. Any money fulfilled as part of a
            promise is securely deposited into the GiftPixel wallet, where you
            can easily withdraw it to your preferred account through a trusted
            and secure payment gateway.
          </p>
          <p style={styles.text}>
            Whether you&lsquo;re celebrating a special milestone, sharing a heartfelt
            promise, or planning a memorable event, GiftPixel provides the
            tools you need to make every moment extraordinary. Join our
            community today and discover a new way to create, share, and
            connect with the ones you care about the most.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
