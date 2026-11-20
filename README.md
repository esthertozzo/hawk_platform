<h1 align="center">HAWK Control</h1>

<p align="center">
  <img
    width="64"
    height="64"
    alt="W da HAWK"
    src="https://github.com/user-attachments/assets/063d6078-ff89-41e1-9b15-cb69c19e2688"
  />
</p>


**A cidade que se adapta a você.**

Painel web do projeto HAWK, desenvolvido para a Global Solution 2026.2 do primeiro ano de Engenharia de Software da FIAP. A plataforma reúne a gestão de cruzamentos, o acompanhamento de ocorrências, a consulta de eventos e os relatórios operacionais da solução.

## A solução HAWK

O HAWK propõe uma travessia inteligente e acessível para pessoas com mobilidade reduzida. A ideia é adaptar o tempo de travessia à necessidade identificada, em vez de depender apenas de um intervalo fixo para todos os pedestres.

No protótipo HAWK Cross, um ESP32 controla a sinalização local, com LEDs, buzzer e display. A simulação no Wokwi utiliza um potenciômetro para representar a confiança de detecção e um botão para simular falhas. O projeto também prevê a participação da visão computacional na identificação de pedestres.

O HAWK Control é a interface administrativa dessa proposta. Ele consulta os dados disponíveis na API e permite organizar os cadastros e os registros de acompanhamento. **O painel não envia comandos aos semáforos: a lógica de proteção da travessia pertence ao dispositivo local.**

Trata-se de um protótipo acadêmico. As ilustrações não representam um mapa real nem comprovam operação em vias públicas.

## Repositórios e referências

| Recurso | Endereço |
| --- | --- |
| Plataforma web — este repositório | [HAWK-platform](https://github.com/HAWK-GS02/HAWK-platform) |
| Hardware e simulação Wokwi | [HAWK-cross](https://github.com/HAWK-GS02/HAWK-cross) |
| API em produção | [hawk-api-fsgy.onrender.com](https://hawk-api-fsgy.onrender.com) |
| Documentação interativa | [Swagger](https://hawk-api-fsgy.onrender.com/docs) |
| Verificação de disponibilidade | [Saúde da API](https://hawk-api-fsgy.onrender.com/saude) |
| Protótipo de interface | [HAWK Control no Figma](https://www.figma.com/design/BKYI8euvcSk9i6Lt68nC1K/HAWK-Control---Prot%C3%B3tipo-UX-UI?node-id=0-1) |
| Uso de inteligência artificial | [AI.md](./AI.md) |

## Funcionalidades e rotas

| Rota | Funcionalidades implementadas |
| --- | --- |
| `/` | Visão geral, total de cruzamentos, ocorrências abertas, prévia dos eventos recentes e mapa esquemático. |
| `/cruzamentos` | Cadastro, listagem, busca local por nome, bairro ou ID, filtro por status cadastral, edição e exclusão com confirmação. |
| `/cruzamentos/[id]` | Dados cadastrais, coordenadas, largura da via, consulta do último estado registrado e eventos recentes do cruzamento. |
| `/ocorrencias` | Cadastro vinculado a um cruzamento, filtros de prioridade e situação, seleção de registro, detalhe, edição, exclusão e alteração rápida de situação. |
| `/historico` | Listagem de eventos, filtros por cruzamento, tipo, origem, período e limite, além de seleção para consulta do contexto. |
| `/historico/[id]` | Consulta individual de evento, incluindo origem, estado, confiança, acionador, tempos e ocorrência associada, quando retornada pela API. |
| `/dashboard` | Totais operacionais, médias de tempo, percentual de extensões e tabela de métricas por cruzamento. |

As telas incluem estados de carregamento, erro e ausência de registros. A navegação e os componentes usam layouts responsivos.

### Regras importantes

- O cruzamento é escolhido no cadastro da ocorrência. Na edição, o vínculo original é preservado, conforme o contrato do PUT.
- As situações de ocorrência são `aberta`, `em_andamento` e `resolvida`. As prioridades são `baixa`, `media` e `alta`.
- Os atalhos de atendimento usam PATCH; a edição dos demais dados usa PUT.
- Os filtros de período interpretam o horário local do navegador e o convertem para ISO 8601 em UTC. As datas exibidas são formatadas para `America/Sao_Paulo`.
- A listagem de eventos aceita de 1 a 500 registros, com padrão de 50. O contrato fornecido não inclui cursor ou deslocamento; o limite não corresponde a uma paginação completa.
- Os relatórios são consolidados pela API e não recebem filtros de período. Seus totais não são calculados a partir da lista limitada do Histórico.
- O último estado registrado não comprova conectividade em tempo real. Status cadastral, comunicação e condição física do semáforo são informações distintas.

## Tecnologias

Versões declaradas no `package.json`:

| Tecnologia | Versão | Uso |
| --- | --- | --- |
| Next.js | 16.4.6 | App Router, rotas e estrutura da aplicação. |
| React / React DOM | 19.3.0 | Componentes, estados e custom hooks. |
| Tailwind CSS | 4.3.3 | Estilização, responsividade e variáveis de tema. |
| `@tailwindcss/turbopack` | 4.3.3 | Processamento do Tailwind com Turbopack. |
| ESLint | ^9 | Análise estática do código. |
| JavaScript / JSX | — | Implementação das telas e lógica do frontend. |
| Fetch API | — | Comunicação HTTP com a API do grupo. |
| SVG | — | Logo, favicon e ilustrações vetoriais. |

O frontend está escrito em JavaScript. Arquivos de tipos gerados pelo Next.js não representam uma migração da aplicação para TypeScript.

## Como executar em outra máquina

### Pré-requisitos

- Node.js **20.9.0 ou superior**, conforme o requisito da versão instalada do Next.js.
- npm e Git.
- Acesso à internet para instalar dependências e consultar a API hospedada.

### 1. Clonar o repositório

```bash
git clone https://github.com/HAWK-GS02/HAWK-platform.git
cd HAWK-platform
```

Execute os próximos comandos na raiz, onde está o `package.json`. Não é necessário criar outra pasta de projeto dentro dela.

### 2. Instalar as dependências

```bash
npm ci
```

O comando utiliza as versões registradas no `package-lock.json`.

### 3. Configurar o ambiente

Copie `.env.example` para `.env.local` ou crie `.env.local` manualmente na raiz:

```env
NEXT_PUBLIC_HAWK_API_URL=https://hawk-api-fsgy.onrender.com
```

No PowerShell:

```powershell
Copy-Item .env.example .env.local
```

No Linux/macOS:

```bash
cp .env.example .env.local
```

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `NEXT_PUBLIC_HAWK_API_URL` | Sim | URL base da API, sem barra final. |

O `.env.local` não é versionado e precisa ser configurado em cada máquina. O `.env.example` contém apenas um modelo público.

O prefixo `NEXT_PUBLIC_` torna o valor acessível ao navegador. Use-o para o endereço público da API, **nunca para `ADMIN_KEY`, credenciais do MongoDB ou outros segredos**. Essas credenciais pertencem ao backend e não são necessárias para configurar este frontend.

Após alterar o `.env.local`, reinicie o servidor. Para usar um backend local, ajuste a variável para o endereço em que ele estiver rodando, por exemplo `http://127.0.0.1:8000`.

### 4. Iniciar o desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) ou a porta indicada no terminal.

Não é necessário executar o hardware para testar o cadastro e a consulta dos dados já disponíveis na API. Novos eventos de dispositivo dependem da integração do emissor com o backend.

### Outros comandos

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento. |
| `npm run lint` | Análise estática com ESLint. |
| `npm run build` | Geração da versão de produção. |
| `npm start` | Execução da versão de produção, após um build bem-sucedido. |

## Estrutura e arquitetura

```text
app/                    Rotas do App Router, layout, tema global e favicon
components/
  layout/               AppShell, Sidebar e PageHeader
  ui/                   Panel e StatusBadge
  home/                 Mapa, indicadores, ocorrências abertas e eventos recentes
  crossings/            Formulário e tabela de cruzamentos
  occurrences/          Formulário, filtros, lista e detalhe de ocorrências
  events/               Filtros, período, lista e detalhe de eventos
  dashboard/            Cards e relatórios tabulares
hooks/                  Estado e lógica reutilizável das funcionalidades
services/               Cliente HTTP e funções dos endpoints
utils/                  Rótulos e formatação de datas e números
public/                 Logos e demais recursos estáticos
AI.md                   Registro transparente do uso de IA
.env.example            Modelo de configuração pública
```

O fluxo de dados principal é **página → custom hook → service → API**. Os resultados retornam aos hooks e são apresentados por componentes via props. A página coordena a seleção de registros e os callbacks das ações. Há também estado local de interface nas páginas e lógica de formulário no `CrossingForm`; a separação não significa que todo estado do projeto esteja exclusivamente nos hooks.

| Hook | Responsabilidade |
| --- | --- |
| `useCrossings` | Listagem e operações de CRUD dos cruzamentos. |
| `useCrossingDirectory` | Busca e filtro local do diretório. |
| `useCrossingDetails` | Cadastro, último estado e eventos de um cruzamento. |
| `useOccurrences` | Listagem, filtros, CRUD e mudança de situação. |
| `useOccurrenceForm` | Campos, validação e envio do formulário de ocorrência. |
| `useEvents` | Listagem de eventos, filtros e atualização manual. |
| `useEvent` | Consulta de um evento por ID. |
| `useEventPeriod` | Validação e conversão dos filtros de data. |
| `useDashboard` | Consulta paralela dos três relatórios, com erros por seção. |
| `useHomeOverview` | Composição dos dados da página inicial. |

As páginas dinâmicas que leem `useParams()` utilizam uma fronteira de `Suspense`, compatível com a configuração de Cache Components adotada no projeto.

## Integração com a API do grupo

O backend foi desenvolvido pelo grupo como serviço central do HAWK. A documentação fornecida pela equipe descreve uma API Python/FastAPI com persistência em MongoDB e hospedagem no Render. O código do backend e sua configuração pertencem ao repositório da API.

Neste frontend, `services/api.js` lê a URL do ambiente, executa as requisições com Fetch, trata respostas HTTP e propaga erros. Os services de domínio definem rotas, métodos e corpos JSON. O painel não acessa o MongoDB diretamente.

### Endpoints usados pelo frontend

| Módulo | Método e rota | Finalidade |
| --- | --- | --- |
| Cruzamentos | `GET /cruzamentos` | Listar cadastros. |
| Cruzamentos | `POST /cruzamentos` | Criar cadastro. |
| Cruzamentos | `GET /cruzamentos/{id}` | Consultar detalhe. |
| Cruzamentos | `PUT /cruzamentos/{id}` | Atualizar cadastro. |
| Cruzamentos | `DELETE /cruzamentos/{id}` | Excluir cadastro. |
| Estado | `GET /cruzamentos/{id}/estado-atual` | Consultar o último estado retornado pela API. |
| Ocorrências | `GET /ocorrencias` | Listar com filtros opcionais. |
| Ocorrências | `POST /ocorrencias` | Criar registro vinculado a um cruzamento. |
| Ocorrências | `PUT /ocorrencias/{id}` | Atualizar os campos editáveis. |
| Ocorrências | `DELETE /ocorrencias/{id}` | Excluir registro. |
| Ocorrências | `PATCH /ocorrencias/{id}/situacao` | Alterar a situação operacional. |
| Eventos | `GET /eventos` | Consultar histórico com filtros e limite. |
| Eventos | `GET /eventos/{id}` | Consultar evento individual. |
| Relatórios | `GET /relatorios/resumo` | Totais de travessias, extensões, falhas e ocorrências. |
| Relatórios | `GET /relatorios/tempos` | Médias de espera e travessia e percentual de extensões. |
| Relatórios | `GET /relatorios/por-cruzamento` | Indicadores agrupados por cruzamento. |

O service também oferece `getOccurrenceById`, correspondente a `GET /ocorrencias/{id}`. Atualmente, o painel lateral de ocorrência utiliza o registro já retornado pela listagem.

### Relação com o hardware

A arquitetura pretendida centraliza os eventos operacionais na API, para que diferentes consumidores consultem os mesmos registros. O contrato disponibiliza `POST /eventos` para emissores como ESP32, Wokwi, câmera ou simulação Python.

Na versão do HAWK Cross inspecionada durante o desenvolvimento, o firmware publica telemetria via MQTT/HiveMQ e um dashboard HTML recebe essas mensagens. **A ponte MQTT → API REST não foi implementada neste repositório e sua validação ponta a ponta ficou pendente nesta etapa.** O HAWK Control consulta a API REST; não assina diretamente os tópicos MQTT.

### CORS e publicação

Como as consultas são feitas pelo navegador, o backend precisa permitir a origem do frontend em sua configuração de CORS. Inclua o endereço local com a porta efetiva e, após a publicação, o domínio do painel.

Para publicar em um serviço compatível com Next.js, configure `NEXT_PUBLIC_HAWK_API_URL` no ambiente de build. Alterações nessa variável pública exigem uma nova compilação/publicação. Este README não pressupõe que o frontend já esteja publicado.

## Identidade visual

As cores estão centralizadas em `app/globals.css`, no bloco `@theme`. As referências `@source` indicam ao Tailwind onde encontrar as classes.

| Uso | Variável | Cor |
| --- | --- | --- |
| Fundo | `--color-hawk-background` | `#17191C` |
| Navegação | `--color-hawk-sidebar` | `#111315` |
| Superfície | `--color-hawk-surface` | `#1E2223` |
| Cards | `--color-hawk-card` | `#24292A` |
| Verde principal | `--color-hawk-green` | `#65C141` |
| Laranja de destaque | `--color-hawk-orange` | `#F28C28` |
| Texto principal | `--color-hawk-text` | `#F2F3ED` |
| Texto secundário | `--color-hawk-muted` | `#B9C0BA` |
| Bordas | `--color-hawk-border` | `#343A40` |

Exemplos de classes: `bg-hawk-background`, `text-hawk-green`, `text-hawk-orange` e `border-hawk-border`.

A logo completa está em `public/hawk-logo.svg`; o símbolo W está em `public/hawk-w.svg` e é usado como ícone da aba por `app/icon.svg`. O mapa e a travessia são desenhos SVG no componente `CrossingsMap`, com identificação de seu caráter ilustrativo.

## Validação e limites atuais

Durante as etapas guiadas, a desenvolvedora relatou o funcionamento do CRUD de cruzamentos e a execução bem-sucedida das etapas seguintes de ocorrências, eventos e filtros. Também houve checagem de sintaxe JSX, validação dos SVGs e uma verificação do CSS servido confirmando as classes de cores e responsividade.

Após a estilização conjunta das telas, o build de produção e a revisão visual automática não foram concluídos na sessão de assistência. Portanto, este documento não declara aprovação de build, cobertura automatizada ou homologação ponta a ponta. O `package.json` não define um script `test`.

Antes de uma entrega, execute os comandos de lint e build e confira manualmente:

1. Cadastro, edição e exclusão de um cruzamento de teste.
2. Cadastro de ocorrência vinculada, edição sem troca de cruzamento e mudança de situação.
3. Filtros do Histórico, incluindo intervalo inválido e limpeza de filtros.
4. Abertura e recarga direta das rotas de detalhe.
5. Correspondência dos indicadores com as respostas dos relatórios no Swagger.
6. Navegação por teclado e apresentação em celular e computador.

Use registros de teste: as ações de cadastro, edição e exclusão alteram a base compartilhada da API.

Limites funcionais conhecidos:

- As consultas são executadas ao carregar as telas, mudar filtros ou solicitar atualização. Não há atualização contínua por WebSocket ou polling implementada.
- Os indicadores de comunicação sem fonte de dados permanecem como não informados; o mapa não determina disponibilidade real.
- Não há fluxo de autenticação de usuários implementado neste frontend.
- A integração hardware → API → painel ainda precisa de validação conjunta.

## Problemas comuns

| Sintoma | Verificação |
| --- | --- |
| “A URL da API HAWK não foi configurada” | Crie `.env.local` na raiz e reinicie o servidor. |
| Falha de rede na consulta | Confira a URL, a disponibilidade da API em `/saude` e o CORS. A retomada de um serviço hospedado após inatividade pode levar algum tempo. |
| HTTP 422 | Confira campos, enums, intervalo de datas e formato dos identificadores no Swagger. |
| HTTP 404 em um registro | Verifique se o ID existe e se não foi excluído por outro integrante. |
| Cores novas não aparecem | Confira os `@source` no CSS e faça uma atualização completa do navegador. |
| Ícone antigo na aba | Feche e abra a aba novamente para renovar o cache do favicon. |

A pasta `.next` é gerada pelo Next.js e não deve ser versionada. `node_modules` também é gerada localmente. Esses diretórios não substituem os arquivos-fonte do projeto.

## Equipe HAWK

| Integrante | RM |
| --- | --- |
| Esther dos Santos de Almeida Tozzo | 570860 |
| Felipe de Oliveira Zimmermann | 570863 |
| Izabela Pordeus de Almeida | 570316 |
| João Victor Santos Souza | 569949 |
| Matheus Lopes Lima | 571458 |

O desenvolvimento web descrito neste repositório foi conduzido por Esther, com integração à API desenvolvida pelo grupo e apoio de IA documentado em [AI.md](./AI.md).
