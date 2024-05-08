import { Button, TextField} from '@mui/material';
import React, { useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import userpool from '../userpool';
import Rodape from "./rodape";

const Recover = () => {
  const [stage, setStage] = useState(1); // 1 = email stage, 2 = code stage
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const getUser = () => {
    return new CognitoUser({
      Username: email.toLowerCase(),
      Pool: userpool
    });
  };

  const sendCode = event => {
    event.preventDefault();

    getUser().forgotPassword({
      onSuccess: data => {
        console.log("onSuccess:", data);
      },
      onFailure: err => {
        console.error("onFailure:", err);
      },
      inputVerificationCode: data => {
        console.log("Input code:", data);
        setStage(2);
      }
    });
  };

  const resetPassword = event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.error("As senhas são diferentes");
      return;
    }

    getUser().confirmPassword(code, password, {
      onSuccess: data => {
        console.log("onSuccess:", data);
        setStage(3);
      },
      onFailure: err => {
        console.error("onFailure:", err);
      }
    });
  };

  return (
    <>
    <section id="form" className="section">
    <img src="/site_de_logo.png" alt="Logo do Domínio Elétrico" width="280" className="logo-image" />
    <div className="auth-container">
      {stage === 1 && (
        <>
        <h2>Digite o seu email para enviarmos o código de verificação:</h2>
        <div className='form'>
          <div className="formfield">
          <TextField
            value={email}
            onChange={event => setEmail(event.target.value)}
            label="email"
            helperText=""
          />
          </div>
          <div className="formfield">
            <Button type='submit' variant='contained' onClick={sendCode}>Enviar código de verificação</Button>
          </div>
        </div>
        </>
      )}

      {stage === 2 && (
        <>
        <h2>Digite o código enviado, a nova senha e confirme a nova senha:</h2>
        <div className='form'>
          <div className="formfield">
            <TextField value={code} 
              onChange={event => setCode(event.target.value)} 
              label="código"
              helperText=""/>
          </div>
          <div className="formfield">
            <TextField
              value={password}
              onChange={event => setPassword(event.target.value)}
              type="password"
              label="nova senha"
              helperText=""
            />
          </div>
          <div className="formfield">
            <TextField
              value={confirmPassword}
              onChange={event => setConfirmPassword(event.target.value)}
              type="password"
              label="repetir nova senha"
              helperText=""
            />
          </div>
          <div className="formfield">
            <Button type='submit' variant='contained' onClick={resetPassword}>Resetar senha</Button>
          </div> 
        </div>
        </>
      )}

      {stage === 3 && (
        <>
        <h2>Senha alterada. </h2><p>Clique no botão abaixo para acessar a página de login:</p>
        <div className='form'>
          <div className="formfield">
            <Button type='submit' variant='contained' onClick={() => window.location.href = 'logon'}>Acessar página de login</Button>
          </div> 
        </div>
        </>
      )}
    </div>
    </section>
    <Rodape />
    </>
  );
};

export default Recover;