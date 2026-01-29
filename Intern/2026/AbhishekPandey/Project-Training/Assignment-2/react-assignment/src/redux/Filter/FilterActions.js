import { CHANGE_FUEL_TYPE, CHANGE_BUDGET, CHANGE_SORT_BY, CLEAR_FILTER, CHANGE_MAKE_ID, CHANGE_CITY } from "./FilterTypes";

export function changeFuelType(data) {
    return { type: CHANGE_FUEL_TYPE, payload: data };
}

export function changeBudget(data) {
    return { type: CHANGE_BUDGET, payload: data };
}

export function clearFilter() {
    return { type: CLEAR_FILTER };
}

export function changeSortBy(data) {
    return { type: CHANGE_SORT_BY, payload: data };
}

export function changeMakeId(data) {
    return { type: CHANGE_MAKE_ID, payload: data };
}

export function changeCity(data) {
    return { type: CHANGE_CITY, payload: data };
}
