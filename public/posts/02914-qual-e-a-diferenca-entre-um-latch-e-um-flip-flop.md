---
title: Qual é a diferença entre um Latch e um Flip-flop?
date: "2024-09-14"
description: Entenda as diferenças fundamentais entre Latch e Flip-flop em circuitos digitais.
keywords: ['Latch', 'Flip-flop', 'Circuitos Digitais', 'Porta Lógica', 'Booleana']
---

### Qual é a diferença entre um Latch e um Flip-flop?

No contexto dos circuitos digitais, tanto Latch quanto Flip-flop são dispositivos de armazenamento de dados, mas eles possuem diferenças fundamentais em seu funcionamento e aplicação.

Um **Latch** é um dispositivo de armazenamento que é sensível ao nível do sinal de controle. Isso significa que ele pode mudar seu estado sempre que o sinal de controle (geralmente chamado de "enable" ou "gate") estiver ativo. Enquanto o sinal de controle estiver ativo, o Latch seguirá a entrada. Quando o sinal de controle é desativado, o Latch mantém o último estado da entrada.

Por outro lado, um **Flip-flop** é um dispositivo de armazenamento que é sensível à borda do sinal de controle, ou seja, ele muda seu estado apenas em uma transição específica do sinal de controle (por exemplo, na borda de subida ou descida de um clock). Isso torna os Flip-flops mais adequados para aplicações onde a sincronização precisa com um sinal de clock é crucial, como em registradores e contadores.

Em resumo, a principal diferença entre Latch e Flip-flop é a forma como eles respondem ao sinal de controle: Latches são sensíveis ao nível do sinal, enquanto Flip-flops são sensíveis à borda do sinal.

Se você gostou deste conteúdo, conheça o curso online de circuitos elétricos para alunos de engenharia, Domínio Elétrico, criado pelo Prof. Nicholas Yukio, clicando no botão presente logo abaixo do texto.