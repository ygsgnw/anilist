import React, { useState, useEffect, useRef } from 'react';
import '../styles/trendingCarousel.css';
import { Link } from 'react-router-dom';
const TrendingCarousel = ({ animeList }) => {
    const [index, setIndex] = useState(0);
    const intervalRef = useRef(null);

    // Function to start the carousel
    const startCarousel = () => {
        stopCarousel(); // Clear any existing intervals
        intervalRef.current = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % animeList.length);
        }, 3000);
    };

    // Function to stop the carousel
    const stopCarousel = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    // Update index manually and restart carousel
    const goToSlide = (newIndex) => {
        setIndex(newIndex);
        startCarousel();
    };

    // useEffect to start the carousel on mount and clean up on unmount
    useEffect(() => {
        startCarousel();
        return () => stopCarousel(); // Cleanup on unmount
    }, []);

    return (
        <>
        <div 
            className="t-carousel" 
            id="t-carousel"
            onMouseEnter={stopCarousel} 
            onMouseLeave={startCarousel}
        >
            {animeList.map((anime, idx) => (
                <div
                    className="t-slide"
                    key={anime.id}
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    <img src={anime.bannerImage} alt={`Slide ${idx + 1}`} />
                    <div className="t-trending-tag">Trending #{idx + 1}</div>
                    <div className="t-slide-info">
                        <div
                            className="t-title"
                            style={{ '--anime-color': anime.coverImage.color || 'grey' }}
                        >
                            {anime.title.english}
                        </div>
                        <div className="t-subtitle">
                            <div className="t-subtitle-details">
                                {anime.format || 'NA'}
                            </div>
                            <div className="t-subtitle-details">
                                {anime.format === 'MOVIE' || anime.format === 'MUSIC' ? (
                                    anime.duration ? (
                                        `${Math.floor(anime.duration / 60)}h ${anime.duration % 60}m`
                                    ) : (
                                        'NA'
                                    )
                                ) : anime.status === 'RELEASING' ? (
                                    `EP-${anime.nextAiringEpisode ? anime.nextAiringEpisode.episode - 1 : 'NA'}`
                                ) : anime.episodes ? (
                                    `EP-${anime.episodes}`
                                ) : (
                                    'NA'
                                )}
                            </div>
                            <div className="t-subtitle-details">
                                {anime.seasonYear || 'NA'}
                            </div>
                            {anime.status === 'RELEASING' && (
                                <div className="t-subtitle-details t-airing">AIRING</div>
                            )}
                        </div>
                        {anime.description && (
                            <div className="t-desc" dangerouslySetInnerHTML={{ __html: anime.description }} />
                        )}
                    </div>
                    <Link to={`/watch/${anime.id}`} className="t-watch-button">SEE DETAILS</Link>
                </div>
            ))}
        </div>
        <div>
            <div className="t-carousel-indicators">
                {animeList.map((anime, i) => (
                    <span
                        key={i}
                        className={`t-indicator ${i === index ? 'active' : ''}`}
                        data-slide={i}
                        onClick={() => goToSlide(i)}
                    />
                ))}
            </div>
        </div>
        </>
    );
};

export default TrendingCarousel;
