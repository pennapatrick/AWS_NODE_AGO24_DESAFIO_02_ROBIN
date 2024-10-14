
# Compass CAR - Sistema de Locação de Carros

O projeto se trata de uma API desenvolvida com a finalidade de gerenciar um sistema de locação de carros.
Oferece funcionalidades completas de um CRUD (Create, Read, Update, Delete) para:
- **Usuários:** administração das contas responsáveis por operar o sistema, contendo uma autenticação que autoriza o acesso para as funções oferecidas.
- **Clientes:** gerência dos registros dos clientes que realizam as locações.
- **Carros:** controle dos veículos disponíveis.
- **Pedidos de Locação:** gerenciamento dos pedidos realizados, registrando datas e calculando valores, taxas e multas.

## Principais tecnologias utilizadas
- Node.js
- Express
- MySQL
- Sequelize
- TypeScript
- JWT (JSON Web Tokens)
- BcryptJS
- Celebrate (Joi)
- Dotenv
- Eslint

## Endpoints da API

### Autenticação
Login
```http
  POST /api/auth/
```

### Usuários
Criação de Usuários
```http
  POST /api/users/
```
Visualizar um Usuário pelo Id
```http
  GET /api/users/:id
```
Leitura de Usuários
```http
  GET /api/users/
```
Atualização de Usuários
```http
  PUT /api/users/:id
```
Exclusão de Usuários
```http
  DELETE /api/users/:id
```

### Clientes
Criação de Clientes
```http
  POST /api/customers/
```
Visualizar um Cliente pelo Id
```http
  GET /api/customers/:id
```
Leitura de Clientes
```http
  GET /api/customers/
```
Atualização de Clientes
```http
  PATCH /api/customers/:id
```
Exclusão de Clientes
```http
  DELETE /api/customers/:id
```

### Carros
Criação de Carros
```http
  POST /api/cars/
```
Visualizar um Carro pelo Id
```http
  GET /api/cars/:id
```
Leitura de Carros
```http
  GET /api/cars/
```
Atualização de Carros
```http
  PATCH /api/cars/:id
```
Exclusão de Carros
```http
  DELETE /api/cars/:id
```

### Pedidos de Locação
Criação de Pedidos
```http
  POST /api/orders/
```
Visualizar um Pedido pelo Id
```http
  GET /api/orders/:id
```
Leitura de Pedidos
```http
  GET /api/orders/
```
Atualização de Pedidos
```http
  PATCH /api/orders/:id
```
Exclusão de Pedidos
```http
  DELETE /api/orders/:id
```

## Rodando Localmente

Clone o repositório do projeto para o seu ambiente local
```bash
  git clone https://github.com/pennapatrick/AWS_NODE_AGO24_DESAFIO_02_ROBIN.git
```

Navegue para o diretório do projeto
```bash
  cd AWS_NODE_AGO24_DESAFIO_02_ROBIN
```

Instale as dependências
```bash
  npm install
```

Inicie o servidor e acesse a API
```bash
  npm run start
```

*Para iniciar no modo de desenvolvimento*
```bash
  npm run dev
```

## Autores

- Camila Coradi - [@CamilaCoradi](https://github.com/CamilaCoradi)
- João Barreto - [@jaobarreto](https://github.com/jaobarreto)
- Mayara Angélica - [@mayaraang](https://github.com/mayaraang)
- Patrick Penna - [@pennapatrick](https://github.com/pennapatrick)
- Pedro Henrique - [@Azgro](https://github.com/Azgro)
- Vitor Bordin - [@vitinhob](https://github.com/vitinhob)