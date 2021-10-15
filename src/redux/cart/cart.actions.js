import CartActionTypes from './cart.types';

// Note since this is a simple toggle of a bool
// no payload is necessary and therefore not included
export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
});
