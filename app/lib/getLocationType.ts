// * Consts:
import { FOOD_CATEGORIES } from '@/app/consts';

// * Types:
import { Location } from '@/app/types';

export const getLocationType = (
    categories: string[] = []
): Location['type'] => {

    for (const category of categories) {
        const mappedType = FOOD_CATEGORIES[category];

        if (mappedType) {
            return mappedType as Location['type'];
        }
    }

    return "food";
};