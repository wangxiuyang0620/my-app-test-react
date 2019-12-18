import React from 'react';
import './App.css';
import Store from './store/store'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import List from './router/routerConfig'
import MyView from './router/myView'
function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <MyView routerlist={List} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
