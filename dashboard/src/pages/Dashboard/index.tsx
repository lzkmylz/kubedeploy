import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { Descriptions } from 'antd';
import k8sStore from '../../stores/k8sStore';

const Index = () => {
  useEffect(() => {
    k8sStore.getNodesInfo();
  }, []);

  return useObserver(() => {
    return (
      <div>
        <Descriptions
          column={4}
          title="Node List"
          bordered
        >
          {
            k8sStore.nodesInfo ? k8sStore.nodesInfo.map(item => (
              <React.Fragment>
                <Descriptions.Item label="name" span={4}  >{item.metadata?.name}</Descriptions.Item>
                <Descriptions.Item label="total CPU" span={1} >{item.status?.capacity ? item.status.capacity['cpu'] : ''}</Descriptions.Item>
                <Descriptions.Item label="avaiable CPU" span={1} >{item.status?.allocatable ? item.status.allocatable['cpu'] : ''}</Descriptions.Item>
                <Descriptions.Item label="total storage" span={1} >{item.status?.capacity ? item.status.capacity['ephemeral-storage'] : ''}</Descriptions.Item>
                <Descriptions.Item label="avaiable storage" span={1} >{item.status?.allocatable ? item.status.allocatable['ephemeral-storage'] : ''}</Descriptions.Item>
                <Descriptions.Item label="total memory" span={1} >{item.status?.capacity ? item.status.capacity['memory'] : ''}</Descriptions.Item>
                <Descriptions.Item label="avaiable memory" span={1} >{item.status?.allocatable ? item.status.allocatable['memory'] : ''}</Descriptions.Item>
              </React.Fragment>
            )) : ''
          }
        </Descriptions>
      </div>
    );
  });
}

export default Index;
