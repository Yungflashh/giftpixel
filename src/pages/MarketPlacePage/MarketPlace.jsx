import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'animate.css';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('https://source.unsplash.com/1600x900/?marketplace,busy'); 
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  font-family: 'Arial', sans-serif;
  overflow: hidden;
  filter: brightness(1.2); /* Brighter background */
`;

const Content = styled.div`
  text-align: center;
  max-width: 600px;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.8); /* Light and transparent background */
  border-radius: 20px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  animation: fadeIn 2s ease-out;
  color: #333; 
`;

const Title = styled.h1`
  font-size: 52px;
  margin-bottom: 20px;
  animation: fadeInUp 1.5s ease-out;
  color: black; /* Vibrant coral */
`;

const Subtitle = styled.h2`
  font-size: 26px;
  color: black; /* Same coral color */
  margin-bottom: 40px;
  animation: fadeInUp 1.5s ease-out 0.5s;
`;

const CountdownWrapper = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 30px;
  animation: fadeInUp 1.5s ease-out 1s;
`;

const Countdown = styled.span`
  background-color: black; /* Bright blue background */
  color: white;
  padding: 18px 30px;
  border-radius: 12px;
  font-size: 40px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
`;

const Description = styled.p`
  font-size: 18px;
  color: #333;
  margin-top: 20px;
  animation: fadeInUp 1.5s ease-out 1.5s;
`;

const Button = styled.a`
  display: inline-block;
  padding: 14px 28px;
  background-color: #ff5733; /* Vibrant coral */
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 30px;
  border: 2px solid #ff5733;
  margin-top: 20px;
  transition: all 0.3s ease;
  animation: fadeInUp 1.5s ease-out 2s;
  cursor: pointer;
  
  &:hover {
    background-color: #34b7f1; /* Bright blue on hover */
    color: #ff5733;
    border-color: #34b7f1;
  }
`;

const Marketplace = () => {
  const [countdown, setCountdown] = useState("00:00:00");

  useEffect(() => {
    const launchDate = new Date('2025-05-12T00:00:00');

    const interval = setInterval(() => {
      const now = new Date();
      const timeLeft = launchDate - now;

      if (timeLeft <= 0) {
        clearInterval(interval);
        setCountdown("Launch Now!");
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setCountdown(
        `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Content>
        <Title className="animate__animated animate__fadeIn animate__delay-1s">Marketplace Coming Soon</Title>
        <Subtitle className="animate__animated animate__fadeIn animate__delay-2s">Your new favorite marketplace is on its way!</Subtitle>
        
        {/* Countdown Timer */}
        <CountdownWrapper>
          <Countdown className="animate__animated animate__zoomIn">{countdown}</Countdown>
        </CountdownWrapper>
        
        <Description className="animate__animated animate__fadeIn animate__delay-3s">
          We're working hard to bring you the best marketplace experience. Stay tuned for the launch and get ready to discover amazing products.
        </Description>

        <Button href="#" className="animate__animated animate__fadeIn animate__delay-4s">Notify Me</Button>
      </Content>
    </Container>
  );
}

export default Marketplace;
