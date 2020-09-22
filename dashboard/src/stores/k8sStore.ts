import { observable, action } from 'mobx';
import { V1NodeList } from '@kubernetes/client-node';
import axios from 'axios';

class k8sStore {
  @observable nodesInfo: V1NodeList | null = null;

  @action getNodesInfo = () => {
    return axios.get('/api/nodes').then(res => {
      this.nodesInfo = res.data;
    });
  }  
}

export default new k8sStore();
