import React, { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { loginApi } from '../../shared/api/api';
import { useNavigate } from "react-router-dom"
import { useRealWorld } from '../../DataContext/Provider';
import { setIsLogged, setUser } from '../../DataContext/helper';

interface FormData  {
  email: string;
  password: string;
};

const Login = () => {
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [isDisabled, setIsDisable] = useState(false);
  const { dispatch } = useRealWorld();
  const [isError, setIsError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIsError(false)
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
      const response = await loginApi(formData.email, formData.password);
      dispatch(setUser(response.user));
      dispatch(setIsLogged(true));
      localStorage.setItem('accessToken', response.user.token);
      navigateTo('/');
    } catch (err) {
      setIsError(true);
      setIsDisable(false)
    }
  };
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
            </p>
            {
              isError && (
                <ul className="error-messages">
                <li>email or password is invalid</li>
              </ul>
            )
            }
            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input disabled={isDisabled} className="form-control form-control-lg" name='email' type="email" placeholder="Email" value={formData.email} 
                onChange={handleInputChange}/>
              </fieldset>
              <fieldset className="form-group">
                <input disabled={isDisabled} className="form-control form-control-lg" name='password' type="password" placeholder="Password" value={formData.password} onChange={handleInputChange}/>
              </fieldset>
              <button disabled={isDisabled} type='submit' className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
            </form>
          </div>
        </div>
      </div>
</div>
  )
}

export default Login