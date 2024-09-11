import { useLocation } from 'react-router-dom';
import useSWR from 'swr';
import ColumnCard from '../components/ColumnCard';
import { fetchSearchAnime } from '../services/fetchSearchAnime';

const Search = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const title = params.get('title');

    const { data: searchResult, error } = useSWR(
        title,
        fetchSearchAnime,
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

    if (error) return <h2 style={{ marginLeft: '30px', color: 'white' }}>Failed to load data</h2>;
    if (!searchResult) return <h2 style={{ marginLeft: '30px', color: 'white' }}>Loading results for "{title}"...</h2>;

    return (
        <div>
            {searchResult.length === 0 ? (
                <h2 style={{ marginLeft: '30px', color: 'white' }}>
                    No results found for "{title}"
                </h2>
            ) : (
                <div className="results"
                    style={{
                        'width': '90%',
                        'margin': '70px',
                        'marginTop': '0px',
                        'padding': '20px',
                        'display': 'grid',
                        'gridTemplateRows': 'auto',
                        'gridTemplateColumns': 'repeat(auto-fill, minmax(150px, 1fr))',
                        'gap': '28px',
                        'overflow': 'hidden'
                    }}>
                    {searchResult.map((anime, index) => (
                        <ColumnCard key={index} anime={anime} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;
