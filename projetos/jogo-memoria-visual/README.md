# 🧠 Jogo de Memória Visual

MVP de um jogo online de memória visual. O jogador escolhe um tempo de memorização, observa um tabuleiro com elementos e, depois que os elementos são ocultados, precisa indicar onde cada item estava.

## 🎯 Objetivo

Treinar memória visual por meio de partidas rápidas e mensuráveis.

## 🕹️ Regras do MVP

1. Escolha o tempo de memorização: 1, 3 ou 5 minutos.
2. O tabuleiro é gerado aleatoriamente.
3. Durante a fase **Memorize**, os elementos ficam visíveis.
4. Ao terminar o tempo, o tabuleiro é ocultado.
5. Um item-alvo é apresentado por vez.
6. O jogador seleciona a posição em que acredita que o item estava.
7. O jogo informa acerto ou erro e calcula a pontuação final.

> Para facilitar testes e demonstração, o cronômetro também pode ser acelerado por um multiplicador configurado no código.

## 🧱 Estrutura

```text
jogo-memoria-visual/
├── README.md
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── app.js
└── docs/
    └── roadmap.md
```

## ▶️ Executar

O MVP não possui dependências externas. Basta abrir `frontend/index.html` no navegador. Para uma experiência mais próxima de produção, use um servidor HTTP local, por exemplo:

```bash
python -m http.server 8000 --directory frontend
```

Depois acesse `http://localhost:8000`.

## 🚀 Próximos passos

- níveis de dificuldade;
- banco de perguntas e elementos;
- ranking;
- autenticação;
- persistência de partidas;
- backend/API;
- multiplayer em tempo real;
- métricas de desempenho;
- publicação do jogo.
