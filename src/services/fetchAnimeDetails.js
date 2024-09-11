export const fetchAnimeDetails = async (anilistId) => {
    const url = 'https://graphql.anilist.co';

    const infoQuery = `
        query ($id: Int) {
            Media(id: $id, type: ANIME) {
                id
                title {
                romaji
                english
                }
                description
                coverImage{
                extraLarge
                color
                }
                bannerImage
                format
                startDate{
                day
                month
                year
                }
                status
                genres
                studios(isMain: true) {
                edges{
                    node{
                    name
                    }
                }
                }
                episodes
                nextAiringEpisode{
                episode
                }
                duration
                season
                relations {
                edges {
                    node {
                    id
                    title {
                        romaji
                        english
                    }
                    seasonYear
                    startDate {
                        day
                        month
                        year
                    }
                    episodes
                    nextAiringEpisode{
                        episode
                    }
                    coverImage {
                        large
                        color
                    }
                    format
                    type
                    status
                    duration
                    }
                    relationType
                }
                }
                recommendations(sort: RATING_DESC) {
                edges {
                    node {
                    mediaRecommendation {
                        id
                        title {
                        romaji
                        english
                        }
                        seasonYear
                        startDate {
                        day
                        month
                        year
                        }
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
                }
                }
            }
        }
    `;

    const variables = {
        id: anilistId
    };

    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: infoQuery,
                variables: variables,
            }),
        };
        const response = await fetch(url, options);
        const data = await response.json();
        // console.log(data);
        
        if(data.errors){
            throw data;
        }

        return data.data.Media;
    } catch (error) {
        console.error(`Failed to fetch anime details for anilistId: ${anilistId}`);
        console.error(error);
        throw error;
    }
};