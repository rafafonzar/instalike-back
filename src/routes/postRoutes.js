import express from "express";
import { listarPosts } from "../controllers/postsController.js";

const routes = (app) => {
    // Habilita o parser JSON para lidar com dados JSON nas requisições
    app.use(express.json());
    // Rota para obter todos os posts
    app.get("/posts", listarPosts);
}

export default routes;


