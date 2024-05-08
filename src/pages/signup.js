import { Button, TextField} from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {CognitoUserAttribute } from 'amazon-cognito-identity-js';
import Rodape from './rodape.js';
import userpool from '../userpool';
import {extractUTMTags} from './utm_tags.js';

const utmTags = extractUTMTags();

const Signup = () => {

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

  const saveUserInDB = async (user_id) => {
    const userData = {
        user_id: user_id,
        name: name,
        email: email,
        utm_source: utmTags.utm_source,
        utm_term: utmTags.utm_term,
        utm_medium: utmTags.utm_medium
    };
    fetch('https://api.dominioeletrico.com.br/adduser/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Saved user in DB:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }

  const handleClick = (e) => {
    setNameErr("");
    setEmailErr("");
    setPasswordErr("");
    validation()
      .then((res) => {
        if (res.email === '' && res.password === '') {
          const attributeList = [];
          attributeList.push(new CognitoUserAttribute({ Name: 'email', Value: email}));
          attributeList.push(new CognitoUserAttribute({ Name: 'birthdate', Value: '1900-01-01' }));
          attributeList.push(new CognitoUserAttribute({ Name: 'gender', Value: 'none' }));
          attributeList.push(new CognitoUserAttribute({ Name: 'picture', Value: 'default_picture_url.png' }));
          attributeList.push(new CognitoUserAttribute({ Name: 'phone_number', Value: '+1234567890' }));
          attributeList.push(new CognitoUserAttribute({ Name: 'given_name', Value: name }));
          attributeList.push(new CognitoUserAttribute({ Name: 'name', Value: name }));
          let username=email;
          userpool.signUp(username, password, attributeList, null, (err, data) => {
            if (err) {
              console.log(err);
              alert("Erro");
            } else {
              // console.log(data);
              const user_id = data.userSub;
              saveUserInDB(user_id);
              Navigate(`/verify?email=${email}`);
            }
          });
        }
      }, err => console.log(err))
      .catch(err => console.log(err));
  }

  return (
    <>
    <section id="form" className="section">
    <img src="/site_de_logo.png" alt="Logo do Domínio Elétrico" width="280" className="logo-image" />
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