import { createAction } from 'redux-actions';

export const setSticky = createAction("SET_STICKY");
export const removeSticky = createAction("REMOVE_STICKY");
export const setSidebarSticky = createAction("SET_SIDEBAR_STICKY");
export const removeSidebarSticky = createAction("REMOVE_SIDEBAR_STICKY");
