---
title: Como verificar a validade do Teorema de Thévenin em um circuito com fontes dependentes?
date: "2024-09-14"
description: Explicação sobre a verificação do Teorema de Thévenin em circuitos com fontes dependentes.
keywords: ['Verificação', 'Thévenin', 'Fonte', 'Teorema', 'simulação', 'Supermalha']
---

## Como verificar a validade do Teorema de Thévenin em um circuito com fontes dependentes?

O Teorema de Thévenin é uma ferramenta poderosa na análise de circuitos elétricos, permitindo simplificar circuitos complexos em uma única fonte de tensão e resistência. No entanto, a aplicação deste teorema em circuitos que contêm fontes dependentes pode gerar dúvidas. 

Para verificar a validade do Teorema de Thévenin em um circuito com fontes dependentes, é essencial entender que as fontes dependentes não podem ser simplesmente "desligadas" como as fontes independentes. Em vez disso, a análise deve considerar a relação de dependência entre as fontes e os elementos do circuito.

Primeiro, identifique a parte do circuito que será substituída pelo equivalente de Thévenin. Em seguida, determine a tensão de circuito aberto (Voc) e a resistência de Thévenin (Rth). Para encontrar Voc, remova a carga e calcule a tensão nos terminais abertos. Para Rth, desative todas as fontes independentes (substituindo fontes de tensão por curtos-circuitos e fontes de corrente por circuitos abertos) e calcule a resistência vista dos terminais. As fontes dependentes devem permanecer ativas durante este processo, pois sua operação depende das variáveis do circuito.

Se você gostou deste conteúdo, conheça o curso online de circuitos elétricos para alunos de engenharia, Domínio Elétrico, criado pelo Prof. Nicholas Yukio, clicando no botão presente logo abaixo do texto.