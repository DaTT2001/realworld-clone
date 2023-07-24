import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ArticleEditor from './pages/ArticleEditor/ArticleEditor';
import Profile from './pages/Profile/Profile';
import Layout from './pages/Layout';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/article/:slug" element={<ArticleEditor/>} />
            <Route path="/:username" element={<Profile/>} />
          </Route>
          {/* <PrivateRoute as={Settings} path="/settings" />
          <PrivateRoute as={Editor} path="/editor" />
          <PrivateRoute as={Editor} path="/editor/:slug" /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
