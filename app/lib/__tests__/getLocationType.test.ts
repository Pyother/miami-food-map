import { describe, it, expect } from 'vitest';
import { getLocationType } from '../getLocationType';

describe('getLocationType', () => {
    it('returns "burger" for a burger fast-food category', () => {
        expect(getLocationType(['catering.fast_food.burger'])).toBe('burger');
    });

    it('returns "burger" for a burger restaurant category', () => {
        expect(getLocationType(['catering.restaurant.burger'])).toBe('burger');
    });

    it('returns "pizza" for pizza fast-food', () => {
        expect(getLocationType(['catering.fast_food.pizza'])).toBe('pizza');
    });

    it('returns "pizza" for italian restaurant', () => {
        expect(getLocationType(['catering.restaurant.italian'])).toBe('pizza');
    });

    it('returns "sandwich" for sandwich fast-food', () => {
        expect(getLocationType(['catering.fast_food.sandwich'])).toBe('sandwich');
    });

    it('returns "seafood" for seafood restaurant', () => {
        expect(getLocationType(['catering.restaurant.seafood'])).toBe('seafood');
    });

    it('returns "seafood" for fish restaurant', () => {
        expect(getLocationType(['catering.restaurant.fish'])).toBe('seafood');
    });

    it('returns "asian" for sushi restaurant', () => {
        expect(getLocationType(['catering.restaurant.sushi'])).toBe('asian');
    });

    it('returns "asian" for japanese restaurant', () => {
        expect(getLocationType(['catering.restaurant.japanese'])).toBe('asian');
    });

    it('returns "latin" for cuban restaurant', () => {
        expect(getLocationType(['catering.restaurant.cuban'])).toBe('latin');
    });

    it('returns "latin" for mexican restaurant', () => {
        expect(getLocationType(['catering.restaurant.mexican'])).toBe('latin');
    });

    it('returns "food" as fallback for unknown category', () => {
        expect(getLocationType(['catering.restaurant.unknown'])).toBe('food');
    });

    it('returns "food" for an empty categories array', () => {
        expect(getLocationType([])).toBe('food');
    });

    it('returns "food" when categories is undefined', () => {
        expect(getLocationType(undefined)).toBe('food');
    });

    it('uses the first matching category when multiple are provided', () => {
        expect(getLocationType(['catering.restaurant.sushi', 'catering.restaurant.burger'])).toBe('asian');
    });

    it('falls back to a later matching category if the first is unknown', () => {
        expect(getLocationType(['catering.restaurant.unknown', 'catering.restaurant.pizza'])).toBe('pizza');
    });
});
