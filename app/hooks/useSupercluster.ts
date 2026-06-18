// * Types:
import { GeoapifyFeature } from '@/app/types';

// * Supercluster:
import Supercluster from 'supercluster';

// * Lib:
import mapClusterToLocation from '../lib/mapToLocation';

export const useSupercluster = (
    features: GeoapifyFeature[],
    zoom: number,
    bounds: [number, number, number, number] | null
) => {

    const supercluster = new Supercluster({
        radius: 60,
        maxZoom: 16
    }).load(features ?? []);

    const clusters = bounds ? supercluster.getClusters(bounds, Math.floor(zoom)) : [];
    const locations = mapClusterToLocation(clusters);

    return { locations, supercluster };
}