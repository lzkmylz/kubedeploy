import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import k8sStore from '../../stores/k8sStore';

const Index = () => {
  useEffect(() => {
    k8sStore.getNodesInfo();
  }, []);

  return useObserver(() => {
    return (
      <div>
        <p>Dashboard</p>
        <p>{JSON.stringify(k8sStore.nodesInfo)}</p>
      </div>
    );
  });
}

export default Index;
