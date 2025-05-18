import { Button, TextField} from '@mui/material';
import React, { useState } from "react";
import { useAuth } from '../services/AuthContext.js';
import Rodape from "./rodape";

const Recover = () => {
  const [stage, setStage] = useState(1); // 1 = email stage, 2 = code stage
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { forgotPassword, confirmPassword: confirmPasswordCognito } = useAuth();

  const sendCode = async (event) => {
    event.preventDefault();
    try {
      await forgotPassword(email.toLowerCase(), () => {
        setStage(2);
      });
    } catch (err) {
      console.error("Erro ao enviar código:", err);
    }
  };

  const resetPassword = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.error("As senhas são diferentes");
      return;
    }

    try {
      await confirmPasswordCognito(email.toLowerCase(), code, password);
      setStage(3);
    } catch (err) {
      console.error("Erro ao redefinir senha:", err);
    }
  };

  return (
    <>
    <section id="form" className="section">
    <img src="/dominio_eletrico_logo_2023.png" alt="Logo do Domínio Elétrico" width="300" className="logo-image" />
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