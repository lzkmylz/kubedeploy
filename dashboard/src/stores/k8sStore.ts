import { observable, action } from 'mobx';
import { V1Node } from '@kubernetes/client-node';
import axios from 'axios';

class k8sStore {
  @observable nodesInfo: V1Node[] | null = null;

  @action getNodesInfo = () => {
    return axios.get('/api/nodes').then(res => {
      this.nodesInfo = res.data;
    });
  }  
}

export default new k8sStore();
