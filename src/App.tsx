import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ArticleDetail from "./pages/ArticleDetail/ArticleDetail";
import Layout from "./pages/Layout";
import Profiles from "./pages/Profiles/Profiles";
import Setting from "./pages/Setting/Setting";
import { useRealWorld } from "./DataContext/Provider";
import PrivateRoute from "./components/PrivatedRoute";
import ArticleEditor from "./pages/ArticleEditor/ArticleEditor";

function App() {
  const { state } = useRealWorld();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index path="/" element={<Home />} />
            <Route
              path="/editor/:article" 
              element={
                <PrivateRoute
                  element={ArticleEditor}
                  isAuthenticated={state.isLogged}
                />
              }
            />
            <Route
              path="/setting"
              element={
                <PrivateRoute
                  element={Setting}
                  isAuthenticated={state.isLogged}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/articles/:slug" element={<ArticleDetail />} />
            <Route path="/profiles/:username" element={<Profiles />} />
            <Route path='*' element={<Home />} />
            {/* <Route path="/editor/:article" element={<ArticleEditor />} /> */}
            {/* <Route path="/setting" element={<Setting />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
