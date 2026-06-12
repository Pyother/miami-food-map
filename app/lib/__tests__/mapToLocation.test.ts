import { describe, it, expect } from 'vitest';
import mapClusterToLocation from '../mapToLocation';
import type { Cluster } from '@/app/types';

type ClusterFeature = GeoJSON.Feature<GeoJSON.Point, Cluster>;

const makeFeature = (properties: Cluster, coordinates: [number, number] = [-80.19, 25.77]): ClusterFeature => ({
    type: 'Feature',
    geometry: { type: 'Point', coordinates },
    properties,
});

describe('mapClusterToLocation', () => {
    it('maps a single restaurant feature to a location', () => {
        const feature = makeFeature({
            place_id: 'abc123',
            name: 'Joe\'s Burger',
            categories: ['catering.restaurant.burger'],
        });

        const [location] = mapClusterToLocation([feature]);

        expect(location.id).toBe('abc123');
        expect(location.name).toBe('Joe\'s Burger');
        expect(location.type).toBe('burger');
        expect(location.position).toEqual([-80.19, 25.77]);
    });

    it('maps a cluster feature to a pin location', () => {
        const feature = makeFeature({
            cluster: true,
            cluster_id: 7,
            point_count: 12,
        });

        const [location] = mapClusterToLocation([feature]);

        expect(location.id).toBe('cluster-7');
        expect(location.type).toBe('pin');
        expect(location.properties.point_count).toBe(12);
    });

    it('falls back to "food" type when categories are unrecognised', () => {
        const feature = makeFeature({
            place_id: 'xyz',
            categories: ['catering.restaurant.unknown'],
        });

        const [location] = mapClusterToLocation([feature]);
        expect(location.type).toBe('food');
    });

    it('returns "food" type when categories are absent', () => {
        const feature = makeFeature({ place_id: 'no-cats' });

        const [location] = mapClusterToLocation([feature]);
        expect(location.type).toBe('food');
    });

    it('maps multiple features preserving order', () => {
        const features = [
            makeFeature({ place_id: 'a', categories: ['catering.restaurant.sushi'] }),
            makeFeature({ place_id: 'b', categories: ['catering.fast_food.pizza'] }),
        ];

        const locations = mapClusterToLocation(features);

        expect(locations).toHaveLength(2);
        expect(locations[0].type).toBe('asian');
        expect(locations[1].type).toBe('pizza');
    });

    it('returns an empty array for empty input', () => {
        expect(mapClusterToLocation([])).toEqual([]);
    });

    it('attaches the raw properties to the location', () => {
        const feature = makeFeature({
            place_id: 'p1',
            street: 'Ocean Drive',
            housenumber: '42',
            categories: ['catering.restaurant.seafood'],
        });

        const [location] = mapClusterToLocation([feature]);

        expect(location.properties.street).toBe('Ocean Drive');
        expect(location.properties.housenumber).toBe('42');
    });
});
