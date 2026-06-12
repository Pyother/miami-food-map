export type GeoapifyFeature = {
    type: 'Feature';
    properties: {
        place_id: string;
        categories?: string[];
        [key: string]: unknown;
    };
    geometry: {
        type: 'Point';
        coordinates: [number, number];
    };
};

export type Location = {
    id: string;
    name?: string;
    type: 'burger' | 'pizza' | 'sandwich' | 'seafood' | 'asian' | 'latin' | 'food' | 'pin';
    position: [number, number];
    properties: LocationProps;
}

export type LocationProps = {
    [key: string]: unknown;
}

export type Cluster = {
    cluster?: boolean;
    cluster_id?: number;
    point_count?: number;
    name?: string;
    place_id?: string;
    categories?: string[];
    [key: string]: unknown;
};
