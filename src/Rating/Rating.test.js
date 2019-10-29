import React from 'react';
import ReactDOM from 'react-dom';
import Rating from './Rating';

it('renders without crashing', () => {
  const value = 1
  const div = document.createElement('div');
  ReactDOM.render(<Rating value = {value}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
