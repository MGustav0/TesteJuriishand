import express from 'express';
import fs from 'fs';

const app = express();
const router = express.Router();

app.use(express.json({ extended: true }));

const readFile = () => {
  const content = fs.readFileSync('./data/usuario.json', 'utf-8');
  return JSON.parse(content);
}

const writeFile = (content) => {
  const updateFile = JSON.stringify(content);
  fs.writeFileSync('./data/usuario.json', updateFile, 'utf-8');
}

router.post('/', (request, response) => {
  const { nome, email, password } = request.body;
  
  const insert = readFile();

  const id = Math.random().toString(2).substr(2, 2);

  const dateNow = Date.now();
  const newDate = new Date(dateNow);
  const hora_de_criacao = newDate.toISOString();
  const hora_de_atualizacao = newDate.toISOString();
  
  insert.push({ id, nome, email, password, hora_de_criacao, hora_de_atualizacao });

  writeFile(insert);
  
  response.send(insert);
})

router.get('/:id', (request, response) => {
  const { id } = request.params;
  const content = readFile();

  const selected = content.find((item) => item.id === id);

  response.send(selected);
})

router.put('/:id', (request, response) => {
  const { id } = request.params;
  const { nome, email, password } = request.body;
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

  response.send(update);
})

router.delete('/:id', (request, response) => {
  const { id } = request.params;

  const currentContent = readFile();

  const selected = currentContent.findIndex((item) => item.id === id);

  currentContent.splice(selected, 1);

  writeFile(currentContent);

  response.status(200).json('Usuário excluído.');
})

app.use(router);

app.listen(3000, () => {
  console.log(`🚀 Server started on port 3000!`);
})
