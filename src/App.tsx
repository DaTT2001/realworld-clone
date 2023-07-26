import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ArticleEditor from './pages/ArticleEditor/ArticleEditor';
import Layout from './pages/Layout';
import Profiles from './pages/Profiles/Profiles';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/articles/:slug" element={<ArticleEditor/>} />
            <Route path="/profiles/:username" element={<Profiles/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
