import React, { useEffect, useRef } from 'react';
import '../styles/horizontalCarousel.css';
import ColumnCard from '../components/ColumnCard';

const HorizontalCarousel = ({ heading, animeList, carouselId }) => {
  // console.log(animeList);
  const scrollableRef = useRef(null);
  const leftBututonRef = useRef(null);
  const rightBututonRef = useRef(null);

  useEffect(() => {
    const scrollableElement = scrollableRef.current;
    const leftButton = leftBututonRef.current;
    const rightButton = rightBututonRef.current;

    const updateButtonState = () => {
      const maxScrollRight = scrollableElement.scrollWidth - scrollableElement.clientWidth;
      leftButton.style.visibility = scrollableElement.scrollLeft <= 0 ? 'hidden' : 'visible';
      rightButton.style.visibility = scrollableElement.scrollLeft >= maxScrollRight ? 'hidden' : 'visible';
    };

    updateButtonState();
    scrollableElement.addEventListener('scroll', updateButtonState);
    window.addEventListener('resize', updateButtonState);

    return () => {
      scrollableElement.removeEventListener('scroll', updateButtonState);
      window.removeEventListener('resize', updateButtonState);
    };
  }, []);

  const scrollByAmount = (amount) => {
    scrollableRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <>
      <div className="h-heading">{heading}</div>
      <div className="h-carousel">
        <div className="h-button" ref={leftBututonRef} onClick={() => scrollByAmount(-1260)}>
          <svg viewBox="0 0 30 30"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg>
        </div>
        <div className="h-scrollable" ref={scrollableRef}>

          {animeList.map((anime, index) => (
            <div className="h-card-wrapper" key={index}>
              { carouselId === 'relations' &&
                <ColumnCard anime={anime.node} relation={anime.relationType} />
              }
              { carouselId === 'recommendations' &&
                <ColumnCard anime={anime.node.mediaRecommendation} />
              }
              { carouselId === 'anime' &&
                <ColumnCard anime={anime} />
              }
            </div>
          ))}

        </div>
        <div className="h-button" ref={rightBututonRef} onClick={() => scrollByAmount(1260)}>
          <svg viewBox="0 0 30 30"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" /></svg>
        </div>
      </div>
    </>
  );
};

export default HorizontalCarousel;
