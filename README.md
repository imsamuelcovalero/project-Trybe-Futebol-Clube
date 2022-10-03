# Project Trybe Futebol Clube
# Contexto
No projeto de backend da Trybe, Trybe Futebol Clube, restaurei o backend de uma aplicação fullstack de campeonato brasileiro de futebol. Através de CRUDs é possível fazer login, consultar times e partidas, inserir, editar e/ou finalizar partidas. Também é possível consultar a tabela de classificação dos times, dentro de casa, fora de casa e geral. Como padrão de organização de camadas foi utilizado o MSC (Model, Service e Controller), o que contribuiu para a API ser REST. Os erros foram tratados de maneira customizada e os commits estão no padrão convencional.

## Tecnologias usadas
Back-end:
> Desenvolvido usando: NodeJS, Express, Docker, Typescript, POO, Sequelize, SQL, JWT e Joi.
## Instalando Dependências
> Na raíz do projeto
```bash
cd Project-Trybe-Futebol-Clube
npm install
``` 
## Executando aplicação em docker
* Deve ser executado o compose para subir os containers de backend, frontend e o banco de dados:
  ```
  docker-compose up -d
  *A aplicação frontend estará rodando na porta 3000: http://localhost:3000/ do navegador e as requisições HTTP podem ser feitas na porta 3001: http://localhost:3001/ através do Insomnia, Postman ou outro API client. 
  ```
  * Para fazer as requisições e visualizar os logs:
    ```
    Instale as dependências dentro do backend
    Execute o comando para acessar o terminal do docker: docker exec -it app_backend sh
    Instale as dependências dentro do docker: npm install
    O nodemon estará rodando junto com o docker compose, e é possível visualziar os logs do container pelo Docker-desktop ou extensão do Docker no VS Code
    ```
