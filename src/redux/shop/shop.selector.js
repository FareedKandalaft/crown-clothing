import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';
const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

// By changing the underlying shop data to a keyed hash from an array
// of collections you can access the data without the need of a Key_map
// this also allows you much faster access to the collection data if
// it were to grow very large and you had to do a search
export const selectCollection = memoize((collectionUrlParam) =>
  createSelector([selectCollections], (collections) =>
    collections ? collections[collectionUrlParam] : null
  )
);

// export const selectCollection = memoize((collectionUrlParam) =>
//   createSelector([selectCollections], (collections) =>
//     collections.find(
//       (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
//     )
//   )
// );

// import { createSelector } from 'reselect';
// import memoize from 'lodash.memoize';

// const COLLECTION_ID_MAP = {
//   hats: 1,
//   sneakers: 2,
//   jackets: 3,
//   womens: 4,
//   mens: 5,
// };

// // Gets a particular reducer from rootReducer
// const selectShop = (state) => state.shop;

// export const selectCollections = createSelector(
//   [selectShop],
//   (shop) => shop.collections
// );

// export const selectCollection = memoize((collectionUrlParam) =>
//   createSelector([selectCollections], (collections) =>
//     collections.find(
//       (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
//     )
//   )
// );
