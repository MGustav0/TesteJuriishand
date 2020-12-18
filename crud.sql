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
