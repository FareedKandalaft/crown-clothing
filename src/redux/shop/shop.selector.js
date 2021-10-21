import { createSelector } from 'reselect';
// Gets a particular reducer from rootReducer
const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);
