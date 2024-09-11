import useSWR from 'swr';
import '../styles/animeDetails.css';
import HorizontalCarousel from '../components/HorizontalCarousel';
import { useParams } from "react-router-dom";
import { fetchAnimeDetails } from "../services/fetchAnimeDetails";


const AnimeDetails = () => {
    const params = useParams();
    const anilistId = params.anilistId;
    // console.log(anilistId);

    const { data: anime, error } = useSWR(
        anilistId,
        fetchAnimeDetails,
        {
            refreshInterval: 0,            // Disable auto-revalidation
            revalidateOnFocus: false,      // Disable revalidation on focus
            revalidateOnReconnect: false,  // Disable revalidation on network reconnect
            dedupingInterval: Infinity,    // Prevent revalidation by setting deduplication to Infinity
            revalidateIfStale: false,      // Disable revalidation if data is stale
            errorRetryInterval: 5000 ,
            errorRetryCount: 2,
        }
    );
    if (error) return <h2 style={{ marginLeft: '30px', color: 'white' }}>Failed to load Anime Details Page</h2>;
    if (!anime) return <h2 style={{ marginLeft: '30px', color: 'white' }}>Loading Anime Details Page ...</h2>; 
    
    const releaseDate = `${anime.startDate.day ? `${anime.startDate.day}/` : ''}${anime.startDate.month ? `${anime.startDate.month}/` : ''}${anime.startDate.year ? anime.startDate.year : 'NA'}`;
    const episodes = `${anime.nextAiringEpisode ? `${anime.nextAiringEpisode.episode - 1}/` : ''}${anime.episodes ? anime.episodes : 'NA'}`;
    const duration = anime.duration ? `${Math.floor(anime.duration / 60)}h ${Math.floor(anime.duration) % 60}m` : 'NA';

    return (
        <>
            <div className="anime-cover" style={{ '--anime-color': anime.coverImage.color }}>
                <img className="bannerImage" src={anime.bannerImage} alt={anime.title.romaji} />

                <div className="anime-info">
                    <img src={anime.coverImage.extraLarge} alt={anime.title.romaji} />
                    <div className="anime-info-right">
                        <p className="anime-title"> {anime.title.english || 'TBD'} </p>
                        <p className="anime-title-romaji"> {anime.title.romaji} </p>
                        <p className="anime-desc" dangerouslySetInnerHTML= {{__html:anime.description || 'No description' }} />
                        <div className="anime-info-details">
                            <div className="anime-info-details-list">

                                <p> Format: <strong> {anime.format || 'NA'} </strong> </p>

                                <p> Release Date: <strong> {releaseDate} </strong> </p>

                                <p> Status: <strong> {anime.status || 'NA'} </strong> </p>

                                <p> Studios: <strong>
                                    {anime.studios.edges.map((studio, i) => (
                                        studio.node.name
                                    ))}
                                </strong> </p>

                            </div>
                            <div className="anime-info-details-list">

                                <p> Episodes: <strong> {episodes} </strong> </p>

                                <p> Duration: <strong> {duration} </strong> </p>

                                <p> Season: <strong> {anime.season || 'NA'} </strong> </p>

                                <div className="anime-info-genres-list">
                                    <p>Genres: </p>
                                    {anime.genres.map((genre, i) => (
                                        <div key={i} className="anime-info-genres"> {genre} </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <HorizontalCarousel animeList={anime.relations.edges} heading = 'RELATED ANIMES' carouselId = 'relations' />
            <HorizontalCarousel animeList={anime.recommendations.edges} heading = 'RECOMMENDED ANIMES' carouselId = 'recommendations' />

        </>
    );
};

export default AnimeDetails;
