import base64

def generate_offer_code(expiration_date):
    # Converte a data de expiração em bytes e codifica em Base64
    offer_code = base64.urlsafe_b64encode(expiration_date.encode()).decode()
    return offer_code

# Exemplo de uso:
expiration_date = "2024-08-16T09:00:00"
offer_code = generate_offer_code(expiration_date)
print(offer_code)  # Esse será o código da oferta que você envia para o front-end

def decode_offer_code(offer_code):
    # Decodifica a string Base64
    decoded_bytes = base64.urlsafe_b64decode(offer_code)
    # Converte os bytes decodificados de volta para string
    decoded_str = decoded_bytes.decode('utf-8')
    return decoded_str

# Exemplo de uso:
#offer_code = "MjAyNC0wOC0xNVQxMjowMDowMA=="  # Este é o código Base64 gerado anteriormente
#decoded_str = decode_offer_code(offer_code)
#print(decoded_str)  # Deve imprimir a data de expiração original, por exemplo, "2024-08-15T12:00:00"
