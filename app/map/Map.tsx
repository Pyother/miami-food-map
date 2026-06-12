"use client";

// * React:
import { useState, useEffect } from 'react';

// * DeckGL:
import { DeckGL } from '@deck.gl/react';
import { IconLayer, TextLayer } from '@deck.gl/layers';
import { WebMercatorViewport } from '@deck.gl/core';
import type { PickingInfo } from '@deck.gl/core';

// * React Map GL:
import { Map as ReactMapGl } from 'react-map-gl/maplibre';

// * Types:
import { GeoapifyFeature, Location } from '@/app/types';

// * Hooks:
import { useSupercluster } from '@/app/hooks/useSupercluster';

// * Consts:
import { INITIAL_VIEW_STATE } from '@/app/consts';

// * Styles:
import './map.css';

const Map = ({ features }: { features: GeoapifyFeature[] }) => {

    const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
    const [bounds, setBounds] = useState<[number, number, number, number] | null>(null);

    useEffect(() => {
        const calculateBounds = () => {
            const { longitude, latitude, zoom } = viewState;
            const viewport = new WebMercatorViewport({
                longitude,
                latitude,
                zoom,
                width: window.innerWidth,
                height: window.innerHeight
            });
            const newBounds = viewport.getBounds();
            setBounds(newBounds);
        };

        calculateBounds();
    }, [viewState]);

    const { locations } = useSupercluster(features, viewState.zoom, bounds);

    const iconLayer = new IconLayer<Location>({
        id: 'icon-layer',
        data: locations,
        getPosition: d => d.position,
        iconAtlas: '/sprite_food.png',
        iconMapping: '/sprite_food_mapping.json',
        getIcon: d => d.type,
        pickable: true,
        getSize: 40
    });

    const textLayer = new TextLayer<Location>({
        id: 'text-layer',
        data: locations,
        getPosition: d => d.position,
        getText: d => d?.name || (d.properties?.point_count ? `${d.properties.point_count}` : ''),
        getSize: 12,
        getColor: d => d.type === 'pin' ? [255, 255, 255] : [166, 248, 255],
        getTextAnchor: 'middle',
        getAlignmentBaseline: d => d.type === 'pin' ? 'bottom' : 'top',
        getPixelOffset: d => d.type === 'pin' ? [-1, 0] : [0, 20],
        background: true,
        getBackgroundColor: d => d.type === 'pin' ? [0, 0, 0, 0] : [0, 0, 0, 100],
        backgroundPadding: [6, 4],
        maxWidth: 10,
        wordBreak: 'break-word'
    });
    
    return (
        <DeckGL 
            initialViewState={viewState} 
            controller={true}
            layers={[iconLayer, textLayer]}
            onViewStateChange={({ viewState }) => setViewState(viewState as typeof INITIAL_VIEW_STATE)}
            getTooltip={({ object }: PickingInfo<Location>) => {

                if(object?.id.startsWith('cluster-')) return null;
                return (
                    object
                        ? {
                            html: `
                                <div style="display:flex; flex-direction:column; gap:4px; min-width:200px; max-width:300px; max-height:300px; overflow:hidden;">
                                    <p style="font-size: 14px; font-weight: bold; text-align: center;">${object.name || 'Unknown'}</p>
                                    <div style="display:flex; justify-content: space-between;">
                                        <p style="font-size: 12px; font-weight: bold;">Street</p>
                                        <p style="font-size: 12px; text-align: center;">${object.properties?.street || ''}</p>
                                    </div>
                                    <div style="display:flex; justify-content: space-between;">
                                        <p style="font-size: 12px; font-weight: bold;">Housenumber</p>
                                        <p style="font-size: 12px;">${object.properties?.housenumber || '-'}</p>
                                    </div>
                                    ${object.properties?.opening_hours
                                        ? `
                                            <p style="font-size: 12px; font-weight: bold;">Opening Hours</p>
                                            <div style="display:flex; flex-direction: column; gap: 2px; text-align: center;">
                                                ${typeof object.properties.opening_hours === 'string' ? object.properties.opening_hours.split(';').map((oh: string) => `<p style="font-size: 12px;">${oh}</p>`).join('') : '<p style="font-size: 12px;">-</p>'}
                                            </div>
                                        `
                                        : ''
                                    }
                                </div>
                            `,
                            style: {
                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                borderRadius: '4px',
                            }
                        }
                    : null
                );
            }}
        >
            <ReactMapGl
                mapStyle={process.env.NEXT_PUBLIC_MAP_STYLE}
            />
        </DeckGL>
    )
}

export default Map;

