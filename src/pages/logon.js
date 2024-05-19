import React, { useState } from 'react';
import { Button, TextField,Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../services/authenticate';
import Rodape from './rodape.js';
import {extractUTMTags} from './utm_tags.js';
import {saveDesiteEventInDB} from './tracking.js';

const utmTags = extractUTMTags();

const Logon = ({useRodape = true, redirect = ""}) => {

  const Navigate = useNavigate();
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
      }
      else if (email === '') {
        setEmailErr("Digite o seu email");
        resolve({email:"Email is Required",password:""});
      }
      else if (password === '') {
        setPasswordErr("Digite a senha desejada");
        resolve({email:"",password:"Password is required"});
      }
      else if (password.length < 6) {
        setPasswordErr("Mínimo de 8 caracteres");
        resolve({email:"",password:"must be 8 character"});
      }
      else{
        resolve({email:"",password:""});
      }
    });
  };

  const handleClick = () => {
    setEmailErr("");
    setPasswordErr("");
    validation()
      .then((res) => {
        if (res.email === '' && res.password === '') {
          authenticate(email,password)
          .then((data)=>{
            setLoginErr('');
            saveDesiteEventInDB("login", "");
            if (redirect === '') {
              Navigate('/');
            } else {
              window.location.href = redirect;
            }
          },(err)=>{
            // console.log(err);
            setLoginErr(err.message)
          })
          .catch(err=>console.log(err))
        }
      }, err => console.log(err))
      .catch(err => console.log(err));
  }

  if (utmTags.nam === 'restricted') {
    nam = "Faça login para acessar esta página:";
  } else {
    nam = "Já tem uma conta? Faça login:";
  }

  return (
    <>
    <section id="form" className="section">
    <img src="/site_de_logo.png" alt="Logo do Domínio Elétrico" width="280" className="logo-image" />
    <div className="auth-container">
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
    </div>
    </section>
    {useRodape && <Rodape />}
    </>
  )
}

export default Logon;