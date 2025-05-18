import React, { useState } from 'react';
import { Button, TextField,Typography } from '@mui/material';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../services/AuthContext.js';
import Rodape from './rodape.js';
import {extractUTMTags} from './utm_tags.js';
import {saveDesiteEventInDB} from './tracking.js';

const utmTags = extractUTMTags();

const Logon = ({useRodape = true}) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = searchParams.get('redirect') || '/allcourses';

  const { login, logout, user } = useAuth();
  
  let nam = "";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [loginErr,setLoginErr]=useState('');

  const formInputChange = (formField, value) => {
    if (formField === "email") {
      setEmail(value);
    }
    if (formField === "password") {
      setPassword(value);
    }
  };

  const validation = () => {
    return new Promise((resolve, reject) => {
      if (email === '' && password === '') {
        setEmailErr("Digite o seu email");
        setPasswordErr("Digite a senha desejada");
        resolve({email:"Email is Required",password:"Password is required"});
        return reject();
      }
      else if (email === '') {
        setEmailErr("Digite o seu email");
        resolve({email:"Email is Required",password:""});
        return reject();
      }
      else if (password === '') {
        setPasswordErr("Digite a senha desejada");
        resolve({email:"",password:"Password is required"});
        return reject();
      }
      else if (password.length < 6) {
        setPasswordErr("Mínimo de 8 caracteres");
        resolve({email:"",password:""});
        return reject();
      } else {
        resolve({ email: "", password: "" });
      }
    });
  };

  const handleClick = () => {
    console.log("Click login");
    setEmailErr("");
    setPasswordErr("");
    validation()
      .then(() => {
        console.log("Validation passed");
        login(email, password)
          .then(() => {
            console.log("Entered then after login");
            setLoginErr('');
            saveDesiteEventInDB("login", "");
            //navigate(redirect, { replace: true });
            window.location.href = redirect;
            /* if (redirect === '') {
              navigate('/allcourses');
            } else {
              window.location.href = redirect;
            } */
          })
          .catch(err => {
            console.log("Login error:", err.message);
            setLoginErr(err.message);
          });
      })
      .catch(() => {
        // Validation failed, do nothing here
        console.log("Validation failed");
      });
  };

  if (utmTags.nam === 'restricted') {
    nam = "Faça login para acessar esta página:";
  } else {
    nam = "Já tem uma conta? Faça login:";
  }

  return (
    <>
    <section id="form" className="sectionf">
    <img src="/dominio_eletrico_logo_2023.png" alt="Logo do Domínio Elétrico" width="300" className="logo-image" />
    <div className="auth-container">
    {user ? (
      <>
      <h2>Você já está logado como <b>{user.attributes?.name || user.cognitoUser.getUsername()}</b>.</h2>
      <p>Se desejar sair da sua conta, clique no botão abaixo:</p>
      <div className='form'>
        <div className='formfield'>
          <Button type='button' variant='contained' onClick={logout}>Sair da conta</Button>
        </div>
      </div>
    </>
     ) : (
      <>
      <h2>{nam}</h2>
      <div className='contact_form'>
        <div className="formfield">
          <TextField
            value={email}
            onChange={(e) => formInputChange("email", e.target.value)}
            label="email"
            helperText={emailErr}
          />
        </div>
        <div className='formfield'>
          <TextField
            value={password}
            onChange={(e) => { formInputChange("password", e.target.value) }}
            type="password"
            label="senha"
            helperText={passwordErr}
          />
        </div>
        <div className='formfield'>
          <Button type='submit' variant='contained' onClick={handleClick}>Fazer login</Button>
        </div>
        <Typography variant="body">{loginErr}</Typography>
      </div>
      <h3>Não tem conta ainda? <br /><a href="signup">Crie uma gratuitamente</a></h3>
      <h3>Esqueceu sua senha? <br /><a href="recover">Resete a sua senha</a></h3>
      </>
      )} 
    </div>
    </section>
    {useRodape && <Rodape />}
    </>
  )
}

export default Logon;