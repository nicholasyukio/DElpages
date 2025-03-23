import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import QRCode from 'react-qr-code'; // Install this library using npm install qrcode.react

const DescricaoInicialOferta = () => {
    return (
        <>
        <h2 className='header-with-reduced-margin'>Receba o acesso a:</h2>
        <ul className='content-listing'>
            <li><b>Conteúdo principal: </b>11 módulos (~88 horas de aulas gravadas)</li>
            <li><b>DE Labs: </b>aulas experimentais de circuitos elétricos em laboratório</li>
            <li><b>MdE: </b>curso de revisão de matemática básica para circuitos (~25 horas)</li>
            <li><b>Comunidade: </b>grupo exclusivo de alunos no Telegram com o Prof. Nicholas Yukio</li>
            <li><b>Período: </b>1 ano de acesso ao curso (em <i>curso.dominioeletrico.com.br</i>)</li>
            <li><b>Certificado de conclusão: </b> (apenas para quem terminar o curso)</li>
        </ul>
        </>
    );
}

const Checkout = ({ isMobile }) => {
  const [step, setStep] = useState(1); // Step 1: Form, Step 2: Payment info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const pix_code = "00020126580014br.gov.bcb.pix0136c58843a5-5c59-45b1-aefd-f28ecd88b8d35204000053039865406400.005802BR5922N__Y__M__SUGIMOTO_LTDA6015Sao_Jose_dos_Ca610912235-05062240520CursoDominioEletrico6304E2F8";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send form data to Formspree (replace with your Formspree endpoint)
    await fetch('https://formspree.io/f/xpwpdvky', {
      method: 'POST',
      body: JSON.stringify({ name, email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setSubmitted(true);
    setStep(2); // Move to step 2
  };

  return (
    <section id="form" className="section">
      <div className="checkout-container">
      {step === 1 && !submitted && (
        <div className="auth-container">
            <div className='contact_form'>
            <DescricaoInicialOferta />
            <p>O acesso ao curso custa <b>R$ 400 / ano</b>, e no momento estamos apenas aceitando pagamento à vista por Pix.</p>
            <h3 align="center">Para começar a sua inscrição, preencha os dados:</h3>
            <div className="formfield">
            <TextField
                label="Nome"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            </div>
            <div className="formfield">
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>
            <div className='formfield'>
            <Button 
            onClick={handleSubmit} 
            className="btn-submit" 
            variant="contained"
            color="primary"
            >
            Prosseguir para o pagamento
            </Button>
            </div>
            </div>
        </div>
        )}

        {step === 2 && (
        <div className="auth-container">
            <h2 align="center">Pagamento via Pix</h2>
            <p align="center">Faça o Pix no valor de <b>R$ 400</b> para 1 ano de acesso ao curso Domínio Elétrico.</p>
            
            <div className="qr-code-container" align="center">
            <QRCode value={pix_code} size={256} />
            </div>
            
            {/* Display Pix payment link below the QR code */}
            <div className="pix-link-container" align="center" style={{ marginTop: '10px' }}>
            <small>
                <b>Código copia e cola do Pix:</b>
            </small>
            {!isMobile && 
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <input
                type="text"
                value={pix_code}
                readOnly
                style={{ fontSize: '14px', width: '300px', height: '25px', padding: '5px', marginRight: '10px' }}
                />
                <Button
                onClick={() => {
                    navigator.clipboard.writeText(pix_code)
                    .then(() => alert('Código pix copiado para a área de transferência!'))
                    .catch((err) => console.error('Erro ao copiar:', err));
                }}
                variant="contained"
                color="primary"
                >
                Copiar
                </Button>
            </div>
            }
            {isMobile && 
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <input
                type="text"
                value={pix_code}
                readOnly
                style={{ fontSize: '12px', width: '200px', height: '25px', padding: '5px', marginRight: '10px' }}
                />
                <button
                onClick={() => {
                    try {
                    // First try to use navigator.clipboard.writeText (modern approach)
                    navigator.clipboard.writeText(pix_code)
                        .then(() => {
                        alert('Código pix copiado!');
                        })
                        .catch((err) => {
                        throw new Error('Clipboard API failed');
                        });
                    } catch (err) {
                    // If clipboard API fails, fall back to document.execCommand('copy') (older approach)
                    const tempInput = document.createElement('input');
                    tempInput.value = pix_code;
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempInput);
                    
                    alert('Código pix copiado!');
                    }
                }}
                style={{
                    fontSize: '12px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    border: '1px solid #ccc',
                    backgroundColor: '#f4f4f4'
                }}
                >
                Copiar
                </button>
            </div>
            }
            </div>

            <p align="center">
            Por favor, envie o comprovante de pagamento para <b>nicholasyukio@dominioeletrico.com.br</b>
            </p>
            <p align="center">
            Após a confirmação do pagamento, você será matriculado no curso.
            </p>
            <h3 className="urgente" align="left">Aviso: O preço pode mudar a qualquer momento.</h3>
            <p>Você tem 7 dias para pedir o reembolso integral, caso não fique satisfeito com o curso.</p>
        </div>
        )}
      </div>
    </section>
  );
};

export default Checkout;