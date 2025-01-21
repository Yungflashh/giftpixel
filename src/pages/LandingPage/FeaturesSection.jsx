
import { FaEnvelope } from "react-icons/fa";

const FeaturesSection = () => {
  return (
    
    <section id="features" style={styles.container}>
      <h1 style={styles.header}>Explore Our Fundamental Features</h1>
      <div style={styles.wrapper}>
        <div style={styles.contentWrapper}>
          {/* Left Section: Image */}
          <div style={styles.imageWrapper}>
            <img
              src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1736644203/hug_fbfoth.jpg"
              alt="Happy Woman"
              style={styles.image}
            />
            <div style={styles.inputOverlay}>
              <FaEnvelope style={styles.icon} />
              <input
                type="email"
                placeholder="Your email address"
                style={styles.input}
              />
              <button style={styles.button}>Get Started</button>
            </div>
          </div>

          {/* Right Section: Text and Chart Image */}
          <div style={styles.textWrapper}>
            <div style={styles.textContent}>
              <h3 style={styles.featureTitle}>
                Seamless Financial Tracking & Transactions
              </h3>
              <p style={styles.description}>
                Manage your finances effortlessly, funds deposit directly from
                your Promise Card, withdraw money with ease to any account using
                a secure payment gateway.
              </p>
            </div>
            <div style={styles.chartWrapper}>
              <img
                src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1736645509/Frame_715_1_nf48ho.png"
                alt="Financial Chart"
                style={styles.chartImage}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  container: {
    width: "100%",
    padding: "30px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
  },
  wrapper: {
    maxWidth: "100%",
  },
  header: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "30px",
    textAlign: "center",
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap", // Allow wrapping
    maxWidth: "1220px",
    width: "100%",
    gap: "40px",
    boxSizing: "border-box",
    justifyContent: "center", // Center items on smaller screens
  },
  imageWrapper: {
    position: "relative",
    flex: "1 1 45%", // Shrinks or grows to 45% width
    maxWidth: "100%", // Ensures it doesn't overflow
    backgroundColor: "#f8f8f8",
    borderRadius: "12px",
    overflow: "hidden",
  },
  image: {
    borderRadius: "12px",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  inputOverlay: {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(0, 0, 0, 0)",
    padding: "10px 20px",
    borderRadius: "50px",
    border: "1px solid white",
    width: "70%",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  },
  input: {
    border: "none",
    outline: "none",
    padding: "10px",
    fontSize: "14px",
    flex: "1",
    backgroundColor: "transparent",
    color: "white",
  },
  icon: {
    color: "black",
    fontSize: "16px",
    marginRight: "10px",
  },
  button: {
    backgroundColor: "#FF6E6E",
    color: "#fff",
    border: "none",
    outline: "none",
    padding: "10px 20px",
    borderRadius: "50px",
    fontSize: "14px",
    cursor: "pointer",
    marginLeft: "10px",
  },
  textWrapper: {
    flex: "1 1 45%", // Shrinks or grows to 45% width
    maxWidth: "100%", // Ensures it doesn't overflow
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "left",
    backgroundColor: "#f8f8f8",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundImage: `url('https://res.cloudinary.com/dqbbm0guw/image/upload/v1736675747/Grid_rcitvb.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  textContent: {
    marginBottom: "auto",
  },
  featureTitle: {
    fontSize: "1.8rem",
    color: "#FF6E6E",
    marginBottom: "10px",
  },
  description: {
    fontSize: "1rem",
    color: "#555",
    lineHeight: "1.6",
    marginBottom: "20px",
  },
  chartWrapper: {
    width: "100%",
    maxWidth: "400px",
    marginTop: "20px",
  },
  chartImage: {
    width: "100%",
    height: "auto",
    borderRadius: "12px",
  },

  // Responsive media queries
  "@media (max-width: 768px)": {
    contentWrapper: {
      flexDirection: "column", // Stack items vertically on small screens
      alignItems: "center",
      gap: "20px",
    },
    imageWrapper: {
      flex: "1 1 100%", // Full width on smaller screens
    },
    textWrapper: {
      flex: "1 1 100%", // Full width on smaller screens
    },
  },
};

export default FeaturesSection;
