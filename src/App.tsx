import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/Main';
import ChatPage from './pages/Chat';
import ErrorPage from './pages/ErrorPage';
import Layout from './components/Layout';
import './assets/scss/app.scss';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ErrorHandler from './components/ErrorHandler';

function App() {
  return (
    <Provider store={store}>
      <ErrorHandler>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorHandler>
    </Provider>
  );
}

export default App;
