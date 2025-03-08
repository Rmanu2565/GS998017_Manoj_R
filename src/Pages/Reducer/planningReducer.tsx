export interface Planning {
    SKU: string,
    Week: string,
    Sales: number,
    price: number,
    cost: number
}

export type PlanningAction =

    | { type: 'SET_PLANNING'; payload: Planning[] };

export const planningReducer = (state: Planning[], action: PlanningAction): Planning[] => {
    switch (action.type) {
        case 'SET_PLANNING':
            return action.payload;
        default:
            return state;
    }
};