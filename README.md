
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
  POST /api/v1/auth/
```

### Usuários
Criação de Usuários
```http
  POST /api/v1/users/
```
Visualizar um Usuário pelo Id
```http
  GET /api/v1/users/:id
```
Leitura de Usuários
```http
  GET /api/v1/users/
```
Atualização de Usuários
```http
  PUT /api/v1/users/:id
```
Exclusão de Usuários
```http
  DELETE /api/v1/users/:id
```

### Clientes
Criação de Clientes
```http
  POST /api/v1/customers/
```
Visualizar um Cliente pelo Id
```http
  GET /api/v1/customers/:id
```
Leitura de Clientes
```http
  GET /api/v1/customers/
```
Atualização de Clientes
```http
  PATCH /api/v1/customers/:id
```
Exclusão de Clientes
```http
  DELETE /api/v1/customers/:id
```

### Carros
Criação de Carros
```http
  POST /api/v1/cars/
```
Visualizar um Carro pelo Id
```http
  GET /api/v1/cars/:id
```
Leitura de Carros
```http
  GET /api/v1/cars/
```
Atualização de Carros
```http
  PATCH /api/v1/cars/:id
```
Exclusão de Carros
```http
  DELETE /api/v1/cars/:id
```

### Pedidos de Locação
Criação de Pedidos
```http
  POST /api/v1/orders/
```
Visualizar um Pedido pelo Id
```http
  GET /api/v1/orders/:id
```
Leitura de Pedidos
```http
  GET /api/v1/orders/
```
Atualização de Pedidos
```http
  PATCH /api/v1/orders/:id
```
Exclusão de Pedidos
```http
  DELETE /api/v1/orders/:id
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

## Documentação do deploy na AWS
Após a criação de uma conta na AWS seguir os seguintes passos:

 Verifique se sua região está em "Ohio", caso não esteja mude para Ohio.

 Criar uma VPC -> faça uma busca e procure por VPC, depois clique em "criar VPC", na criação marque "VPC e muito mais", escolha um nome para a VPC e clicar em "Criar VPC".

 Criar Security Group -> procure por EC2 e va em grupos de segurança e clique em "Criar grupo de segurança", de um nome
 ao grupo e uma descrição, utilize a VPC criada anteriormente, 
Crie regras de entrada TCP(porta:8080, origen:Qualquer local-IPv4), 
ssh(pota:22, origem:Qualquer Local-IPv4), RDP(porta:3389, origem: Qualquer local-IPv4) e uma regra de saída Todo o tráfego(destino:Qualquer local-IPv4)

 Criar instância EC2 -> em Nome e tag crie: 3 tag com chave, valor e recurso com instâcia e volumes(ex: Chave: Name, Valor: TI, Tipo de recurso: instância e volume) 
em AMI utilize Windows Serve base 2022(o ano pode ficar a sua escolha), Tipo de instância(t2.micro), em Par de chaves (clique em criar novo par de chave e crie uma chave) 
adicione a chave criada no campo, em Configuração de rede (clique em editar, em VPC utilize sua VPC criada anteriormente, em sub-rede adicione uma sub-rede publica, 
em Ip publico automático coleque Habilitar), em grupo de segurança (coloque selecionar grupo e em nome do grupo adicione seu grupo criado anteriormente) 
e em configurar armazenamento (coloque 30 GIB e gp2).

 Após a instância ser criada e ja estar executando -> selecione a instância criada e clique em conectar, vá em "cliente RDP" e clique em 
"Fazer download de arquivo de área de trabalho remota", irá baixar um arquivo para acessar o máquina virtual, antes de executar o arquivo baixado clique em "Obter senha", 
vai pedir a sua chave privada(.pem) então carregue ela e clique em "descriptografar senha", agora execute o arquivo baixado de antes
(ele irá pedir uma senha que é a senha que foi descriptografada), depois desses procedimentos será possível utilizar a máquina.

 Dentro da máquina instale o banco de dados Mysql e crie um Banco com o nome "compasscar3".

 Instale tambem o git e o postman para testar a aplicação.

 Para testar a aplicação faça um clone do repositório "https://github.com/vitinhob/AWS_NODE_AGO24_DESAFIO_02_ROBIN.git" e acrescente um arquivo(.env) na raiz do projeto com os seguintes ajustes (ex: DB_NAME=compasscar3, DB_USER=root, DB_PASSWORD=7413219, DB_HOST=localhost, PORT=3000), em USER e PASSWORD serão o usuário e senha do seu banco o resto fica igual ao exemplo.

 Para rodar a api -> entra na pasta onde foi feito o clone do repositório do github e abara o gitbash, no terminal do git digite "npm run dev" e a aplicação irá rodar.

 Para a visualização do Swagger -> basta rodar a aplicação, abrir um navegador e na url colocar "http://localhost:3000/api/v1/docs" que irá mostrar a documentação.

## Autores

- Camila Coradi - [@CamilaCoradi](https://github.com/CamilaCoradi)
- João Barreto - [@jaobarreto](https://github.com/jaobarreto)
- Mayara Angélica - [@mayaraang](https://github.com/mayaraang)
- Patrick Penna - [@pennapatrick](https://github.com/pennapatrick)
- Pedro Henrique - [@Azgro](https://github.com/Azgro)
- Vitor Bordin - [@vitinhob](https://github.com/vitinhob)
