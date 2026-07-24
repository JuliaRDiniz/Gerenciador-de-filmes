# 🎬 Gerenciador de Filmes

> Aplicação web desenvolvida para praticar e consolidar meus **primeiros aprendizados no consumo de APIs REST de terceiros**, manipulação assíncrona do DOM com JavaScript puro e estilização avançada utilizando **Sass**.

---

## 📌 Sobre o Projeto

O **Gerenciador de Filmes** consome a API pública do **TheMovieDB (TMDB)** para buscar e exibir dinamicamente cartazes, títulos, detalhes e avaliações de filmes atualizados.

Este projeto marcou um passo importante na minha trajetória: foi o meu primeiro contato prático com requisições HTTP para serviços externos, tratamento de dados em JSON e arquitetura de CSS mais limpa e modular através de pré-processadores.

---

## 🚀 Tecnologias e Ferramentas

* **HTML5:** Estruturação semântica do projeto.
* **Sass (SCSS):** Pré-processamento de CSS utilizando aninhamento, variáveis e modularização de estilos.
* **VS Code Live Sass Compiler (Watch Sass):** Extensão utilizada para compilar e mapear o código SCSS em CSS em tempo de desenvolvimento.
* **JavaScript :** Lógica da aplicação, manipulação de DOM e requisições assíncronas (`fetch` / `async/await`).
* **TheMovieDB API:** Fonte de dados assíncrona para filmes e imagens.

---

## 🛠️ Aprendizados e Conceitos Aplicados

### 🌐 Integrando APIs de Terceiros
* **Consumo de API REST:** Realização de chamadas para endpoints do TMDB via `fetch`.
* **Assincronismo:** Uso de Promises para aguardar o retorno dos dados da API sem travar a interface.
* **Renderização Dinâmica:** Criação e montagem de componentes HTML a partir dos objetos recebidos.

### 🎨 Estilização Otimizada com Sass
* **Sass / SCSS:** Estruturação de código CSS mais limpa, reutilizável e organizada.
* **Workflow de Compilação:** Uso da ferramenta *Watch Sass* no VS Code para automatizar a geração do arquivo `style.css` e do sourcemap (`style.css.map`).

### 🔒 Boas Práticas e Segurança
* **Proteção de Credenciais:** Separação de chaves da API em arquivos locais protegidos por `.gitignore`, evitando exposição pública de dados sensíveis no repositório.

---

## 🔧 Como Executar o Projeto Localmente

### Pré-requisitos
* Um navegador web atualizado.
* Uma conta no [TheMovieDB](https://www.themoviedb.org/) para gerar sua chave de API gratuita.
* *(Opcional)* Extensão **Live Sass Compiler** no VS Code caso deseje alterar os arquivos `.scss`.

### Passo a Passo

1. **Clone este repositório:**
   ```bash
   git clone [https://github.com/SEU-USUARIO/Gerenciador-de-filmes.git](https://github.com/SEU-USUARIO/Gerenciador-de-filmes.git)