# JurisHand - Teste 1

## Questão 1

Fiz com base em dois bancos de dados que costumo usar, sendo o PostgreSQL que mais utilizo.

```sql
-- PostgreSQL

-- Criar Tabela
CREATE TABLE usuarios
( 
    id                  SERIAL PRIMARY KEY NOT NULL, 
    nome                VARCHAR (70), 
    email               VARCHAR (70),
    password            VARCHAR (200),
    hora_de_criacao     TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    hora_de_atualizacao TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados
INSERT INTO usuarios (nome, email, password) VALUES ('Jhon', 'jhon@email.com', '123456');

-- Selecionar com base no ID
SELECT * from usuarios WHERE id = 1;
SELECT (nome, email, password) from usuarios WHERE id = 1;

-- Atualizar com base no ID
UPDATE usuarios SET nome = 'Jhon Doe' WHERE id = 1;

-- Remover com base no ID
DELETE from usuarios WHERE id = 1;


-- MySQL

-- Criar tabela
CREATE TABLE usuarios 
( 
    id                  INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    nome                VARCHAR(30), 
    email               VARCHAR(50),
    password            VARCHAR(200),
    hora_de_criacao     TIMESTAMP,
    hora_de_atualizacao TIMESTAMP
);

-- Inserir dados
INSERT INTO usuarios (nome, email, password, hora_de_criacao, hora_de_atualizacao) 
VALUES ('Jhon', 'jhon@email.com', '123456', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Selecionar com base no ID
SELECT * FROM usuarios WHERE id = 1;

-- Atualizar com base no ID
UPDATE usuarios SET nome = 'Jhon Doe' WHERE id = 1;

-- Remover com base no ID
DELETE from usuarios WHERE id = 1;

```

## Questão 2

Caso seja pertinente, por favor vejam isso rodando no express com NodeJS [neste link do GitHub](https://github.com/MGustav0/TesteJurishand).

Utilizei duas funções uma para ler e outra para escrever o arquivo `usuario.json`:

```js
const readFile = () => {
  const content = fs.readFileSync('./data/usuario.json', 'utf-8');
  return JSON.parse(content);
}

const writeFile = (content) => {
  const updateFile = JSON.stringify(content);
  fs.writeFileSync('./data/usuario.json', updateFile, 'utf-8');
}
```

### Inserção

```js
function insert (nome, email, password) {
  const insert = readFile();

  const id = Math.random().toString(2).substr(2, 2);

  const dateNow = Date.now();
  const newDate = new Date(dateNow);
  const hora_de_criacao = newDate.toISOString();
  const hora_de_atualizacao = newDate.toISOString();
  
  insert.push({ id, nome, email, password, hora_de_criacao, hora_de_atualizacao });

  writeFile(insert);
}
```

### Seleção

```js
function select (id) {
  const content = readFile();

  const selected = content.find((item) => item.id === id);
}
```

### Atualização

```js
function select (id, field, value) {
  const currentContent = readFile();

  const selected = currentContent.findIndex((item) => item.id === id);

  const dateNow = Date.now();
  const newDate = new Date(dateNow);
  const hora_de_atualizacao = newDate.toISOString();

  const { 
    nome: currentNome,
    email: currentEmail,
    password: currentPassword,
    hora_de_criacao: currentHora_de_criacao,
  } = currentContent[selected];

  const update = {
    id,
    nome: nome ? nome: currentNome,
    email: email ? email: currentEmail,
    password: password ? password: currentPassword,
    hora_de_criacao: currentHora_de_criacao,
    hora_de_atualizacao,
  }

  currentContent[selected] = update;

  writeFile(currentContent);
}
```

### Deleção

```js
function select (id) {
  const currentContent = readFile();

  const selected = currentContent.findIndex((item) => item.id === id);

  currentContent.splice(selected, 1);

  writeFile(currentContent);
}
```
