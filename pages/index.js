import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import section1Image from '@/public/images/section-1.jpg';
import section2Image from '@/public/images/section-2.jpg';
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { Container, Row, Col } from 'reactstrap';
import Typed from "react-typed";
import { useGetUser } from '@/actions/user';

const roles = ["Developer", "Tech Lover", "Team Player", "React JS", "Angular"];

const Index = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const { data, loading } = useGetUser();
  const flipInterval = useRef();

  const startAnimation = () => {
    flipInterval.current = setInterval(() => {
      setIsFlipping(prevFlipping=>!prevFlipping);
    }, 10000);
  }

  useEffect(() => {
    startAnimation();

    return () => {
      flipInterval.current && clearInterval(flipInterval.current);
    }
  }, []);
  
  return (
    <BaseLayout 
      navClass="transparent"
      className={`cover ${isFlipping ? 'cover-orange' : 'cover-blue'}`}
      loading={loading}
      user={data}
    >
      <BasePage indexPage title="Portfolio - Filip Jerga">
        <div className="main-section">
          <div className="background-image">
            <Image src="/images/background-index.png" layout="fill" alt="background for index page" />
          </div>
          <Container>
            <Row>
              <Col md="6">
                <div className="hero-section">
                  <div className={`flipper ${isFlipping ? 'isFlipping' : ''}`}>
                    <div className="front">
                      <div className="hero-section-content">
                        <h2> Full Stack Web Developer </h2>
                        <div className="hero-section-content-intro">
                          Have a look at my portfolio and job history.
                        </div>
                      </div>
                      <Image className="image" src={section1Image} alt="section-1" />
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                    <div className="back">
                      <div className="hero-section-content">
                        <h2> Full Stack Web Developer </h2>
                        <div className="hero-section-content-intro">
                          Have a look at my portfolio and job history.
                        </div>
                      </div>
                      <Image className="image" src={section2Image} alt="section-2" />
                      <div className="shadow-custom shadow-custom-orange">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" className="hero-welcome-wrapper">
                <div className="hero-welcome-inner-wrapper">
                <div className="hero-welcome-text">
                  <h1>
                    Welcome to the portfolio website of Filip Jerga.
                    Get informed, collaborate and discover projects I was working on through the years!
                  </h1>
                </div>
                <Typed
                  // typedRef={typedRef()}
                  loop
                  typeSpeed={70}
                  backSpeed={70}
                  strings={roles}
                  className="self-typed"
                  smartBackspace
                  shuffle={false}
                  backDelay={5000}
                  fadeOut={false}
                  fadeOutDelay={100}
                  loopCount={0}
                  showCursor
                  cursorChar="|"
                />
                <div className="hero-welcome-bio">
                  <h1>
                    Let&apos;s take a look on my work.
                  </h1>
                </div>
                {/* hero-welcome-inner-wrapper div element */}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </BasePage>
    </BaseLayout>
  );
}

export default Index;
