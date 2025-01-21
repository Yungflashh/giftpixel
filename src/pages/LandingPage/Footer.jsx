import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        {/* Logo and Description */}
        <div className="footer-container">
          <div className="footer-logo-section">
            <div className="footer-logo">
              <img
                src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1736935438/Group_1_1_g9jx7a.png" // Replace with your logo URL
                alt="GiftPixel Logo"
                className="footer-logo-img"
              />
              <h3>GiftPixel</h3>
            </div>
            <p className="footer-description">
              Turning thoughtful moments into unforgettable gifts. Celebrate life’s special occasions with tokens that truly matter. Each gift is a symbol of love, care, and cherished memories. Make every moment count with gestures that leave a lasting impression.
            </p>
            <div className="footer-subscription">
              <input
                type="email"
                placeholder="Your email address"
                className="footer-input"
              />
              <button className="footer-button">Get Started ↗</button>
            </div>
          </div>

          {/* Links */}
          <div className="footer-links">
            <div>
              <h3>Quick Links</h3>
              <ul>
                <li><a href="#">Features</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Testimonial</a></li>
                <li><a href="#">Sign in/Sign up</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3>Resources</h3>
              <ul>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Mission</a></li>
                <li><a href="#">Vision</a></li>
              </ul>
            </div>
            <div>
              <h3>Support</h3>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">How it works</a></li>
                <li><a href="#">Privacy & Policy</a></li>
                <li><a href="#">Terms & Condition</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>© 2025 GiftPixel</p>
          <div className="footer-social">
            <a href="#" className="social-icon facebook"><FaFacebookF /></a>
            <a href="#" className="social-icon instagram"><FaInstagram /></a>
            <a href="#" className="social-icon linkedin"><FaLinkedin /></a>
            <a href="#" className="social-icon twitter"><FaTwitter /></a>
          </div>
        </div>
      </footer>

      <style>
        {`
          /* Footer Base Styling */
          .footer {
            background-color: #F8EAE4;
            padding: 100px 20px;
            font-family: Arial, sans-serif;
          }

          .footer-container {
            display: flex;
            justify-content: space-between;
            gap: 180px; /* Increased gap to push sections further apart */
            max-width: 100%;
            margin: 0 auto;
          }

          .footer-logo-section {
            flex: 1;
            max-width: 35%; /* Reduced width to create more space for footer links */
            padding: 20px; /* Added padding */
          }

          .footer-links {
            display: flex;
            flex: 2;
            gap: 80px;
            padding: 20px; /* Added padding */
          }

          .footer-logo {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
          }

          .footer-logo-img {
            width: 35px;
            margin-right: 10px;
          }

          .footer-description {
            color: #6B6B6B;
            font-size: 14px;
            line-height: 1.8;
            margin-bottom: 20px;
          }

          .footer-subscription {
            display: flex;
            align-items: center;
            border: 1px solid #7c7878;
            border-radius: 30px;
            padding: 5px 10px;
            background-color: #F8EAE4;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .footer-input {
            border: none;
            outline: none;
            flex: 1;
            padding: 10px;
            font-size: 14px;
            color: #6B6B6B;
            background-color: #F8EAE4;
          }

          .footer-button {
            background-color: #F1736A;
            color: white;
            border: none;
            border-radius: 30px;
            padding: 12px 20px;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            margin-left: 10px;
          }

          .footer-button:hover {
            background-color: #E25C4C;
          }

          .footer-links h3 {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 15px;
            color: #000;
          }

          .footer-links ul {
            list-style: none;
            padding: 0;
            color: #6B6B6B;
            font-size: 14px;
            line-height: 2;
          }

          .footer-links a {
            text-decoration: none;
            color: inherit;
          }

          .footer-links a:hover {
            color: #000;
          }

          /* Bottom Section */
          .footer-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 40px;
            border-top: 2px solid #e1d4d4; /* Increased border width */
            padding-top: 20px;
            text-align: center;
            color: #6B6B6B;
            font-size: 14px;
          }

          .footer-social {
            display: flex;
            gap: 10px;
          }

          .social-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 18px;
            color: white;
          }

          .social-icon.facebook {
            background-color: #3b5998;
          }

          .social-icon.instagram {
            background-color: #E4405F;
          }

          .social-icon.linkedin {
            background-color: #0077B5;
          }

          .social-icon.twitter {
            background-color: #1DA1F2;
          }

          .social-icon:hover {
            opacity: 0.8;
          }

          /* Media Query for Smaller Screens */
          @media (max-width: 768px) {
            .footer-container {
              flex-direction: column;
              gap: 40px;
            }

            .footer-logo-section {
              max-width: 100%;
              padding: 10px;
            }

            .footer-links {
              flex-direction: column;
              gap: 30px;
              padding: 10px;
            }

            .footer-logo-img {
              width: 30px;
            }

            .footer-description {
              font-size: 12px;
            }

            .footer-bottom {
              flex-direction: column;
              text-align: center;
            }

            .footer-social {
              justify-content: center;
              gap: 15px;
            }
          }

          @media (max-width: 480px) {
            .footer-description {
              font-size: 11px;
            }

            .footer-button {
              padding: 10px 15px;
              font-size: 12px;
            }

            .footer-links ul {
              font-size: 12px;
            }

            .footer-logo h3 {
              font-size: 16px;
            }
          }
        `}
      </style>
    </>
  );
};

export default Footer;
