import React from 'react';
import '../styles/rowCard.css';
import { Link } from 'react-router-dom';

const RowCard = ({ anime }) => {
    const animeColor = anime.coverImage.color ? anime.coverImage.color : 'grey';
    const animeTitle = anime.title.english ? anime.title.english : anime.title.romaji;
    const animeFormat = anime.format ? anime.format : 'NA';
    const episodeInfo = anime.format === 'MOVIE' || anime.format === 'MUSIC'
        ? anime.duration
            ? `${Math.floor(anime.duration / 60)}h ${Math.floor(anime.duration) % 60}m`
            : 'NA'
        : anime.status === 'RELEASING'
            ? `EP-${anime.nextAiringEpisode ? anime.nextAiringEpisode.episode - 1 : 'NA'}`
            : anime.episodes
                ? `EP-${anime.episodes}`
                : 'NA';
    const releaseDate = anime.status === 'NOT_YET_RELEASED' && anime.startDate
        ? `${anime.startDate.day ? `${anime.startDate.day}/` : ''}${anime.startDate.month ? `${anime.startDate.month}/` : ''}${anime.startDate.year ? anime.startDate.year : 'NA'}`
        : anime.seasonYear;

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <Link className="row-card" to={`/watch/${anime.id}`} style={{ '--anime-color': animeColor }} onClick={scrollToTop}>
            <img src={anime.coverImage.medium} className="row-card-image" alt={animeTitle} />
            <div className="row-card-info">
                <div className="row-card-title">
                    {animeTitle}
                </div>
                <div className="row-card-subtitle">
                    <h6 className="row-card-subtitle-details">{animeFormat}</h6>
                    <h6 className="row-card-subtitle-details">{episodeInfo}</h6>
                    <h6 className="row-card-subtitle-details">{releaseDate}</h6>
                    {anime.status === 'RELEASING' && <div className="row-card-subtitle-details row-card-airing">AIRING</div>}
                </div>
            </div>
        </Link>
    );
};

export default RowCard;
