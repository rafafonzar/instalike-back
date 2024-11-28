import express from "express"; // Importa o framework Express.js para criar a aplicação web
import conectarAoBanco from "./src/config/dbConfig.js"; // Importa a função para conectar ao banco de dados (detalhes em dbConfig.js)

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); // Conecta ao banco de dados usando a string de conexão do ambiente

const app = express(); // Cria uma instância da aplicação Express
app.use(express.json()); // Habilita o parser JSON para lidar com dados JSON nas requisições

// Inicia o servidor e escuta na porta 3000
app.listen(3000, () => {
    console.log("Servidor escutando na porta 3000");
});

// Função assíncrona para obter todos os posts do banco de dados
async function getTodosPosts() {
    const db = conexao.db("imersao-instabyte"); // Acessa o banco de dados "imersao-instabyte"
    const colecao = db.collection("posts"); // Acessa a coleção "posts"
    return colecao.find().toArray(); // Retorna um array com todos os documentos da coleção
}

// Rota para obter todos os posts
app.get("/posts", async (req, res) => {
    try {
        const posts = await getTodosPosts();
        res.status(200).json(posts); // Envia os posts como resposta JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar posts" }); // Envia uma mensagem de erro
    }
});