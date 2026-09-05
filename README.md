# controleDeInsumos

Projeto de controle e gestão de adubo/insumo — desenvolvido para o **Desafio 2 (IDR / Hackyara)**: cruzar a análise de solo do produtor com o padrão nutricional dos dejetos bovinos para indicar a dosagem correta de adubo orgânico, sem contaminar a terra.

## Dose Certa de Dejetos

`index.html` é uma calculadora single-file (HTML + CSS + JS, sem build, sem dependências) que:

- cruza o laudo de solo (fósforo, textura/argila) com a cultura e a declividade do talhão para calcular a dose recomendada de dejeto bovino (líquido, sólido ou cama), já descontando o ajuste por declividade;
- mostra alertas de risco: fósforo em nível crítico ("muito alto"), proximidade de curso d'água, laudo de solo vencido;
- sugere quando aplicar (janela antes do plantio, evitar chuva nas 48h seguintes, prazo de reteste do solo);
- mantém um histórico de registros salvos (por talhão/período) e um dashboard comparativo — gráficos de fósforo do solo (% do limite crítico da textura) e de dose recomendada — entre os registros selecionados.

### Como abrir

Basta abrir `index.html` em qualquer navegador — não precisa de servidor nem instalação.

### Persistência dos registros

A página escolhe onde salvar os registros nesta ordem, na primeira que funcionar:

1. **API própria (`backend/`, Node/Express + MongoDB)** — se você configurar a URL da API no campo "URL da API própria" (na seção "Histórico de registros"), os registros ficam num banco MongoDB de verdade, compartilhado entre qualquer pessoa que acesse com a mesma URL configurada.
2. **Banco embutido do Claude Artifacts** — quando a página é publicada como Artifact (claude.ai), sem precisar configurar nada.
3. **`localStorage` do navegador** — se nenhuma das opções acima estiver disponível (por exemplo, abrindo o `index.html` direto do GitHub/local sem configurar a API), os registros ficam salvos só naquele navegador/computador.

A linha de status logo abaixo do botão "Salvar registro atual" sempre diz qual dessas três opções está ativa.

### Backend (API + MongoDB)

O código do backend fica em `backend/` — uma API Node/Express pequena, com Mongoose, para persistir os registros num MongoDB de verdade (por exemplo, um cluster gratuito do [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)).

```bash
cd backend
npm install
cp .env.example .env     # edite o .env com a sua connection string do MongoDB
npm start                # sobe em http://localhost:3001
```

Endpoints:

| Método | Rota                 | O que faz                          |
|--------|----------------------|-------------------------------------|
| GET    | `/api/health`         | checagem simples (e se o Mongo está conectado) |
| GET    | `/api/registros`      | lista os registros, mais recentes primeiro |
| POST   | `/api/registros`      | cria um registro (`label`, `savedAt`, `input`, `result`) |
| DELETE | `/api/registros/:id`  | exclui um registro |

Depois de rodar a API (local ou hospedada em algum serviço gratuito como Render, Railway ou Fly.io), abra o `index.html`, cole a URL da API no campo "URL da API própria" e clique em "Conectar" — a partir daí o app passa a ler e gravar direto no MongoDB.

### Aviso

Os valores de referência (faixas de fósforo por textura de solo, teores padrão de P₂O₅ do dejeto, doses por cultura) são médias agronômicas usadas como protótipo — ajuste com os dados reais do laudo e a orientação de um engenheiro agrônomo antes de aplicar em campo.
