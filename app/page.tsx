"use server";

// * React:
import { Suspense } from 'react';

// * UI:
import Map from '@/app/map/Map';

// * Consts:
import { SEARCH_CATEGORIES, SEARCH_PLACE_ID, SEARCH_LIMIT } from '@/app/consts';

const HomePage = async () => {

    const url = new URL('https://api.geoapify.com/v2/places');
    url.searchParams.set('categories', SEARCH_CATEGORIES.join(','));
    url.searchParams.set('filter', `place:${SEARCH_PLACE_ID}`);
    url.searchParams.set('limit', SEARCH_LIMIT);
    url.searchParams.set('apiKey', process.env.GEOAPIFY_API_KEY || "");
    // This API key is intended for demonstration purposes only. Geoapify may change, restrict, rotate, or block this key at any time. If you want to run, modify, or extend this project, please create your own free API key at  myprojects.geoapify.com and replace the demo key in your configuration.

    const res = await fetch(url.toString());
    const data = await res.json();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Map features={data.features} />
            <footer>
                <p>The geocoding service is powered by Geoapify, data comes from OpenStreetMap.</p>
                <p>Icons data comes from <a href="https://icons8.com/" target="_blank" rel="noopener noreferrer">Icons8.</a></p>
                <p>© Stadia Maps © OpenMapTiles © OpenStreetMap contributors</p>
                <p>Map style comes from <a href="https://openfreemap.org/" target="_blank" rel="noopener noreferrer">OpenFreeMap</a></p>
            </footer> 
        </Suspense>
    )
}

export default HomePage;