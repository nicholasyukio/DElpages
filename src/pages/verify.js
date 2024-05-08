import React, { useState } from 'react';
import { Button, TextField,Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Rodape from './rodape.js';
import {extractUTMTags} from './utm_tags.js';

const utmTags = extractUTMTags();

function VerifyAccount() {

  const Navigate = useNavigate();

  const handleVerification = () => {
    Navigate(`/logon`);
  };

  return (
    <>
    <section id="form" className="section">
    <img src="/site_de_logo.png" alt="Logo do Domínio Elétrico" width="280" className="logo-image" />
    <h1>Verificação de conta</h1>
    <div className="form-container">
      <h2>Agora falta verificar seu email ({utmTags.email})</h2>
      <p>Para isso, abra a sua caixa de entrada, procure pelo email enviado para verificação de conta e clique no link enviado.</p>
      <p><b>Depois de fazer isso,</b> clique no botão abaixo para fazer seu primeiro login no site Domínio Elétrico.</p>
      <Button type='submit' variant='contained' onClick={handleVerification}>Já verifiquei</Button>
    </div>
    </section>
    <Rodape />
    </>
  );
}

export default VerifyAccount;
