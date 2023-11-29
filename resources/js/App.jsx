import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client'
import { getCookie } from './helper';
import User from './components/User';
import Auth from './components/Auth';

export default function App() {
  const [name, setName] = useState('');
  const [load, setLoad] = useState(false)

  useEffect(() => {
    !name && (
      async () => {
        try {
          const response = await fetch('/api/auth/me', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${getCookie('jwt')}`,
              'Content-Type': 'application/json'
            },
        });

        const content = await response.json();

        setName(content.name);
        } finally {
          setLoad(true)
        }
      }
    )();
  }, []);

  return(
    <>
      {load && (name ?
        ( <User name={name} setName={setName}/>) : 
        ( <Auth setName={setName} />)
      )}
    </>
  );
}

if(document.getElementById('root')){
    createRoot(document.getElementById('root')).render(<App />)
}