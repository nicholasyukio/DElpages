---
title: Como converter uma função Booleana em um circuito CMOS?
date: "2024-08-21"
description: Entenda o processo de conversão de uma função Booleana em um circuito CMOS.
keywords: [Mapa, número, função, Booleana, vice-versa, CMOS, Circuito]
---

## Como converter uma função Booleana em um circuito CMOS?

A conversão de uma função Booleana em um circuito CMOS é um processo fundamental no design de circuitos digitais. Primeiramente, é necessário simplificar a função Booleana utilizando métodos como o Mapa de Karnaugh, que ajuda a minimizar o número de termos e, consequentemente, a complexidade do circuito.

Uma vez que a função Booleana está simplificada, o próximo passo é desenhar o circuito CMOS. Um circuito CMOS é composto por transistores PMOS e NMOS. A função Booleana simplificada é dividida em duas partes: a rede pull-up, que é composta por transistores PMOS, e a rede pull-down, composta por transistores NMOS. A rede pull-up é responsável por conectar a saída ao VDD (nível lógico alto) quando a função Booleana é verdadeira, enquanto a rede pull-down conecta a saída ao GND (nível lógico baixo) quando a função Booleana é falsa.

Para cada termo da função Booleana, os transistores PMOS são conectados em paralelo para termos OR e em série para termos AND. O mesmo se aplica aos transistores NMOS, mas de forma inversa: em série para termos OR e em paralelo para termos AND. Este arranjo garante que a saída do circuito CMOS corresponda à função Booleana desejada.

Se você gostou deste conteúdo, conheça o curso online de circuitos elétricos para alunos de engenharia, Domínio Elétrico, criado pelo Prof. Nicholas Yukio, clicando no botão presente logo abaixo do texto.