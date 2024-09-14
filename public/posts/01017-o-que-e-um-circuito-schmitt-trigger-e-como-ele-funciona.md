---
title: O que é um circuito Schmitt Trigger e como ele funciona?
date: "2024-09-13"
description: Entenda o conceito e funcionamento de um circuito Schmitt Trigger no contexto de circuitos analógicos.
keywords: ['Schmitt', 'amp-op', 'biestável', 'Pequeno', 'Bode', 'BJT', 'Detalhe']
---

## O que é um circuito Schmitt Trigger e como ele funciona?

Um circuito Schmitt Trigger é um tipo de comparador que utiliza realimentação positiva para criar histerese, o que significa que ele possui dois níveis de limiar diferentes para a transição de saída. Este comportamento é útil para eliminar ruídos e flutuações em sinais de entrada, garantindo uma saída estável e limpa.

O Schmitt Trigger pode ser implementado usando amplificadores operacionais (amp-op) ou transistores bipolares de junção (BJT). Quando a tensão de entrada ultrapassa um certo limiar superior, a saída do circuito muda de estado, e só retorna ao estado original quando a tensão de entrada cai abaixo de um limiar inferior. Este comportamento biestável é o que caracteriza o Schmitt Trigger.

A histerese introduzida pelo Schmitt Trigger é essencial em aplicações onde sinais de entrada ruidosos ou instáveis podem causar múltiplas transições indesejadas na saída. Por exemplo, em circuitos de temporização e em conversores analógico-digitais, o Schmitt Trigger garante que a saída mude de estado apenas quando a entrada ultrapassa claramente os limiares definidos.

Se você gostou deste conteúdo, conheça o curso online de circuitos elétricos para alunos de engenharia, Domínio Elétrico, criado pelo Prof. Nicholas Yukio, clicando no botão presente logo abaixo do texto.