import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin,GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function LoginGoogle(){
    const [ user, setUser ] = useState([]);

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setNome(res.data.given_name)
                        setSobrenome(res.data.family_name)
                        setEmail(res.data.email)
                        googleLogout();
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    return (
        <div>
            Nome:{nome}<br/>
            Sobrenome:{sobrenome}<br/>
            Email:{email}<br/>
            <button onClick={() => login()}>Sign in with Google</button>
        </div>
    );
}