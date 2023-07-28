import React, { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useRealWorld } from '../../DataContext/Provider';
import { registerApi } from '../../shared/api/api';
import { setIsLogged, setUser } from '../../DataContext/helper';

interface FormData  {
  email: string
  password: string
  username: string
};

const Register = () => {
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    username: ''
  });
  const { dispatch } = useRealWorld();
  const [isError, setIsError] = useState(false);
  const [isDisabled, setIsDisable] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIsError(false);
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsDisable(true);
      setIsError(false);
      const response = await registerApi(formData.email, formData.password, formData.username);
      dispatch(setUser(response.user));
      dispatch(setIsLogged(true));
      localStorage.setItem('accessToken', response.user.token);
      navigateTo('/');
    } catch (err) {
      setIsError(true);
      setIsDisable(false);
    }
  };
  return (
    <div className="auth-page">
  <div className="container page">
    <div className="row">
      <div className="col-md-6 offset-md-3 col-xs-12">
        <h1 className="text-xs-center">Sign up</h1>
        <p className="text-xs-center">
          <Link to="/login">Have an account?</Link>
        </p>

        {
          isError && (
                <ul className="error-messages">
                <li>That email is already taken</li>
              </ul>
            )
        }
        <form onSubmit={handleSubmit}>
          <fieldset className="form-group">
            <input className="form-control form-control-lg" disabled={isDisabled} onChange={handleInputChange} type="text" placeholder="Username" name='username' />
          </fieldset>
          <fieldset className="form-group">
            <input className="form-control form-control-lg" disabled={isDisabled} onChange={handleInputChange} type="email" placeholder="Email" name='email' />
          </fieldset>
          <fieldset className="form-group">
            <input className="form-control form-control-lg" disabled={isDisabled} onChange={handleInputChange} type="password" placeholder="Password" name='password' />
          </fieldset>
          <button disabled={isDisabled} type='submit' className="btn btn-lg btn-primary pull-xs-right">Sign up</button>
        </form>
      </div>
    </div>
  </div>
</div>
  )
}

export default Register