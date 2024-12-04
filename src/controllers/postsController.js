import {getTodosPosts, criarPost } from "../models/postsModel.js";
import fs from "fs";

// **Função para listar todos os posts**
// 1. Importa as funções `getTodosPosts` e `criarPost` do módulo `postsModel`.
// 2. Importa o módulo `fs` para manipulação de arquivos.
export async function listarPosts(req, res) {
    // Tenta executar a função para buscar todos os posts
    try {
        const posts = await getTodosPosts();
        // Se não houver erros, envia os posts como resposta JSON com status 200 (sucesso)
        res.status(200).json(posts);
    } catch (error) {
        // Caso ocorra algum erro, loga o erro no console e envia uma mensagem de erro genérica
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar posts" });
    }
}

// **Função para criar um novo post**
// 1. Extrai os dados do novo post do corpo da requisição.
// 2. Tenta criar o novo post usando a função `criarPost`.
// 3. Se o post for criado com sucesso, envia o post criado como resposta JSON.
// 4. Caso ocorra algum erro, loga o erro no console e envia uma mensagem de erro genérica.
export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Ërro": "Falha na requisição" });
    }
}

// **Função para fazer upload de uma imagem e criar um novo post**
// 1. Cria um novo objeto `novoPost` com os dados do formulário, incluindo o nome original da imagem.
// 2. Tenta criar o novo post usando a função `criarPost`.
// 3. Gera um novo nome para a imagem com base no ID do post criado.
// 4. Renomeia o arquivo da imagem para o novo nome usando `fs.renameSync`.
// 5. Envia o post criado como resposta JSON.
// 6. Caso ocorra algum erro, loga o erro no console e envia uma mensagem de erro genérica.
export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Ërro": "Falha na requisição" });
    }
}