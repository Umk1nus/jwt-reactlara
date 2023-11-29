import React from 'react';
import { deleteCookie, getCookie } from '../helper';

const User = (props) => {

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getCookie('jwt')}`,
        'Content-Type': 'application/json'
      },
    });

    deleteCookie('jwt')
    props.setName('')
  }

  return (
    <>
      <p>{props.name}</p>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default User;