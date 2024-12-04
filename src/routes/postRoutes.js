import express from "express"; // Importa o módulo express para criar a aplicação web
import multer from "multer"; // Importa o módulo multer para lidar com uploads de arquivos

// Importa as funções controladoras para posts do arquivo postsController.js
import { listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js";

const storage = multer.diskStorage({ // Configura o armazenamento de arquivos
  destination: function (req, file, cb) { // Define o diretório para salvar os arquivos
    cb(null, 'uploads/'); // O diretório será 'uploads/'
  },
  filename: function (req, file, cb) { // Define o nome do arquivo salvo
    cb(null, file.originalname); // O nome será o nome original do arquivo enviado
  }
})

const upload = multer({ dest: "./uploads", storage }); // Cria uma instância do multer com a configuração de armazenamento

const routes = (app) => { // Função para definir as rotas da aplicação

  // Habilita o parser JSON para interpretar dados JSON enviados na requisição
  app.use(express.json());

  // Rota GET para listar todos os posts (provavelmente implementada na função listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (provavelmente implementada na função postarNovoPost) 
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (provavelmente implementada na função uploadImagem)
  // O middleware 'upload.single("imagem")' processa o upload de um único arquivo chamado 'imagem'
  app.post("/upload", upload.single("imagem"), uploadImagem);
}

export default routes; // Exporta a função routes para ser usada em outro arquivo