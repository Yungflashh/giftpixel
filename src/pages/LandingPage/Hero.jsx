import "../../styles/Hero.css";

const Hero = () => {
  return (
    <section className="hero-section">
      {/* Hero Content */}
      <div className="hero-content">
        <h1 className="hero-title">
          Share Meaningful <br />
          <span>Promises</span> With Your <br />
          Loved Ones
        </h1>
        <p className="hero-description">
          Create a personalized promise card to express your emotions and
          strengthen your bond with someone special. Share your love in a unique way.
        </p>
        <a href="/signUp">
  <button className="hero-button">Get Started</button>
</a>

        {/* Avatar Container */}
        <div className="avatar-container">
          <div className="avatars">
            <img
              src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1736598510/african-woman-successful-entrepreneur-wearing-glasses-face-portrait_1_teb7bd.png"
              alt="User 1"
              className="avatar"
            />
            <img
              src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1736598509/african-woman-successful-entrepreneur-wearing-glasses-face-portrait_1_1_eecgr3.png"
              alt="User 2"
              className="avatar"
            />
            <img
              src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1736598501/R_3_1_fmctna.png"
              alt="User 3"
              className="avatar"
            />
          </div>
          <div className="rating">
            <span className="stars">⭐⭐⭐⭐</span>
            <span className="rating-number">4.5 ratings</span>
          </div>
        </div>
      </div>

    {/* Single Hero Image */}
    <div className="hero-image-container">
  <div className="light-dot light-dot-1"></div>
  <div className="light-dot light-dot-2"></div>
  <div className="light-dot light-dot-3"></div>
  <div className="light-dot light-dot-4"></div>
  <div className="light-dot light-dot-5"></div>
  <div className="light-dot light-dot-6"></div>
  <div className="light-dot light-dot-7"></div>
  <div className="light-dot light-dot-8"></div>
  <div className="light-dot light-dot-9"></div>


  
  <img 
    src="https://res.cloudinary.com/dqbbm0guw/image/upload/v1737412641/Group_63_da8hts.svg" 
    alt="Hero" 
    className="hero-image"
    loading="lazy"
    srcSet="
      https://res.cloudinary.com/dqbbm0guw/image/upload/q_auto,f_auto,w_320/v1737412641/Group_63_da8hts.svg 320w,
      https://res.cloudinary.com/dqbbm0guw/image/upload/q_auto,f_auto,w_420/v1737412641/Group_63_da8hts.svg 420w,
      https://res.cloudinary.com/dqbbm0guw/image/upload/q_auto,f_auto,w_520/v1737412641/Group_63_da8hts.svg 520w,
      https://res.cloudinary.com/dqbbm0guw/image/upload/q_auto,f_auto,w_768/v1737412641/Group_63_da8hts.svg 768w"
    sizes="(max-width: 320px) 320px,
           (max-width: 420px) 420px,
           (max-width: 520px) 520px,
           768px"
  />
</div>

    </section>
  );
};

export default Hero;
