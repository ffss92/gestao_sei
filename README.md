# Client - Gestão SEI

Para iniciar o client, o seguinte requisito é necessário:

- [NodeJS](https://nodejs.org/en/)

## 1. Variáveis de ambiente

O projeto depende de várias variáveis de ambiente. Para defini-las, crie um arquivo `.env` com base nas configurações do modelo `.env.conf`
e configure as informações.

## 2. Scripts

O projeto `create-react-app` provê alguns scripts padrões, como pode ser verificado no arquivo `package.json`.
As dependências do projeto devem ser instaladas após clonar o repositório utilizando o comando `npm install`.

## 3. Desenvolvimento

Em ambiente de desenvolvimento, o client pode ser iniciado utilizando o script `npm start`.
Para ver no browser, acesse: [http://localhost:3000](http://localhost:3000)

### 4. Produção

A build para produção deve ser feita através do script `npm run build`.
Os arquivos compilados serão inseridos na pasta `build`.
Para iniciar o servidor, utilize o comando `serve -s build` ou `npx serve -s build`, caso serve não esteja
instalado globalmente.
