import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import ChatPage from './pages/Chat';
import ErrorPage from './pages/ErrorPage';
import Layout from './components/Layout';
import './assets/scss/app.scss';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ErrorHandler from './components/ErrorHandler';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <ErrorHandler>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/chat" element={<PrivateRoute redirectTo="/" />}>
                <Route path="/chat" element={<ChatPage />} />
              </Route>
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorHandler>
    </Provider>
  );
}

export default App;
