# Uso de Inteligência Artificial — HAWK Control

## 1. Ferramentas utilizadas

- **ChatGPT:** orientações sobre React, integração com a API, organização do código e documentação.
- **Codex:** leitura do repositório e verificações de código.
- **Figma conectado ao assistente:** consulta ao protótipo, às cores e aos elementos visuais como referência para a interface.

## 2. Exemplos de interações reais

As respostas abaixo estão resumidas.

| Prompt enviado | Resposta e aplicação |
| --- | --- |
| “temos que usar custom hooks e componentes e separação entre lógica e interface” | Orientação para separar requisições em serviços, lógica em hooks e apresentação em componentes. |
| “vamos seguir para a etapa do Histórico e Detalhe consumindo os eventos da API” | Apoio à listagem, aos filtros e à consulta dos detalhes dos eventos. |
| “Next.js encountered URL data `useParams()` in a Client Component outside of Suspense.” | Orientação para ajustar a estrutura da página com `Suspense`. |
| “na paleta tambem tem a cor laranja, adicione á paleta” | Inclusão do laranja e ajustes nas variáveis de cores e no Tailwind. |
| “voce consegue fazer um svg especifico somente para o "w" do hawk” | Extração dos caminhos vetoriais do W da marca para um SVG separado. |

## 3. Aplicação no projeto

- **Arquitetura:** organização de serviços, custom hooks, componentes e páginas.
- **Ocorrências:** apoio ao CRUD, filtros, formulário e alteração de situação.
- **Histórico e detalhe:** consumo de eventos, filtros por período e apresentação dos dados.
- **Dashboard:** consumo dos relatórios da API e exibição de indicadores.
- **Interface:** layout responsivo, navegação, cards, tabelas e paleta de cores.
- **Identidade visual:** adaptação de SVGs da marca e ícone da página.

As ilustrações utilizadas nessa etapa foram construídas em SVG/código. Não há registro de geração de imagens por uma ferramenta de IA.

## 4. Validação das respostas

- Comparação das sugestões com os contratos do Swagger fornecidos pelo grupo.
- Implementação manual e testes de uso relatados pela desenvolvedora durante as etapas.
- Ajustes a partir dos erros encontrados, incluindo `Suspense`, cores do Tailwind e marcação JSX.
- Verificação de sintaxe, do CSS servido pela aplicação e da estrutura dos SVGs.
- Revisão do código existente antes das alterações e da documentação.

## 5. Análise crítica

**Benefícios**

- Agilidade para organizar o desenvolvimento e esclarecer dúvidas.
- Apoio ao aprendizado de hooks, componentes e integração com APIs.
- Facilidade para revisar a interface.

**Participação humana**

- O grupo definiu a solução, os requisitos e os contratos da API.
- A desenvolvedora realizou implementações manuais e forneceu feedback.
- A revisão e a responsabilidade pelo resultado final permanecem com o grupo.
