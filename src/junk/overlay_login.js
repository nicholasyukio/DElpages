// LoginForm.js
import React from 'react';
import styled from 'styled-components';
import Logon from '../logon';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 128, 0.7); /* Fundo semitransparente azul escuro */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const FormContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const LoginForm = ({ onClose }) => {
  return (
    <Overlay>
      {/* <FormContainer>
        <h2>Login</h2>
        <form>
          <div>
            <label>Email</label>
            <input type="email" required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
        <button onClick={onClose}>Close</button>
      </FormContainer> */}
      <Logon useRodape={false} redirect={window.location.href}/>
    </Overlay>
  );
};

export default LoginForm;
