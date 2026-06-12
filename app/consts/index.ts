// * DeckGL:
import { MapViewState } from '@deck.gl/core';

export const SEARCH_CATEGORIES = [
    'catering.fast_food',
    'catering.restaurant'
];
export const SEARCH_PLACE_ID = '5142c971913b0e54c0590cbdf1434ac83940f00101f9010191120000000000c002069203054d69616d69';
export const SEARCH_LIMIT = '500';

export const INITIAL_VIEW_STATE: MapViewState = {
    longitude: -80.19791458342058,
    latitude: 25.77230071927423,
    zoom: 13
};

export const FOOD_CATEGORIES: Record<string, string> = {
    
    // Burger
    "catering.fast_food.burger": "burger",
    "catering.restaurant.burger": "burger",

    // Pizza
    "catering.fast_food.pizza": "pizza",
    "catering.restaurant.pizza": "pizza",
    "catering.restaurant.italian": "pizza",

    // Sandwich
    "catering.fast_food.sandwich": "sandwich",

    // Seafood
    "catering.restaurant.seafood": "seafood",
    "catering.restaurant.fish": "seafood",

    // Asian
    "catering.restaurant.asian": "asian",
    "catering.restaurant.japanese": "asian",
    "catering.restaurant.sushi": "asian",
    "catering.restaurant.thai": "asian",
    "catering.restaurant.chinese": "asian",
    "catering.restaurant.vietnamese": "asian",
    "catering.restaurant.indian": "asian",

    // Latin
    "catering.restaurant.cuban": "latin",
    "catering.restaurant.latin_american": "latin",
    "catering.restaurant.argentinian": "latin",
    "catering.restaurant.peruvian": "latin",
    "catering.restaurant.mexican": "latin",
    "catering.restaurant.brazilian": "latin",
    "catering.restaurant.caribbean": "latin",
    "catering.restaurant.jamaican": "latin",
    "catering.restaurant.tex-mex": "latin",
    "catering.restaurant.spanish": "latin",
    "catering.restaurant.tapas": "latin",
};
