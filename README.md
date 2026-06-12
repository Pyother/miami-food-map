# Miami Food Map

Demo project created for my step-by-step article on custom maps with DeckGL, IconLayer, Next.js, and Geoapify.

Article: https://medium.com/@petrez.sobol/custom-icon-maps-in-next-js-deckgl-iconlayer-geoapify-places-api-step-by-step-1f736b897e52.

Live demo: https://miami-food-map.vercel.app.

## Project overview

The goal of this project was to build an application that presents restaurants and food-related points of interest in Miami. For this purpose, I used data from the [Geoapify Places API](https://www.geoapify.com/places-api). The data returned by Geoapify is provided in GeoJSON format. In my [tutorial](https://medium.com/@petrez.sobol/custom-icon-maps-in-next-js-deckgl-iconlayer-geoapify-places-api-step-by-step-1f736b897e52), I demonstrate how to format this data, assign it to custom restaurant categories (pizza, burger, sandwich, seafood, asian, latin, and other), and visualize it on a map using [Deck.gl](https://deck.gl) technology.

The application includes:

* Data routing from Geoapify.
* Functions for transforming data and assigning it to categories.
* A React hook for creating [superclusters](https://www.npmjs.com/package/@mapgis/supercluster), i.e. grouping data into clusters across different zoom levels.
* Data visualization using Deck.gl with IconLayer, TextLayer, and tooltips.

## Setup

Clone the repository:

```bash
git clone https://github.com/Pyother/miami-food-map.git
cd miami-food-map
```

Install dependencies:

```sh
npm install
```

Create .env file with variables:

```
NEXT_PUBLIC_GEOAPIFY_API_KEY=your_api_key_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_MAP_STYLE=https:your_map_style_here
```

You can get your API key from: https://www.geoapify.com, and map style from https://stadiamaps.com/products/maps/map-styles (or any other map plaform). 

Start the development server:
```
npm run dev
```
Then open: http://localhost:3000.

## Tests

Unit tests are written with [Vitest](https://vitest.dev) and cover two utility functions:

- **`getLocationType`** — verifies that Geoapify category strings are correctly mapped to food types (`burger`, `pizza`, `seafood`, etc.) and that unknown or missing categories fall back to `"food"`.
- **`mapClusterToLocation`** — verifies that individual place features and cluster features are correctly transformed into `Location` objects, including id generation, position, type, and fallback behaviour.

Run tests with:
```sh
npm run test
```

## Limitations

Since the app was built as a tutorial, it has some limitations:

- **Static data** — place data is fetched once at build time and baked into the static page. New or closed venues are not reflected until the app is rebuilt and redeployed.
- **Hard-coded result cap** — the Geoapify query is limited to 500 results (`SEARCH_LIMIT`). If there are more than 500 matching places in the area, the excess is silently dropped.
- **Miami only** — the search area is fixed to a single Geoapify place ID representing Miami. The app does not support other cities or dynamic area selection.
- **Supercluster recreated on every render** — `useSupercluster` rebuilds the entire `Supercluster` index on every render because it has no memoization. For 500 points this is acceptable, but it would become a performance issue with larger datasets.
- **Category fallback is lossy** — places whose Geoapify categories do not match any entry in `FOOD_CATEGORIES` are silently assigned the generic `"food"` icon instead of surfacing an unknown category.
- **No error handling for failed fetches** — if the Geoapify API call fails at build time, the build errors out entirely rather than falling back to cached or empty data.
- **Demo API key** — the repository ships with a shared demo API key that Geoapify may restrict or revoke at any time (see comment in `route.ts` and `page.tsx`).


