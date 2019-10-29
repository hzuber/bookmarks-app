import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import BookmarkItem from './BookmarkItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const title = 'title';
  const url = 'pinterest.com'
  ReactDOM.render(
    <BrowserRouter>
      <BookmarkItem title={title} url={url} />
    </BrowserRouter>, 
  div);
  ReactDOM.unmountComponentAtNode(div);
});
