import express from "express"; // Importa o framework Express.js para criar a aplicação web 
// import conectarAoBanco from "./src/config/dbConfig.js"; // Importa a função para conectar ao banco de dados (detalhes em dbConfig.js)
import routes from "./src/routes/postRoutes.js";

// Cria uma instância da aplicação Express
const app = express();
routes(app)

// Inicia o servidor e escuta na porta 3000
app.listen(3000, () => {
    console.log("Servidor escutando na porta 3000");
});