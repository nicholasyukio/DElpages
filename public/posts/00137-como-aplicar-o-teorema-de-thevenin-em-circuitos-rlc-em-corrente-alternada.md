---
title: Como aplicar o Teorema de Thévenin em circuitos RLC em corrente alternada?
date: "2024-08-09"
description: Explicação sobre a aplicação do Teorema de Thévenin em circuitos RLC em corrente alternada.
keywords: ['Nodal', 'Máxima', 'RLC', 'Thévenin', 'Corrente', 'Complexo', 'Básico']
---

## Como aplicar o Teorema de Thévenin em circuitos RLC em corrente alternada?

O Teorema de Thévenin é uma ferramenta poderosa para simplificar circuitos complexos, permitindo que um circuito linear seja reduzido a uma fonte de tensão equivalente em série com uma impedância equivalente. Em circuitos de corrente alternada (CA), especialmente aqueles que contêm resistores (R), indutores (L) e capacitores (C), a aplicação do Teorema de Thévenin segue princípios semelhantes aos dos circuitos de corrente contínua (CC), mas com algumas considerações adicionais.

Primeiramente, é importante lembrar que em circuitos CA, as impedâncias dos componentes são representadas por números complexos. A impedância de um resistor é simplesmente seu valor de resistência, enquanto a impedância de um indutor e de um capacitor depende da frequência da corrente alternada. Para aplicar o Teorema de Thévenin, você deve:

1. **Identificar a parte do circuito que será substituída pelo equivalente de Thévenin**: Isso geralmente envolve remover a carga do circuito.
2. **Calcular a tensão de Thévenin (Vth)**: Isso é feito encontrando a tensão nos terminais abertos onde a carga foi removida.
3. **Calcular a impedância de Thévenin (Zth)**: Para isso, todas as fontes independentes de tensão e corrente são desativadas (fontes de tensão são substituídas por curtos-circuitos e fontes de corrente por circuitos abertos). Em seguida, calcula-se a impedância vista dos terminais abertos.

Ao final, o circuito original pode ser substituído por uma fonte de tensão Vth em série com uma impedância Zth, simplificando a análise do circuito, especialmente quando se trata de determinar a resposta da carga.

Se você gostou deste conteúdo, conheça o curso online de circuitos elétricos para alunos de engenharia, Domínio Elétrico, criado pelo Prof. Nicholas Yukio, clicando no botão presente logo abaixo do texto.