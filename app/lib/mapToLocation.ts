// * Types:
import { Cluster, Location } from "@/app/types";

// * Lib:
import { getLocationType } from "./getLocationType";

type ClusterFeature = GeoJSON.Feature<
    GeoJSON.Point,
    Cluster
>;

const mapClusterToLocation = (
    clusters: ClusterFeature[]
): Location[] => {
    return clusters.map((feature) => {
        const properties = feature.properties;
        const isCluster = Boolean(properties.cluster);

        return {
            id: isCluster
                ? `cluster-${properties.cluster_id}`
                : String(properties.place_id),
            name: properties?.name,
            position:
                feature.geometry.coordinates as [number, number],            
            type: isCluster ? "pin" : getLocationType(properties.categories),
            properties
        };
    });
};

export default mapClusterToLocation;