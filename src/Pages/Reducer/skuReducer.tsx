// skuReducer.ts
export interface SkuItem {
    id: string;
    label: string;
    Department: string;
    price: number;
    cost: number;
}

export type SkuAction =
    | { type: 'ADD_SKU'; payload: SkuItem }
    | { type: 'EDIT_SKU'; payload: SkuItem }
    | { type: 'DELETE_SKU'; payload: { id: string } }
    | { type: 'SET_SKU'; payload: SkuItem[] };

export const skuReducer = (state: SkuItem[], action: SkuAction): SkuItem[] => {
    switch (action.type) {
        case 'ADD_SKU':
            return [...state, action.payload];
        case 'EDIT_SKU':
            return state.map((item) =>
                item.id === action.payload.id ? action.payload : item
            );
        case 'DELETE_SKU':
            return state.filter((item) => item.id !== action.payload.id);
        case 'SET_SKU':
            return action.payload;
        default:
            return state;
    }
};