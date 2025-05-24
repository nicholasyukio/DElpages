import { Button, TextField} from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Rodape from './rodape.js';
import {extractUTMTags} from './utm_tags.js';
import Cookies from 'js-cookie';
import { useAuth } from '../services/AuthContext.js';
import { notify } from '../services/notify';

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
        resolve({name: "Nome é obrigatório", email:"email necessário",password:"senha necessária"});
      }
      else if (name === '') {
        setNameErr("Digite o seu nome");
        resolve({name: "Nome é obrigatório", email:"",password:""});
      }
      else if (email === '') {
        setEmailErr("Digite o seu email");
        resolve({name: "", email:"email necessário",password:""});
      }
      else if (password === '') {
        setPasswordErr("Digite a senha desejada");
        resolve({name: "", email:"",password:"senha necessária"});
      }
      else if (password.length < 8) {
        setPasswordErr("Mínimo de 8 caracteres");
        resolve({name: "", email:"",password:"precisa ter pelo menos 8 caracteres"});
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
              notify("SITE SIGNUP", `${name} (${email}) se cadastrou no site!`);
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
    <div className="auth-container-signup">
      <h2>Crie uma conta no site gratuitamente:</h2>
      <ul className="signup-benefits">
        <li>✅ 7 cursos/playlists gratuitos de circuitos elétricos</li>
        <li>✅ Total de 174 aulas gratuitas</li>
        <li>✅ Se quiser mais, conteúdo premium depois</li>
      </ul>
      <div className='form'>
        <div className="formfield">
          <TextField
            value={name}
            fullWidth
            onChange={(e) => formInputChange("name", e.target.value)}
            label="nome"
            helperText={nameErr}
          />
        </div>
        <div className="formfield">
          <TextField
            value={email}
            fullWidth
            onChange={(e) => formInputChange("email", e.target.value)}
            label="email"
            helperText={emailErr}
          />
        </div>
        <div className='formfield'>
          <TextField
            value={password}
            fullWidth
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

const SignupSite = () => {
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
        resolve({name: "Nome é obrigatório", email:"email necessário",password:"senha necessária"});
      }
      else if (name === '') {
        setNameErr("Digite o seu nome");
        resolve({name: "Nome é obrigatório", email:"",password:""});
      }
      else if (email === '') {
        setEmailErr("Digite o seu email");
        resolve({name: "", email:"email necessário",password:""});
      }
      else if (password === '') {
        setPasswordErr("Digite a senha desejada");
        resolve({name: "", email:"",password:"senha necessária"});
      }
      else if (password.length < 8) {
        setPasswordErr("Mínimo de 8 caracteres");
        resolve({name: "", email:"",password:"precisa ter pelo menos 8 caracteres"});
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
              notify("SITE SIGNUP", `${name} (${email}) se cadastrou no site!`);
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
    <div className="auth-container-signup">
      <h2>Crie uma conta no site gratuitamente:</h2>
      <p className="signup-benefits">Em instantes você pode começar a estudar gratuitamente no nosso site. Preecha os dados abaixo:</p>
      <div className='form'>
        <div className="formfield">
          <TextField
            value={name}
            fullWidth
            onChange={(e) => formInputChange("name", e.target.value)}
            label="nome"
            helperText={nameErr}
          />
        </div>
        <div className="formfield">
          <TextField
            value={email}
            fullWidth
            onChange={(e) => formInputChange("email", e.target.value)}
            label="email"
            helperText={emailErr}
          />
        </div>
        <div className='formfield'>
          <TextField
            value={password}
            fullWidth
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
    </>
  )
}

export {Signup, SignupSite};