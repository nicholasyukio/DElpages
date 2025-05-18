import { Button, TextField} from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Rodape from './rodape.js';
import {extractUTMTags} from './utm_tags.js';
import Cookies from 'js-cookie';
import { useAuth } from '../services/AuthContext.js';

const utmTags = extractUTMTags();

const Signup = () => {
  const { signup } = useAuth();
  const Navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const formInputChange = (formField, value) => {
    if (formField === "name") {
      setName(value);
    }
    if (formField === "email") {
      setEmail(value);
    }
    if (formField === "password") {
      setPassword(value);
    }
  };

  const validation = () => {
    return new Promise((resolve,reject)=>{
      if (name === '' && email === '' && password === '') {
        setNameErr("Digite o seu nome");
        setEmailErr("Digite o seu email");
        setPasswordErr("Digite a senha desejada");
        resolve({name: "Name is Required", email:"Email is Required",password:"Password is required"});
      }
      else if (name === '') {
        setNameErr("Digite o seu nome");
        resolve({name: "Name is required", email:"",password:""});
      }
      else if (email === '') {
        setEmailErr("Digite o seu email");
        resolve({name: "", email:"Email is Required",password:""});
      }
      else if (password === '') {
        setPasswordErr("Digite a senha desejada");
        resolve({name: "", email:"",password:"Password is required"});
      }
      else if (password.length < 8) {
        setPasswordErr("Mínimo de 8 caracteres");
        resolve({name: "", email:"",password:"must be 8 character"});
      }
      else{
        resolve({name: "", email:"",password:""});
      }
      reject('')
    });
  };

  const handleClick = (e) => {
    setNameErr("");
    setEmailErr("");
    setPasswordErr("");
    validation()
      .then((res) => {
        if (res.email === '' && res.password === '') {
          signup(email, password, name)
            .then((data) => {
              window.dataLayer.push({
                event: 'siteSignUp',
                buttonName: 'signUpButton',
              });
              const user_id = data.userSub;
              Navigate(`/verify?email=${email}`);
            })
            .catch((err) => {
              console.log(err);
              alert("Erro ao criar conta: " + err.message);
            });
        }
      })
      .catch(err => console.log(err));
  };
  

  return (
    <>
    <section id="form" className="section">
    <img src="/dominio_eletrico_logo_2023.png" alt="Logo do Domínio Elétrico" width="300" className="logo-image" />
    <div className="auth-container">
      <h2>Crie uma conta no site gratuitamente:</h2>
      <div className='form'>
        <div className="formfield">
          <TextField
            value={name}
            onChange={(e) => formInputChange("name", e.target.value)}
            label="nome"
            helperText={nameErr}
          />
        </div>
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
        <p className="avisosobresenha">A senha deve ter no mínimo 8 caracteres, com pelo menos uma letra minúscula, uma letra maiúscula, um número e um caractere especial.</p>
        <div className='formfield'>
          <Button type='submit' variant='contained' onClick={handleClick}>Criar conta</Button>
          <p className="politicadeprivacidade">Seus dados estão seguros. <br /><a href="../politicadeprivacidade">Política de privacidade</a></p>
        </div>
      </div>
      <h3>Já tem conta? <br /><a href="logon">Faça o seu login</a></h3>
    </div>
    </section>
    <Rodape />
    </>
  )
}

export default Signup;