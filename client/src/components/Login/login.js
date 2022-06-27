import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations'
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth'
import "./login.css"
// import logoImage from '../../assets/images/logo.png'

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };
  return (
    <>
    <h1 className="landingPageLogo">kit</h1>
    {/* <img src={ logoImage } className="logoImg" style={{ width: "10%" }} alt="logo" /> */}
    <main className="aboutLoginMain">
    <section className="aboutSection">
    {/* <h1 className="debateText">Let's debate</h1> */}
    {/* <p className="about">soapbox is a social community platform. with a zero tolerance for bullying or cursing! 
        to engage in thought provoking debates with one another.
    </p> */}
    {/* <AiOutlineDown className="downArrow" size={25} /> */}
</section>

    <section id="login-section">
       <form id="login-form" onSubmit={handleFormSubmit}>
          <div className="login">
            {/* <label htmlFor="chk" aria-hidden="true" className="loginLabel"></label> */}
              <input
                placeholder="Email"
                className="loginEmail"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                placeholder="Password"
                className="loginPassword"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              {error && <div className="error">Log in failed</div>}
              <button className="login-button" type="submit">Log in</button>
          <p className="signupLinkText">Don't have an account? <br></br><Link to="/signup" className="link"> Sign up here.</Link></p>
          </div>
       </form>
    </section>
    </main>
    </>
  );
};

export default Login;