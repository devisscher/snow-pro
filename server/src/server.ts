import express, { Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './schema';

const app = express();
app.use(express.json());
const server = new ApolloServer({
    schema,
    validationRules: [depthLimit(7)],
});
app.use('*', cors());
app.use(compression());
server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);
const port = 8084;
httpServer.listen(
    { port },
    (): void => console.log(`\n🚀      GraphQL is now running on http://localhost:${port}`));