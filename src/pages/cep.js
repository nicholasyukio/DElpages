import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

const CepField = (cep, setCep, endereco, setEndereco) => {
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
        console.log(`Size of CEP still small (${value.length})`);
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
      });
      console.log(`Nome da rua: ${data.logradouro}`);
    } else {
      console.log('CEP não encontrado');
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
                    <TextField
                    label="Rua"
                    value={endereco.rua}
                    onChange={(e) =>
                        setEndereco((prev) => ({ ...prev, rua: e.target.value }))
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

export default CepField;