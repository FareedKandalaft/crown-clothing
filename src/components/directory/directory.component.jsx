import React, { Component } from 'react';
import MenuItem from '../menu-item/menu-item.component';
import DIRECTORY_DATA from './directory.data';
import './directory.styles.scss';

export default class Directory extends Component {
  constructor() {
    super();
    this.state = {
      sections: DIRECTORY_DATA,
    };
  }

  render() {
    return (
      <div className='directory-menu'>
        {this.state.sections.map(({ id, ...otherSectionProps }) => (
          <MenuItem key={id} {...otherSectionProps} />
        ))}
      </div>
    );
  }
}
