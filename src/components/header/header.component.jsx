import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import './header.styles.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectCartHidden,
  selectCartItems,
} from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selector';
import {
  HeaderContainer,
  OptionLink,
  OptionDiv,
  LogoContainer,
  OptionsContainer,
} from './header.styles';

const Header = ({ currentUser, hidden }) => {
  return (
    <HeaderContainer className='header'>
      <LogoContainer className='logo-container' to='/'>
        <Logo className='logo' />
      </LogoContainer>
      <OptionsContainer className='options'>
        <OptionLink to='/shop'>SHOP</OptionLink>
        <OptionLink to='/shop'>CONTACT</OptionLink>
        {currentUser ? (
          <OptionDiv onClick={() => auth.signOut()}>SIGN OUT</OptionDiv>
        ) : (
          <OptionLink to='/signin'>SIGN IN</OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
      {hidden ? null : <CartDropdown />}
    </HeaderContainer>
  );
};

// Using createStructuredSelector from
// reselect you avoid verbose repetion
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

// This is without createStructuredSelector
// note the repetition of passing state
// const mapStateToProps = (state) => ({
//   currentUser: selectCurrentUser(state),
//   hidden: selectCartHidden(state),
// });

export default connect(mapStateToProps)(Header);
