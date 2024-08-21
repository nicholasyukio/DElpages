---
title: "Como funciona o Teorema da Superposição em circuitos elétricos?"
date: "2024-08-21"
description: "Entenda o conceito e a aplicação do Teorema da Superposição na análise de circuitos elétricos."
keywords: ['Corrente', 'Superposição', 'Equivalente', 'Norton', 'Nodal', 'LTSpice', 'Malha']
---

## Como funciona o Teorema da Superposição em circuitos elétricos?

O Teorema da Superposição é uma ferramenta poderosa na análise de circuitos elétricos, especialmente quando lidamos com circuitos lineares que possuem múltiplas fontes de tensão ou corrente. Este teorema afirma que a resposta em qualquer elemento de um circuito linear, devido a várias fontes independentes, é a soma das respostas causadas por cada fonte atuando sozinha, enquanto todas as outras fontes são substituídas por suas impedâncias internas.

Para aplicar o Teorema da Superposição, siga estes passos:

1. **Isolar cada fonte**: Considere uma fonte de cada vez, substituindo todas as outras fontes de tensão por um curto-circuito (0V) e todas as fontes de corrente por um circuito aberto (0A).
2. **Analisar o circuito**: Calcule a corrente ou tensão desejada com apenas a fonte ativa.
3. **Repetir para todas as fontes**: Repita o processo para cada fonte independente no circuito.
4. **Somar os resultados**: A resposta final é a soma algébrica das respostas individuais obtidas para cada fonte.

Este método é particularmente útil em circuitos complexos, onde métodos diretos de análise, como as leis de Kirchhoff, podem ser complicados e demorados. A superposição simplifica a análise, permitindo que se trate cada fonte separadamente.

Se você gostou deste conteúdo, conheça o curso online de circuitos elétricos para alunos de engenharia, Domínio Elétrico, criado pelo Prof. Nicholas Yukio, clicando no botão presente logo abaixo do texto.