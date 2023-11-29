import React, { useState } from 'react';
import { setCookie } from '../helper';

const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (email && password) {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
          email,
          password
        })
      });
  
      const content = await response.json();
      setCookie('jwt', content.token.original.access_token)
  
      props.setName(content.user.name);
    }
  }

  return (
    <>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email address" required onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
        <button type="submit">Sign in</button>
      </form>
      <p>Don't have an account ? <span style={{cursor: 'pointer', fontWeight: '600'}} onClick={() => props.setSignIn(false)}>Register</span></p>  
    </>
  );
};

export default SignIn;