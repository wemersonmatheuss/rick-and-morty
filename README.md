# 🛸 Rick and Morty Creator — Aplicação Full Stack Acadêmica

Este projeto foi desenvolvido como um trabalho acadêmico com o objetivo de criar uma API do zero, integrar com banco de dados e desenvolver um CRUD completo com front-end consumindo a API.

---

## 📌 Objetivo

> Criar uma aplicação full stack temática da série Rick and Morty, com foco em boas práticas de desenvolvimento, padrões de projeto e integração entre front-end e back-end.

O projeto teve como objetivos principais:

* Desenvolver uma API REST do zero com Spring Boot
* Persistir dados em banco de dados PostgreSQL
* Implementar um CRUD completo de personagens
* Consumir a API e construir o front-end completo em React
* Aplicar padrões de projeto e princípios SOLID

---

## 🧠 O que foi aplicado neste projeto

* Desenvolvimento de **API REST** com Spring Boot
* Integração com banco de dados **PostgreSQL** via JPA/Hibernate
* Implementação de **3 padrões de projeto**: Repository, Builder e Strategy
* Aplicação dos princípios **SOLID** na arquitetura do back-end
* Consumo da API com **Axios** no front-end
* Estilização temática com **CSS-in-JS** e design sci-fi
* Armazenamento de imagens em **Base64** no banco de dados
* Responsividade e experiência do usuário com **React + TypeScript**

---

## 🛠️ Tecnologias Utilizadas

### Back-end
* **Java 21** — linguagem principal
* **Spring Boot 3.5** — framework para criação da API REST
* **Spring Data JPA** — persistência e mapeamento objeto-relacional
* **PostgreSQL** — banco de dados relacional
* **Lombok** — redução de boilerplate

### Front-end
* **React** — biblioteca de interface
* **TypeScript** — tipagem estática
* **Vite** — bundler e ambiente de desenvolvimento
* **Axios** — consumo da API REST
* **React Router DOM** — navegação entre páginas

---

## 🗂️ Padrões de Projeto Aplicados

| Padrão | Onde foi aplicado |
|---|---|
| **Repository** | `CharacterRepository` e `SkinRepository` — camada de acesso ao banco |
| **Builder** | `CharacterResponseDTO` e `SkinResponseDTO` — construção dos objetos de resposta |
| **Strategy** | `NameValidationStrategy` e `SpeciesValidationStrategy` — validação dos personagens |

---

## ⚙️ Funcionalidades

* 🎨 Seleção de skin de personagem (imagens armazenadas no banco)
* ➕ Criação de personagens com nome, espécie, status e origem
* 📋 Listagem de todos os personagens cadastrados
* ✏️ Edição de personagens existentes
* 🗑️ Exclusão de personagens
* 💾 Todos os dados persistidos localmente no PostgreSQL, sem dependência de API externa

---

## 🖥️ Como rodar o projeto localmente

### Pré-requisitos
* Java 21+
* Node.js 18+
* PostgreSQL instalado e rodando

### Back-end

1. Clone o repositório:
```bash
   git clone https://github.com/wemersonmatheuss/rick-and-morty.git
```

2. Acesse a pasta do back-end:
```bash
   cd rick-and-morty/backend
```

3. Configure o banco de dados em `src/main/resources/application.properties`:
```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/rickandmorty
   spring.datasource.username=seu_usuario
   spring.datasource.password=sua_senha
```

4. Crie o banco no PostgreSQL:
```sql
   CREATE DATABASE rickandmorty;
```

5. Rode a aplicação pelo IntelliJ ou via terminal:
```bash
   ./mvnw spring-boot:run
```

   A API estará disponível em `http://localhost:8080`

### Front-end

1. Acesse a pasta do front-end:
```bash
   cd rick-and-morty/frontend
```

2. Instale as dependências:
```bash
   npm install
```

3. Rode o projeto:
```bash
   npm run dev
```

   O front-end estará disponível em `http://localhost:5173`

---

## 📡 Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/characters` | Lista todos os personagens |
| `GET` | `/api/characters/{id}` | Busca personagem por ID |
| `POST` | `/api/characters` | Cria um novo personagem |
| `PUT` | `/api/characters/{id}` | Atualiza um personagem |
| `DELETE` | `/api/characters/{id}` | Remove um personagem |
| `GET` | `/api/skins` | Lista todas as skins disponíveis |

---

## 💬 Considerações finais

Este projeto representa a aplicação prática de conceitos fundamentais do desenvolvimento full stack, desde a criação de uma API REST com boas práticas de arquitetura até o consumo dessa API em um front-end moderno e temático.

A responsabilidade pelo front-end completo e pelo consumo da API foi integralmente desenvolvida por mim, aplicando conceitos de UX, componentização e integração com back-end.

---

## 👨‍💻 Autor

Wemerson Matheus  
Desenvolvedor Full Stack  
[github.com/wemersonmatheuss](https://github.com/wemersonmatheuss)
