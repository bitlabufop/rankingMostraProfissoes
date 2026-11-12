# Requisitos — Ranking da Mostra de Profissões 2026

## 1. Visão geral

Aplicação web pública para a Mostra de Profissões 2026 — Engenharia Elétrica. O sistema apresenta os resultados dos participantes nas atividades do evento e permite acompanhar a classificação de cada modalidade.

O site será hospedado gratuitamente no GitHub Pages. Os colaboradores atualizam os resultados em uma planilha do Google, que será a fonte de dados da aplicação. O site consulta e apresenta os dados, sem permitir sua edição.

## 2. Objetivos

- Incentivar alunos do 2º e 3º ano do ensino médio a participar das atividades.
- Tornar as regras e classificações fáceis de entender.
- Exibir os resultados atualizados de cada modalidade.
- Facilitar a inclusão de novas atividades com critérios de pontuação diferentes.
- Explicar como será definido o vencedor e como resgatar o prêmio: soldar e levar a própria placa.

## 3. Escopo do MVP

- Dashboard com informações, instruções e avisos do evento.
- Navegação entre modalidades, por abas ou cartões, como Eletroway e garra robótica/gincana.
- Classificação individual por modalidade.
- Consulta periódica dos dados da planilha e opção de atualizar manualmente.
- Layout responsivo para celular e computador.
- Publicação como site estático no GitHub Pages.

Outras informações:
- cadastro de participantes é feito na planilha, pelos colaboradores.

## 4. Requisitos funcionais

### RF-01 — Dashboard

Exibir nome, descrição e informações práticas do evento, além de slogans, instruções e avisos. Os textos que podem mudar durante o evento devem ser configuráveis na planilha, sem alteração de código. Ainda não está bem definido e terá mais forma quando ficar pronto.

### RF-02 — Modalidades

Exibir as modalidades ativas com nome, descrição e instruções. A navegação deve permitir alternar entre elas de forma simples.

### RF-03 — Classificação

Para cada modalidade, exibir posição, nome ou identificador público do participante e resultado. Mostrar a regra de ordenação — por exemplo, maior pontuação ou menor tempo.

### RF-04 — Pontuação configurável

Cada modalidade deve poder definir seu tipo de resultado, unidade e ordenação sem exigir uma tela exclusiva. Exemplos: pontos (maior é melhor) e tempo (menor é melhor).

### RF-05 — Atualização dos resultados

Buscar os dados automaticamente em intervalo configurável e oferecer atualização manual. Mostrar a hora da última atualização. Se houver falha, apresentar uma mensagem clara e, se possível, manter os últimos dados carregados.

### RF-06 — Vencedor e prêmio

Apresentar a regra de premiação, horário de encerramento e instruções para resgate quando forem definidos. Vencedor é por modalidade.

## 5. Organização sugerida da planilha

- **Evento:** título, data, local, textos, avisos e configurações gerais.
- **Modalidades:** identificador estável, nome, descrição, tipo e unidade do resultado, regra de ordenação, ordem de exibição e estado ativo.
- **Resultados:** identificador da modalidade, nome ou identificador público do participante e resultado.

Os cabeçalhos e formatos devem ser documentados e mantidos consistentes. Publicar somente os dados necessários ao ranking; preferir apelido ou código público e não incluir contatos ou outras informações pessoais. Quero poder incluir a escola e a cidade do participante.

## 6. Requisitos não funcionais

- Hospedagem e execução sem custo no GitHub Pages, sem servidor próprio.
- Interface em português, responsiva, legível e utilizável por teclado.
- Apresentar estados de carregamento, lista vazia e erro.
- Não incluir credenciais ou segredos no código publicado; a fonte de dados deve ser somente de leitura pública.
- O site deve lidar com modalidades sem resultados sem apresentar erro ao participante.

## 7. Direção visual

Usar uma linguagem energética, inspirada em interfaces de jogos e competições, adequada ao público jovem. Evitar copiar a identidade ou telas de um jogo específico, mas conversar com o tema de jogos. Priorizar leitura rápida, com títulos marcantes, cores de destaque e posições bem visíveis.

## 8. Critérios de aceite

1. O site abre por um link público e funciona em celulares e computadores.
2. O dashboard, as modalidades e os resultados são exibidos a partir dos dados configurados.
3. Cada classificação respeita o critério e a ordem definidos para sua modalidade.
4. A tela informa a última atualização e comunica falhas de carregamento de forma compreensível.
5. Uma modalidade nova que siga o formato documentado pode ser adicionada sem criar uma página exclusiva.
6. As regras de premiação e desempate ficam visíveis após serem definidas.

## 9. Decisões

- O prêmio será para o primeiro colocado de cada modalidade.
- O participante aparecerá por nome/apelido e escola.
- A planilhia será disponibilizada para leitura pública e a página faz a consulta.
- Serão várias modalidades com variação de critério de cada uma. A ferramenta deve pegar isso de forma automática. Me ajude a definir isso melhor.
- Empates: desempate com mais uma tentativa.
- A planilha deve ter validação de dados para reduzir erros de preenchimento.
- Exibir o horário da última atualização bem-sucedida e oferecer um botão de atualização manual.
- Para reduzir consultas, carregar os dados de todas as modalidades juntos, em vez de fazer uma consulta por modalidade.
- Se a página estiver em segundo plano, suspender ou reduzir as consultas. Em caso de falha, manter os últimos dados carregados e informar que eles podem estar desatualizados.

