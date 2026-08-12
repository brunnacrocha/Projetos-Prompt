# Especificação do Jogo de Memória Visual

## Visão

Jogo online de memória visual baseado na mecânica **memorizar → esconder → localizar**.

O jogador observa um tabuleiro de elementos durante um período configurável e, depois que os elementos são ocultados, precisa indicar onde cada elemento estava.

## MVP

### Tempo de memorização

- 1 minuto
- 3 minutos
- 5 minutos

No MVP, o tempo selecionado representa exclusivamente o período disponível para memorizar o tabuleiro. A etapa de perguntas começa após o término da memorização.

### Dificuldade

| Nível | Tabuleiro | Cards |
|---|---:|---:|
| Fácil | 3×3 | 9 |
| Médio | 4×4 | 16 |
| Difícil | 5×5 | 25 |
| Expert | 6×6 | 36 |

### Perguntas

O modo inicial será baseado em localização de objeto:

> Onde estava o 🐶?

O jogador seleciona uma posição no tabuleiro oculto.

### Pontuação

A pontuação deverá considerar:

- acertos;
- erros;
- sequência de acertos;
- nível de dificuldade;
- tempo de resposta.

A fórmula poderá ser refinada após testes do MVP.

## Fora do MVP

- login e cadastro;
- histórico persistente;
- ranking global;
- partidas multiplayer;
- desafios entre jogadores.

## Evolução planejada

```text
MVP
 ↓
Interface refinada
 ↓
Sistema de dificuldade
 ↓
Pontuação
 ↓
Persistência
 ↓
Usuários
 ↓
Ranking
 ↓
Multiplayer
```

## Arquitetura alvo

### MVP

O MVP deve permanecer simples e executável localmente, sem backend ou banco de dados, para validar a mecânica e a experiência do jogo.

### Evolução

```text
Frontend: React + TypeScript + Vite
Backend:  Python + FastAPI
Banco:    PostgreSQL
Futuro:   Redis para sessões/multiplayer, se necessário
```

## Princípios

1. Priorizar a diversão e clareza da mecânica antes de adicionar infraestrutura.
2. Manter cada etapa pequena e revisável.
3. Registrar a evolução do projeto no repositório.
4. Evitar dependências e complexidade desnecessárias no MVP.
