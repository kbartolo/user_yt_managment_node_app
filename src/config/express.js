import express from 'express';
import userRouter from '#Routes/user.routes.js';
import swaggerUi from 'swagger-ui-express';
import * as url from 'url';
import YAML from 'yaml';
import { readFile } from '#Utils/utils.js';

const expressApp = express();
// Convirtiendo swagger.yaml a json file
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const file = readFile(__dirname, './swagger.yml', 'utf8');

const swaggerSetup = YAML.parseDocument(file);
// Middlewares
expressApp.use(express.json());

// Routers

expressApp.use('/v1/users', userRouter);
expressApp.use('/v1/users/doc', swaggerUi.serve, swaggerUi.setup(swaggerSetup));
expressApp.use('/', (req, res) => {
    res.send('User Restful Api Working ;)');
});
export default expressApp;
