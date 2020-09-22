import { KubernetesService } from './k8sService';
import { Router, Request, Response } from 'express';

export class Api {
  constructor(private k8sService: KubernetesService) {}

  routes(): Router {
    return Router()
      .get('/namespaces', async (req: Request, res: Response) => {
        res.json(await this.k8sService.getNamespaces());
      })
      .get('/activities/:namespace', async (req: Request, res: Response) => {
        res.json(await this.k8sService.getEventsForNamespace(req.params.namespace));
      })
      .get('/nodes', async (req: Request, res: Response) => {
        res.json(await this.k8sService.getNodes());
      })
  }
}