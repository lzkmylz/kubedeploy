import * as k8s from '@kubernetes/client-node';

export class KubernetesService {
  private coreAPI: k8s.CoreV1Api;
  
  constructor(private kubeConfig: k8s.KubeConfig) {
    this.kubeConfig.loadFromDefault();
    const context = this.kubeConfig.getContextObject(this.kubeConfig.getCurrentContext());
    this.coreAPI = this.kubeConfig.makeApiClient(k8s.CoreV1Api);
  }

  async getNamespaces(): Promise<k8s.V1Namespace[]> {
    try {
      const {body} = await this.coreAPI.listNamespace();
      return body.items;
    } catch (err) {
      console.error('Unable to fetch Namespaces:', err.body || err);
      return [];
    }
  }

  async getEventsForNamespace(namespace: string): Promise<k8s.V1Event[]> {
    try {
      const {body} = await this.coreAPI.listNamespacedEvent(namespace);
      return body.items;
    } catch (err) {
      console.error(
          `Unable to fetch Events for ${namespace}:`, err.body || err);
      return [];
    }
  }

  async getNodes(): Promise<k8s.V1Node[]> {
    try {
      const {body} = await this.coreAPI.listNode();
      return body.items;
    } catch (err) {
      console.error('Unable to fetch Nodes', err.body || err);
      return [];
    }
  }
}