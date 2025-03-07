// storeReducer.ts
export interface Store {
    id: string;
    Label: string;
    City: string;
    State: string;
}

export type StoreAction =
    | { type: 'ADD_STORE'; payload: Store }
    | { type: 'EDIT_STORE'; payload: Store }
    | { type: 'DELETE_STORE'; payload: { id: string } }
    | { type: 'SET_STORES'; payload: Store[] };

export const storeReducer = (state: Store[], action: StoreAction): Store[] => {
    switch (action.type) {
        case 'ADD_STORE':
            return [...state, action.payload];
        case 'EDIT_STORE':
            return state.map((store) =>
                store.id === action.payload.id ? action.payload : store
            );
        case 'DELETE_STORE':
            return state.filter((store) => store.id !== action.payload.id);
        case 'SET_STORES':
            return action.payload;
        default:
            return state;
    }
};