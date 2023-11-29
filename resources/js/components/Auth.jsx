import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Auth = (props) => {
  const [signIn, setSignIn] = useState(true)

  return (
    <>
      { signIn ? (<SignIn setName={props.setName} setSignIn={setSignIn} />) : (<SignUp setName={props.setName} setSignIn={setSignIn} />)  }
    </>
  );
};

export default Auth;