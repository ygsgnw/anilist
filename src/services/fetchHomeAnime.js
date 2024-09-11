export const fetchHomeAnime = async () => {
    const url = 'https://graphql.anilist.co';

    const homeQuery = `
        query ($page: Int, $perPage: Int, $season: MediaSeason, $seasonYear: Int, $upcomingSeason: MediaSeason, $upcomingSeasonYear: Int) {
            trending: Page(page: $page, perPage: $perPage) {
                media(sort: TRENDING_DESC, type: ANIME) {
                id
                title {
                    english
                }
                description
                seasonYear
                episodes
                nextAiringEpisode{
                    episode
                }
                coverImage {
                    color
                }
                bannerImage
                format
                status
                duration
                }
            }
            
            topAiring: Page(page: $page, perPage: $perPage) {
                media(status: RELEASING, sort: SCORE_DESC, type: ANIME) {
                id
                title {
                    romaji
                    english
                }
                seasonYear
                episodes
                nextAiringEpisode{
                    episode
                }
                coverImage {
                    color
                    large
                }
                format
                status
                duration
                }
            }

            seasonalPopular: Page(page: $page, perPage: $perPage) {
                media(season: $season, seasonYear: $seasonYear, sort: POPULARITY_DESC, type: ANIME) {
                id
                title {
                    romaji
                    english
                }
                seasonYear
                episodes
                nextAiringEpisode{
                    episode
                }
                coverImage {
                    large
                    color
                }
                format
                status
                duration
                }
            }

            topRated: Page(page: $page, perPage: $perPage) {
                media(sort: SCORE_DESC, type: ANIME) {
                id
                title {
                    english
                    romaji
                }
                seasonYear
                episodes
                nextAiringEpisode{
                    episode
                }
                coverImage {
                    medium
                    color
                }
                format
                status
                duration
                }
            }
                
            mostPopular: Page(page: $page, perPage: $perPage) {
                media(sort: POPULARITY_DESC, type: ANIME) {
                id
                title {
                    english
                    romaji
                }
                seasonYear
                episodes
                nextAiringEpisode{
                    episode
                }
                coverImage {
                    medium
                    color
                }
                format
                status
                duration
                }
            }
            
            mostFavorite: Page(page: $page, perPage: $perPage) {
                media(sort: FAVOURITES_DESC, type: ANIME) {
                id
                title {
                    english
                    romaji
                }
                seasonYear
                episodes
                nextAiringEpisode{
                    episode
                }
                coverImage {
                    medium
                    color
                }
                format
                status
                duration
                }
            }

            upcomingPopular: Page(page: $page, perPage: $perPage) {
                media(season: $upcomingSeason, seasonYear: $upcomingSeasonYear, sort: POPULARITY_DESC, type: ANIME) {
                id
                title {
                    english
                    romaji
                }
                startDate {
                    year
                    month
                    day
                }
                episodes
                coverImage {
                    medium
                    color
                }
                format
                status
                duration
                }
            }
        }
    `;

    const variables = {
        page: 1,
        perPage: 15
    };

    const seasons = ["WINTER", "SPRING", "SUMMER", "FALL"];

    const calculateVariables = () => {
        const day = new Date();
        const month = day.getMonth();
        const currentYear = day.getFullYear();
        // console.log(month, currentYear);

        const currentSeason = seasons[Math.floor(month / 3)]
        let upcomingSeason = seasons[Math.floor(month / 3) + 1];
        let upcomingSeasonYear = currentYear;
        if (currentSeason === "FALL") {
            upcomingSeason = "WINTER";
            upcomingSeasonYear = currentYear + 1;
        }
        variables['season'] = currentSeason;
        variables['seasonYear'] = currentYear;
        variables['upcomingSeason'] = upcomingSeason;
        variables['upcomingSeasonYear'] = upcomingSeasonYear;
    }

    const cleanTrending = (animeList) => {
        for (let i = 0; i < animeList.length; i++) {
            if (!animeList[i].title.english || !animeList[i].bannerImage) {
                animeList.splice(i, 1);
                i--;
            }
        }
    }

    try {
        calculateVariables();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: homeQuery,
                variables: variables
            })
        };

        const response = await fetch(url, options);
        const data = await response.json();
        // console.log(data);
        
        if(data.errors){
            throw data;
        }

        cleanTrending(data.data.trending.media);
        
        return data.data;

    } catch (error) {
        console.error("Failed to fetch home anime details");
        console.error(error);
        throw error;
    }
};