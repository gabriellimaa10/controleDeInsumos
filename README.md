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

A página tenta usar o banco de dados embutido do Claude Artifacts (quando publicada como Artifact) para compartilhar registros entre quem acessa a página. Se essa camada não estiver disponível (por exemplo, ao abrir o arquivo direto do GitHub/local), ela cai automaticamente para `localStorage` do navegador — os registros ficam salvos só naquele navegador/computador.

### Aviso

Os valores de referência (faixas de fósforo por textura de solo, teores padrão de P₂O₅ do dejeto, doses por cultura) são médias agronômicas usadas como protótipo — ajuste com os dados reais do laudo e a orientação de um engenheiro agrônomo antes de aplicar em campo.
