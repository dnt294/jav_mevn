import React from 'react';
import { Provider } from 'react-redux';

import { store } from './app/store/index';

import { RootComponent } from './app/components/root.component';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootComponent/>
      </Provider>
    );
  }
}
