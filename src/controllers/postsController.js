import getTodosPosts from "../models/postsModel.js";

export async function listarPosts(req, res) {
    try {
        const posts = await getTodosPosts();
         // Envia os posts como resposta JSON
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
         // Envia uma mensagem de erro
        res.status(500).json({ message: "Erro ao buscar posts" });
    }
}

