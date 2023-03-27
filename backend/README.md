# Test Fullstack

![project language](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![package manager](https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white)
![database](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

## 💻 Descrição do Projeto
<p align="center">O Projeto consiste de um desenvolvimento de API para cadastro de Conteiners e Movimentaçoes do mesmo,além de ser uma amostra das minhas abilidades utilizando diversas bibliotecas e conceitos de backend.</p>

<p align="center">
 <a href="#objetivo">Objetivo</a> •
 <a href="#tecnologias">Tecnologias</a> • 
 <a href="#projeto">Como utilizar este projeto</a> • 
 <a href="#desenvolvedor">Autor</a>
</p>

## Objetivo
<p> 🚀 Este projeto foi feito com base em uma lista de requisitos para um processo seletivo, no que se baseia em construir um sistema de CRUD de Conteiners e Movimentações desses conteiners.</p>

## Tecnologias

🛠 As seguintes ferramentas que foram usadas na construção deste projeto:

- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [TypeORM](https://typeorm.io/)
- [Postgres](https://www.postgresql.org/)
- [Zod](https://github.com/colinhacks/zod)


## Projeto

### ⚙️ Pré-requisitos para utilizar este projeto

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Projeto

```bash
# Clone este repositório pelo terminal/bash
$ git clone https://github.com/wdwf/Teste_Fullstack.git

# Acesse a pasta do projeto
$ cd Teste_Fullstack

# Instale as dependências
$ npm install
ou
$ yarn

# Utilizando o postgres crie um banco de dados.

# Após ter criado o banco de dados crie um arquivo .env na raiz do projeto com as seguintes informações:
DB_HOST= # Aqui vai seu host normalmente é 'localhost'
DB_PORT= # Aqui vai a porta do seu banco de dados
DB_USER= # Aqui vai o usuario dono do banco criado anteriormente
DB_PASS= # Aqui vai a senha para acessar o banco
DB_NAME= # Aqui vai o nome do banco de dados criado pelo postgres
PORT=3000


# Execute a aplicação em modo de desenvolvimento
$ npm run dev
ou
$ yarn dev

# O servidor iniciará na porta:3000 - acesse <http://localhost:3000>
```

# Desenvolvedor
<p> 👨‍💻 Desenvolvido com muita garra por <a href="https://www.linkedin.com/in/weslleyferreira/">Weslley Ferreira de Moraes</a></p>