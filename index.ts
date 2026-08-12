import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import * as database from "./config/database";

import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

const startServer = async () => {
    dotenv.config();
    database.connect();

    const app: Express = express();
    //Graphql
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });
    await apolloServer.start();
    app.use(
        '/graphql',
        cors(), // Bắt buộc phải có để tránh lỗi CORS từ client
        express.json(), // Bắt buộc phải có để đọc được dữ liệu JSON gửi lên
        expressMiddleware(apolloServer) // Cắm Apollo vào Express
    );

    const PORT: string | number = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}

startServer();

