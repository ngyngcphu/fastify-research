import { envs } from "./configs/env";
import { createServer } from "./Server";

const PORT = 8080;
const HOST = envs.NODE_ENV === 'development' ? 'localhost': '0.0.0.0';

const app = createServer({
    host: HOST,
    port: PORT
});

app.listen();