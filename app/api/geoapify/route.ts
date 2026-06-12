// * Consts:
import { 
    SEARCH_CATEGORIES, 
    SEARCH_PLACE_ID,
    SEARCH_LIMIT
} from '@/app/consts';

export async function GET() {
    const url = new URL('https://api.geoapify.com/v2/places');

    url.searchParams.set('categories', SEARCH_CATEGORIES.join(','));
    url.searchParams.set('filter', `place:${SEARCH_PLACE_ID}`);
    url.searchParams.set('limit', SEARCH_LIMIT);
    url.searchParams.set('apiKey', process.env.GEOAPIFY_API_KEY || "");
    // This API key is intended for demonstration purposes only. Geoapify may change, restrict, rotate, or block this key at any time. If you want to run, modify, or extend this project, please create your own free API key at  myprojects.geoapify.com and replace the demo key in your configuration.

    const data = await fetch(url);
    const json = await data.json();

    return new Response(JSON.stringify(json));
}