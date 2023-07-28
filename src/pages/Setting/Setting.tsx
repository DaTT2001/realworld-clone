import React, { useState, FormEvent } from "react";
import { User } from "../../shared/interfaces";
import { updateCurrentUser } from "../../shared/api/api";
import { useNavigate } from "react-router-dom"
import { useRealWorld } from "../../DataContext/Provider";
import { setIsLogged, setUser } from "../../DataContext/helper";
import { DEFAULT_STATE } from "../../shared/constains";

const Setting = () => {
  const {state, dispatch} = useRealWorld();
  const navigateTo = useNavigate();
  const [profile, setProfile] = useState<User>(state.user);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const res = await updateCurrentUser(profile.email, profile.password, profile.username, profile.bio, profile.image);
        dispatch(setUser(res.user))
        localStorage.setItem('accessToken', res.user.token);
        navigateTo('/')
    }
    catch (err) {
        console.log(err);
    }
  };
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    localStorage.removeItem('accessToken');
    dispatch(setUser(DEFAULT_STATE.user))
    dispatch(setIsLogged(false))
    navigateTo('/')
  } 
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    name="image"
                    onChange={handleInputChange}
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    value={profile.image}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    name="username"
                    onChange={handleInputChange}
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    value={profile.username}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    name="bio"
                    onChange={handleInputChange}
                    value={profile.bio ? profile.bio : ""}
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    name="email"
                    onChange={handleInputChange}
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={profile.email}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    name="password"
                    value={profile.password}
                    onChange={handleInputChange}
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="New Password"
                  />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button onClick={handleLogout} type="submit" className="btn btn-outline-danger">
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
