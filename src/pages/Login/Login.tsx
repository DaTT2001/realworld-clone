import React, { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'

interface FormData  {
  email: string;
  password: string;
};

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData)
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
            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input className="form-control form-control-lg" name='email' type="text" placeholder="Email" value={formData.email} 
                onChange={handleInputChange}/>
              </fieldset>
              <fieldset className="form-group">
                <input className="form-control form-control-lg" name='password' type="password" placeholder="Password" value={formData.password} onChange={handleInputChange}/>
              </fieldset>
              <button type='submit' className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
            </form>
          </div>
        </div>
      </div>
</div>
  )
}

export default Login