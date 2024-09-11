export const fetchSearchAnime = async (title) => {
    const url = 'https://graphql.anilist.co';

    const searchQuery = `
    query ($search: String, $page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
            media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
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
    `;

    const variables = {
        page: 1,
        perPage: 30,
        search: title,
    };

    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: searchQuery,
                variables: variables,
            }),
        };
        const response = await fetch(url, options);
        const data = await response.json();
        // console.log(data);
        
        if(data.errors){
            throw data;
        }

        return data.data.Page.media;
    } catch (error) {
        console.error(`Failed to fetch animes for searched title: ${title}`);
        console.error(error);
        throw error;
    }
};