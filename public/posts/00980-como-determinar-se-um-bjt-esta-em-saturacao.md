---
title: Como Determinar se um BJT Está em Saturação?
date: "2024-08-21"
description: Entenda como identificar se um transistor bipolar de junção (BJT) está em saturação em um circuito elétrico.
keywords: ['saturado', 'fonte', 'corrente', 'tensão', 'BJT', 'diodo', 'Thévenin']
---

## Como Determinar se um BJT Está em Saturação?

Para determinar se um transistor bipolar de junção (BJT) está em saturação, é importante entender o comportamento do dispositivo em diferentes regiões de operação. Um BJT entra em saturação quando tanto a junção base-emissor quanto a junção base-coletor estão polarizadas diretamente. Isso significa que a tensão base-coletor é menor que a tensão base-emissor.

Na prática, um BJT em saturação apresenta uma queda de tensão muito pequena entre o coletor e o emissor, tipicamente em torno de 0,2V a 0,3V. Para verificar se o BJT está em saturação, você pode medir a tensão entre o coletor e o emissor (V_CE). Se essa tensão for baixa, o transistor está saturado.

Outra abordagem é analisar o circuito usando o teorema de Thévenin para simplificar a rede de polarização da base. Ao calcular a corrente de base e a corrente de coletor, você pode verificar se a corrente de base é suficiente para manter o transistor na região de saturação. Em geral, a corrente de base deve ser maior que a corrente de coletor dividida pelo ganho de corrente do transistor (h_FE).

Se você gostou deste conteúdo, conheça o curso online de circuitos elétricos para alunos de engenharia, Domínio Elétrico, criado pelo Prof. Nicholas Yukio, clicando no botão presente logo abaixo do texto.