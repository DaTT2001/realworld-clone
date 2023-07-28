import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ArticleEditor from './pages/ArticleEditor/ArticleEditor';
import Layout from './pages/Layout';
import Profiles from './pages/Profiles/Profiles';
import Setting from './pages/Setting/Setting';
import { useRealWorld } from './DataContext/Provider';
import PrivateRoute from './components/PrivatedRoute';

function App() {
  const {state} = useRealWorld();
  console.log(state.isLogged);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index path="/" element={<Home/>} />
            <Route
            path="/login"
            element={<PrivateRoute element={Login} isAuthenticated={state.isLogged} />}
          />
          <Route
            path="/register"
            element={<PrivateRoute element={Register} isAuthenticated={state.isLogged} />}
          />
            {/* <Route path="/login" element={<Login/>} /> */}
            {/* <Route path="/register" element={<Register/>} /> */}
            <Route path="/articles/:slug" element={<ArticleEditor/>} />
            <Route path="/profiles/:username" element={<Profiles/>} />
            <Route path="/setting" element={<Setting/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
