import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { MenuItem, TextField, Grid, Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import QRCode from 'react-qr-code'; // Install this library using npm install qrcode.react
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

const baseAPI_URL = process.env.REACT_APP_BACKEND_API_BASE_ENDPOINT;
//console.log(baseAPI_URL);

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

const BirthdaySelect = ({day, month, year, setDay, setMonth, setYear})  => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  return (
    <>
    <InputLabel sx={{ fontWeight: 900, color: 'black', mb: 1 }}>Data de nascimento</InputLabel>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TextField
          select
          label="Dia"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          fullWidth
          required
        >
          {days.map((d) => (
            <MenuItem key={d} value={d}>{d}</MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={4}>
        <TextField
          select
          label="Mês"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          fullWidth
          required
        >
          {months.map((m, i) => (
            <MenuItem key={i} value={i + 1}>{m}</MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={4}>
        <TextField
          select
          label="Ano"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          fullWidth
          required
          SelectProps={{
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: 200, // altura máxima em pixels
                },
              },
            },
          }}
        >
          {years.map((a) => (
            <MenuItem key={a} value={a}>{a}</MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
    </>
  );
}

const StartForm = ({name, email, phone, cpf, setName, setEmail, setPhone, setCpf, errors, paymentMethod, setPaymentMethod, value, handleSubmit}) => {
  return (
    <div className="auth-container">
    <div className='contact_form'>
    <DescricaoInicialOferta />
    <h4 align="center">Por apenas <b>R$ {value.toFixed(2)} / ano</b></h4>
    <h3 align="center">Para começar a sua inscrição, preencha os dados:</h3>
    <div className="formfield">
    <TextField
        label="Nome completo"
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
    <div className="formfield">
    <TextField
        label="Celular com DDD"
        variant="outlined"
        fullWidth
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
    />
    </div>
    <div className="formfield">
    <TextField
        label="CPF (apenas números)"
        variant="outlined"
        fullWidth
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        required
    />
    </div>
    <div className="formfield">
      <FormControl component="fieldset">
        <FormLabel component="legend">Forma de pagamento</FormLabel>
        <RadioGroup
          aria-label="payment-method"
          name="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel value="pix" control={<Radio />} label="Pix (à vista)" />
          <FormControlLabel value="credit_card" control={<Radio />} label="Cartão de crédito (à vista ou parcelado em até 12x)" />
        </RadioGroup>
      </FormControl>
    </div>
    <div className='formfield'>
      <p className='errormsg'>{errors}</p>
      <Button 
      onClick={handleSubmit} 
      className="btn-submit" 
      variant="contained"
      color="primary"
      >
      Continuar
      </Button>
    </div>
    </div>
</div>
  );
}

const PixLoadingMessage = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 60 ? prev + '. ' : ''));
    }, 500); // muda a cada 0.5s

    return () => clearInterval(interval);
  }, []);

  return (
    <h4 className="text-center font-bold text-lg mt-4 ml-20">
      Aguardando pagamento {dots}
    </h4>
  );
} 

const PixForm = ({isMobile, name, email, value, pix_code, customer_id, setStep}) => {
  const retryCount = useRef(0);
  const baseDelay = 1000; // 1s
  const maxDelay = 60000; // 60s
  
  useEffect(() => {
    let isCancelled = false;

    const checkPayment = async () => {
      if (isCancelled) return;

      try {
        const response = await fetch(`${baseAPI_URL}/verify-payment/${customer_id}`);
        const data = await response.json();
        //console.log(data);

        if (data.status === 'confirmed') {
          //console.log("Payment confirmed!");
          const enroll_result = await enrollStudent(name, email, "pix", value, "Pix à vista");
          setStep('end');
          return; // para de tentar
        } else {
          //console.log("Still pending...");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
      }

      retryCount.current += 1;
      const nextDelay = Math.min(baseDelay * 2 ** retryCount.current, maxDelay);
      //console.log(`Next check in ${nextDelay / 1000}s`);

      setTimeout(checkPayment, nextDelay);
    };

    checkPayment();

    return () => {
      isCancelled = true;
    };
  }, [customer_id, setStep]);


  return (
    <div className="auth-container">
    <h2 align="center">Pagamento via Pix</h2>
    <p align="center">Faça o Pix no valor de <b>R$ {value.toFixed(2)}</b> para 1 ano de acesso ao curso Domínio Elétrico.</p>
    
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
    <PixLoadingMessage />
    <p align="center">
    O cadastro no curso é feito automaticamente após o pagamento.
    </p>
    <h3 className="urgente" align="left">Aviso: O código pix acima é válido por 30 minutos.</h3>
    <h4 
      align='center' 
      onClick={() => setStep('start')} 
      style={{ color: '#0000FF', textDecoration: 'underline', cursor: 'pointer' }}
    >
      Mudar forma de pagamento
    </h4>
    </div>
  )
}

const CepField = ({cep, setCep, endereco, setEndereco}) => {
  const handleCepChange = (e) => {
    const value = e.target.value;
    setCep(value);

    // Validação do CEP (ex: 5 números e um hífen)
    if (value.length === 9 && value.includes('-')) {
        buscarEndereco(value);
    } else if (value.length === 8 && !value.includes('-')){
        const formattedCep = `${value.slice(0, 5)}-${value.slice(5)}`;
        setCep(formattedCep);
        buscarEndereco(formattedCep);
    } else {
        //console.log(`Size of CEP still small (${value.length})`);
    }
  };

  const buscarEndereco = async (cep) => {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (!data.erro) {
      setEndereco({
        rua: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        estado: data.uf || '',
        numero: '',
      });
      //console.log(`Nome da rua: ${data.logradouro}`);
    } else {
      //console.log('CEP não encontrado');
    }
  };

  return (
    <div>
        <InputLabel sx={{ fontWeight: 900, color: 'black', mb: 1 }}>CEP e endereço</InputLabel>
        <div className="formfield">
            <TextField
                label="CEP"
                variant="outlined"
                value={cep}
                onChange={handleCepChange}
                fullWidth
                required
                inputProps={{ maxLength: 9 }} // Limita o tamanho do CEP
            />
        </div>
        {cep.length === 9 && (
            <>
                <div className="formfield">
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                     <TextField
                      label="Rua"
                      value={endereco.rua}
                      onChange={(e) =>
                          setEndereco((prev) => ({ ...prev, rua: e.target.value }))
                      }
                      fullWidth
                      />
                  </Grid>
                  <Grid item xs={4}>
                     <TextField
                      label="Número"
                      value={endereco.numero}
                      onChange={(e) =>
                          setEndereco((prev) => ({ ...prev, numero: e.target.value }))
                      }
                      fullWidth
                      />
                  </Grid>
                </Grid>
                </div>
                <div className="formfield">
                    <TextField
                    label="Complemento"
                    value={endereco.complemento}
                    onChange={(e) =>
                        setEndereco((prev) => ({ ...prev, complemento: e.target.value }))
                    }
                    fullWidth
                    />
                </div>
                <div className="formfield">
                    <TextField
                    label="Bairro"
                    value={endereco.bairro}
                    onChange={(e) =>
                        setEndereco((prev) => ({ ...prev, bairro: e.target.value }))
                    }
                    fullWidth
                    />
                </div>
                <div className="formfield">
                    <TextField
                    label="Cidade"
                    value={endereco.cidade}
                    onChange={(e) =>
                        setEndereco((prev) => ({ ...prev, cidade: e.target.value }))
                    }
                    fullWidth
                    />
                </div>
                <div className="formfield">
                    <TextField
                    label="Estado"
                    value={endereco.estado}
                    onChange={(e) =>
                        setEndereco((prev) => ({ ...prev, estado: e.target.value }))
                    }
                    fullWidth
                    />
                </div>
            </>
        )}
    </div>
  );
};

const AddressInfo = ({errors, cep, setCep, endereco, setEndereco, setStep, handleSubmit}) => {
  return (
    <div className="auth-container">
    <div className='contact_form'>
    <h3 align="center">Endereço</h3>
    <p>Para que o seu pagamento com cartão de crédito seja aprovado, informe o mesmo endereço cadastrado no banco emissor do seu cartão.</p>
    <div className="formfield">
      </div>
      <CepField 
      cep={cep}
      setCep={setCep}
      endereco={endereco}
      setEndereco={setEndereco}
      />
      <div className='formfield'>
      <p className='errormsg'>{errors}</p>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <h4 
            align='center' 
            onClick={() => setStep('start')} 
            style={{ color: '#0000FF', textDecoration: 'underline', cursor: 'pointer' }}
            >
                {'<< Voltar'}
            </h4>
          </div>
        </Grid>
        <Grid item xs={8}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
            onClick={handleSubmit} 
            className="btn-submit" 
            variant="contained"
            color="primary"
            >
            Prosseguir para o pagamento
            </Button>
          </div>
        </Grid>
      </Grid>
      </div>
    </div>
    </div>
  );
}

const EndForm = ({payStatus, name, email, password}) => {
  const statusMap = {
    PENDING: '⏳ Pendente',
    CONFIRMED: '✅ Confirmado',
  };
  return (
    <div className="auth-container">
    <div className='contact_form'>
      <h3 align="center">Parabéns pela sua inscrição no curso!</h3>
      <p style={{ fontWeight: 'bold', textAlign: 'center' }}>
        Status do pagamento: {statusMap[payStatus] || '❓ Desconhecido'}
      </p>
      <p>{name}, veja as informações para acessar o curso:</p>
      <ul>
        <li><b>Link:</b><a href="https://curso.dominioeletrico.com.br"> https://curso.dominioeletrico.com.br</a></li>
        <li><b>Usuário:</b> {email} </li>
        <li><b>Senha:</b> {password}</li>
      </ul>
      <p>Esses dados também foram enviados para o seu email.</p>
      <p><b>Sugestão:</b> adicione o site do curso aos favoritos do seu navegador para acessar mais facilmente.</p>
      <p><i>Bons estudos!</i></p>
    </div>
    </div>
  );
}

/**
 * Calculates the total amount to be paid with interest on installments.
 *
 * @param {number} price - The original price (without interest).
 * @param {number} installments - The number of installments.
 * @param {number} interestRate - The monthly interest rate (e.g., 0.02 for 2%).
 * @returns {number} The total amount to be paid.
 */
function calculateTotalWithInterest(price, installments, interestRate) {
  if (installments === 1 || interestRate === 0) {
    return price;
  }

  const installmentValue = price * interestRate / (1 - Math.pow(1 + interestRate, -installments));
  const total = installmentValue * installments;

  return parseFloat(total.toFixed(2));
}

function calculateInstallmentWithInterest(price, installments, interestRate) {
  if (installments === 1 || interestRate === 0) {
    const formattedPrice = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
    return formattedPrice;
  }

  const installmentValue = price * interestRate / (1 - Math.pow(1 + interestRate, -installments));
  const formatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(installmentValue);

  return formatted;
}

function installmentWithInterest(price, installments, interestRate) {
  if (installments === 1 || interestRate === 0) {
    return price;
  }

  const installmentValue = price * interestRate / (1 - Math.pow(1 + interestRate, -installments));
  return installmentValue;
}


const CardInfo = (
  {
    month,
    year,
    setMonth,
    setYear,
    card_cvv,
    setCard_CVV,
    card_name,
    setCard_name,
    card_number,
    setCard_number,
    n_inst,
    setN_inst,
    value,
    interestRate,
    errors,
    setStep,
    handleSubmit
  })  => {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);
  const inst_options = Array.from({ length: 12}, (_, i) => 
    {
      if (i===0) return `${i+1} parcela de ${calculateInstallmentWithInterest(value, i+1, interestRate)} (à vista)`
      else return `${i+1} parcelas de ${calculateInstallmentWithInterest(value, i+1, interestRate)}*`
    });
  return (
    <div className="auth-container">
    <div className='contact_form'>
    <h3 align="center">Dados do cartão de crédito:</h3>
    <p>Digite os dados tal como aparecem no seu cartão de crédito. Preste atenção, porque erros de digitação podem dificultar tentativas futuras.</p>
      <div className="formfield">
      <InputLabel sx={{ fontWeight: 900, color: 'black', mb: 1 }}>Nome impresso no cartão:</InputLabel>
      <TextField
          label="Nome impresso no cartão"
          variant="outlined"
          fullWidth
          value={card_name}
          onChange={(e) => setCard_name(e.target.value)}
          required
      />
      </div>
      <div className="formfield">
      <InputLabel sx={{ fontWeight: 900, color: 'black', mb: 1 }}>Número do cartão (16 dígitos):</InputLabel>
      <TextField
          label="Número do cartão"
          variant="outlined"
          fullWidth
          value={card_number}
          onChange={(e) => setCard_number(e.target.value)}
          required
      />
      </div>
      <div className="formfield">
      <InputLabel sx={{ fontWeight: 900, color: 'black', mb: 1 }}>Vencimento do cartão (MM/AA) e código de segurança (CVV)</InputLabel>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            select
            label="Mês"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            fullWidth
            required
          >
            {months.map((m, i) => (
              <MenuItem key={i} value={i + 1}>{m}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            select
            label="Ano"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            fullWidth
            required
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: 200, // altura máxima em pixels
                  },
                },
              },
            }}
          >
            {years.map((a) => (
              <MenuItem key={a} value={a}>{a}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
              label="CVV"
              variant="outlined"
              fullWidth
              value={card_cvv}
              onChange={(e) => setCard_CVV(e.target.value)}
              required
          />
        </Grid>
      </Grid>
      </div>
      <div className='formfield'>
      <InputLabel sx={{ fontWeight: 900, color: 'black', mb: 1 }}>Escolha o número de parcelas:</InputLabel>
          <TextField
            select
            label="Opções de parcelamento"
            value={n_inst}
            onChange={(e) => setN_inst(e.target.value)}
            fullWidth
            required
          >
            {inst_options.map((option, i) => (
              <MenuItem key={i} value={i + 1}>{option}</MenuItem>
            ))}
          </TextField>
      <InputLabel sx={{ fontWeight: 300, fontSize: 17, color: 'black', mb: 1 }}>*juros de {interestRate * 100}% ao mês</InputLabel>
      </div>
      <div className='formfield'>
      <p className='errormsg'>{errors}</p>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <h4 
            align='center' 
            onClick={() => setStep('addressinfo')} 
            style={{ color: '#0000FF', textDecoration: 'underline', cursor: 'pointer' }}
            >
                {'<< Voltar'}
            </h4>
          </div>
        </Grid>
        <Grid item xs={8}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
          onClick={handleSubmit} 
          className="btn-submit" 
          variant="contained"
          color="primary"
          >
          Finalizar pagamento
          </Button>
          </div>
        </Grid>
      </Grid>
      </div>
    </div>
    </div>
  );
}

async function enrollStudent(name, email, payment_method, value, payment_option) {
  const payload = {
    name: name,
    email: email,
    payment_method: payment_method,
    paid_amount: value,
    payment_option: payment_option
  };

  try {
    const response = await fetch(`${baseAPI_URL}/enroll-student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    //console.log("Enrollment response:", result);
    return result;
  } catch (error) {
    console.error("Error enrolling student:", error);
    //return result;
  }
}

const Checkout = ({ isMobile }) => {
  const [step, setStep] = useState('start'); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [day, setDay] = useState(31);
  const [month, setMonth] = useState(2);
  const [year, setYear] = useState(2000);
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState({
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
  });
  const [cpf, setCpf] = useState('');
  const [card_name, setCard_name] = useState('');
  const [card_number, setCard_number] = useState('');
  const [card_month, setCard_month] = useState(1);
  const [card_year, setCard_year] = useState(2025);
  const [card_cvv, setCard_CVV] = useState(2025);
  const [n_inst, setN_inst] = useState(1);
  const interestRate = 0.0239;
  const value = 400.0;
  // const value = 0.01;
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [errors, setErrors] = useState();
  const [payStatus, setPayStatus] = useState('PENDING');
  const [pix_code, setPix_code] = useState('');
  const [customer_id, setCustomerId] = useState('');

  const [password, setPassword] = useState('');
  //const pix_code = "00020126580014br.gov.bcb.pix0136c58843a5-5c59-45b1-aefd-f28ecd88b8d35204000053039865406400.005802BR5922N__Y__M__SUGIMOTO_LTDA6015Sao_Jose_dos_Ca610912235-05062240520CursoDominioEletrico6304E2F8";

  const validPhone = (phone) => {
    const regex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    return regex.test(phone);
  };

  const validCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove pontos e hífens
  
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
  
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;
  
    return true;
  };
  
  const validateStart = () => {
    let rvalue = true;
    let error_message = "Erros: ";
    setErrors('');
    if (!name.trim()) {
      error_message += "Nome é obrigatório; ";
      rvalue = false;
    }
    if (!email.includes('@')) {
      error_message += "e-mail inválido; ";
      rvalue = false;
    }
    if (!validPhone(phone)) {
      error_message += "celular inválido; ";
      rvalue = false;
    }
    if (!validCPF(cpf)) {
      error_message += "CPF inválido; ";
      rvalue = false;
    }
    if (rvalue) error_message = "";
    setErrors(error_message);
    //console.log(error_message);
    return rvalue;
  };

  const validateAddressinfo = () => {
    let rvalue = true;
    let error_message = "Erros: ";
    setErrors('');
    // Birthday is not needed
    /* if (day === 31 && month === 2) {
      error_message += "Data de nascimento inválida; ";
      rvalue = false;
    } */
    if (!cep.match(/^\d{5}-?\d{3}$/)) {
      error_message += "CEP inválido; ";
      rvalue = false;      
    }
    if (!endereco.rua.trim()) {
      error_message += "Rua inválida; ";
      rvalue = false; 
    }
    if (!endereco.numero.match(/^\d+$/)) {
      error_message += "Número inválido; ";
      rvalue = false; 
    }
    if (!endereco.bairro.trim()) {
      error_message += "Bairro inválido; ";
      rvalue = false; 
    }
    if (!endereco.cidade.trim()) {
      error_message += "Cidade inválida; ";
      rvalue = false; 
    }
    if (!endereco.estado.trim()) {
      error_message += "Estado inválido; ";
      rvalue = false; 
    }
    if (rvalue) error_message = "";
    setErrors(error_message);
    //console.log(error_message);
    return rvalue;
  };

  const validateCard = () => {
    let rvalue = true;
    let error_message = "Erros: ";
    setErrors('');
    if (!card_name.trim()) {
      error_message += "Nome do cartão inválido; ";
      rvalue = false;
    }
    if (!card_number.replace(/\s+/g, '').match(/^\d{16}$/)) {
      error_message += "Número de cartão inválido; ";
      rvalue = false;      
    }
    if (card_cvv.length !== 3) {
      error_message += "CVV inválido; ";
      rvalue = false; 
    }
    if (rvalue) error_message = "";
    setErrors(error_message);
    //console.log(error_message);
    return rvalue;
  };

  async function createCardCharge() {
    const inst_value = installmentWithInterest(value, n_inst, interestRate);
    const total_value = n_inst * inst_value;
    const payload = {
      name: name,
      cpfCnpj: cpf,
      email: email,
      phone: phone,
      value: total_value,
      n_inst: n_inst,
      inst_value: inst_value,
  
      cep: cep,
      address: endereco.rua,
      province: endereco.bairro,
      addressNumber: endereco.numero,
      addressComplement: endereco.complemento,
  
      holderName: card_name,
      cardNumber: card_number,
      expiryMonth: card_month,
      expiryYear: card_year,
      cvv: card_cvv 
    };

    try {
      const response = await fetch(`${baseAPI_URL}/create-card-charge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
  
      const result = await response.json();
      if (n_inst===1) {
        result.payment_option = `${n_inst} parcela de R$ ${inst_value.toFixed(2)} (à vista)`;
      }
      else {
        result.payment_option = `${n_inst} parcelas de R$ ${inst_value.toFixed(2)}, juros de ${interestRate * 100}% a.m.`;
      }
      //console.log("Charge response:", result);
      return result;
    } catch (error) {
      console.error("Error creating charge:", error);
      //return result;
    }
  }

  async function createPixCharge() {
    const payload = {
      name: name,
      cpfCnpj: cpf,
      email: email,
      phone: phone,
      value: value
    };

    try {
      const response = await fetch(`${baseAPI_URL}/create-pix-charge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
  
      const result = await response.json();
      setCustomerId(result.customer_id);
      //console.log("Charge response:", result);
      //console.log("Pix id:", result.pixid);
      return result;
    } catch (error) {
      console.error("Error creating charge:", error);
      //return result;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send form data to Formspree (replace with your Formspree endpoint)
    //await fetch('https://formspree.io/f/xpwpdvky', {
    //  method: 'POST',
    //  body: JSON.stringify({ name, email }),
    //  headers: {
    //    'Content-Type': 'application/json',
    //  },
    //});
    if (step === 'start') {
      if (validateStart()) {
        if (paymentMethod === 'credit_card') {
          setStep('addressinfo'); 
        } else {
          try {
            const result = await createPixCharge();
            //console.log("Charge result:", result);
            //console.log("Payment status:", result.status); // "CONFIRMED" ou outro
            setPix_code(result.payload);
            setPayStatus(result.status);
          } catch (error) {
            console.error("Error in charge:", error);
          }
          setStep('pix');
        }
      }
    } 
    else if (step === 'addressinfo') {
      if (validateAddressinfo()) setStep('card'); 
    } 
    else if (step === 'card') {
      if (validateCard()) {
        try {
          const result = await createCardCharge();
          setPayStatus(result.status);
          if (result.status === "CONFIRMED") {
            const payment_option = result.payment_option
            const enroll_result = await enrollStudent(name, email, "credit_card", value, payment_option);
            setPassword(enroll_result.password);
            setStep('end');
          }
          else {
            setErrors("O pagamento não foi aprovado. Verifique os dados do seu cartão ou entre em contato com o banco emissor do seu cartão.");
          }
        } catch (error) {
          console.error("Error in charge:", error);
        }
      } 
    }
  };

  return (
    <section id="form" className="section">
      <div className="checkout-container">
      {step === 'start' && (
        <StartForm
        name={name}
        email={email}
        phone={phone}
        cpf={cpf}
        setName={setName}
        setEmail={setEmail}
        setPhone={setPhone}
        setCpf={setCpf}
        errors={errors}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        value={value}
        handleSubmit={handleSubmit}
        />
      )}

      {step === 'pix' && (
        <PixForm
        isMobile={isMobile}
        name={name}
        email={email}
        value={value}
        pix_code={pix_code}
        setPix_code={setPix_code}
        customer_id={customer_id}
        setStep={setStep}
        />
      )}

      {step === 'addressinfo' && (
        <AddressInfo
        errors={errors}
        cep={cep}
        setCep={setCep}
        endereco={endereco}
        setEndereco={setEndereco}
        setStep={setStep}
        handleSubmit={handleSubmit}
        />
      )}

      {step === 'card' && (
        <CardInfo
        month={card_month}
        year={card_year}
        card_cvv={card_cvv}
        setMonth={setCard_month}
        setYear={setCard_year}
        setCard_CVV={setCard_CVV}
        card_name={card_name}
        setCard_name={setCard_name}
        card_number={card_number}
        setCard_number={setCard_number}
        n_inst={n_inst}
        setN_inst={setN_inst}
        value={value}
        interestRate={interestRate}
        errors={errors}
        setStep={setStep}
        handleSubmit={handleSubmit}
        />
      )}

      {step === 'end' && (
        <EndForm 
        payStatus={payStatus}
        name={name}
        email={email}
        password={password}
        />
        )}
      </div>
    </section>
  );
};

export default Checkout;