import express, {Request, Response} from 'express';
import {resolve} from 'path';
import { KubeConfig } from '@kubernetes/client-node';
import { KubernetesService } from './k8sService';
import { Api } from './k8sApi';

const PORT = 3001;
const isProduction = process.env.NODE_ENV === 'production';
const codeEnvironment = isProduction ? 'production' : 'development';

const app: express.Application = express();
const frontend: string = resolve(__dirname, '../build');
const k8sService = new KubernetesService(new KubeConfig());

// middlewares
app.use(express.json());
app.use(express.static(frontend));

app.get('/api/debug', (req: Request, res: Response) => {
  res.json({
    msg: "debug"
  });
});
app.use('/api', new Api(k8sService).routes());

app.listen(PORT, () => console.info(`Server listening on port http://localhost:${PORT} (in ${codeEnvironment} mode)`))