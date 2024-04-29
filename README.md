# Trabalho final da disciplina de Backend

- Professor: Douglas Nassif Roma Junior
- LinkedIn: https://www.linkedin.com/in/douglasjunior/

## Para rodar o projeto

1. Baixe o projeto
1. Instale as dependências
    ```
    npm install
    ```
1. Configure as variáveis de ambiente no arquivo `dev.env`
    > Você precisa estar com o `MySQL` rodando e com um banco de dados já criado.
    > 
    > As tabelas serão criadas automaticamente pelo `Sequelize`.
1. Rode o projeto
    ```
    npm run dev
    ```

## Rotas públicas

### Cadastro de usuários 

> POST /users
>
> Body:
> ```json
> {
>   "name": "Fulano da Silva",
>   "email": "fulano@email.com",
>   "password": "12345678"
> }
> ```

### Login de usuários 

> POST /users/login
>
> Body:
> ```json
> {
>   "email": "fulano@email.com",
>   "password": "12345678"
> }
> ```

## Rotas autenticadas

Todas as rotas autenticadas exigem que o `token jwt` seja passado no cabeçalho (header) chamado `Authorization`.

### Cadastrar tarefas

> POST /tasks
>
> Headers:
> ```properties
> Authorization: Bearer s8a7df687sadf687sadf67s98f98sdf...
> ```
>
> Body:
> ```json
> {
>     "title": "Aprender Node",
>     "concluded": false
> }
> ```

### Consultar tarefas

> GET /tasks
>
> Headers:
> ```properties
> Authorization: Bearer s8a7df687sadf687sadf67s98f98sdf...
> ```

### Obter tarefa por ID

> GET /tasks/1
>
> Headers:
> ```properties
> Authorization: Bearer s8a7df687sadf687sadf67s98f98sdf...
> ```

### Marcar tarefa como concluída

> PUT /tasks/1/concluded
>
> Headers:
> ```properties
> Authorization: Bearer s8a7df687sadf687sadf67s98f98sdf...
> ```

### Marcar tarefa como pendente

> PUT /tasks/1/pending
>
> Headers:
> ```properties
> Authorization: Bearer s8a7df687sadf687sadf67s98f98sdf...
> ```

### Atualização parcial da tarefa

> PATCH /tasks/1
>
> Headers:
> ```properties
> Authorization: Bearer s8a7df687sadf687sadf67s98f98sdf...
> ```
>
> Body:
> ```json
> {
>     "title": "Aprender Node",
>     "concluded": false
> }
> ```

