import React, { useEffect, useState } from 'react';
import { setCookie } from '../helper';

const SignUp = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    if (error) {
      return
    }

    e.preventDefault();
    if (name && email && password) {
      const response =  await fetch('/api/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name,
            email,
            password
        })
      });
      const content = await response.json();
  
      props.setName(content.user.name);
      setCookie('jwt', content.token);
    }
  }

  useEffect(() => {
    const reg = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/);
    if (password) {
      !reg.exec(password) ? setError('Password must contain at least 1 number, uppercase and lowercase letter') : setError('');
    } else {
      setError('');
    }
  }, [password]);

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" required onChange={e => setName(e.target.value)}/>
        <input type="email"  placeholder="Email address" required onChange={e => setEmail(e.target.value)} />
        <input style={{borderColor: error && 'red'}} type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
        <button type="submit">Submit</button>
      </form>
      <p style={{color: error && 'red'}}>{error}</p>
      <p style={{'borderColor': error && 'red'}}>Do you have an account ? <span style={{cursor: 'pointer', fontWeight: '600'}} onClick={() => props.setSignIn(true)}>Login</span></p>  
    </>
  );
};

export default SignUp;