import React, { useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
} from 'antd';
import k8sStore from '../../stores/k8sStore';

interface props {
  /* other props for ChildComponent */
  visible: boolean;
  handleOk: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void);
  handleClose: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void);
}

const AddServerModal : React.SFC<props> = ({ visible, handleOk, handleClose }) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const { Option } = Select;

  const [gpucount, setGpucount] = useState(Array<Number>());

  useEffect(() => {
    if(!k8sStore.nodesInfo) {
      k8sStore.getNodesInfo().then(() => {
        let gpus = 0;
        let temp_gpucount = [];
        if(k8sStore.nodesInfo) {
          for(let i = 0; i < k8sStore.nodesInfo?.length; i++) {
            if(k8sStore.nodesInfo[i].status) {
              if(k8sStore.nodesInfo[i].status?.allocatable) {
                let allocatable = k8sStore.nodesInfo[i].status?.allocatable;
                if(allocatable) {
                  let gpu = allocatable['nvidia.com/gpu'];
                  gpus += Number(gpu);
                }
              }
            }
          }
          if(gpus > 0) {
            temp_gpucount.push(1);
          }
          for(let i = 1; i < gpus; i++) {
            if(i % 2 === 0) {
              temp_gpucount.push(i);
            }
          }
          setGpucount(temp_gpucount);
        }
      });
    }
  });

  return (
    <Modal
      title="Add Server"
      visible={visible}
      onOk={handleOk}
      onCancel={handleClose}
    >
      <Form
        {...layout}
        
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input name of your notebook!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Namespace"
          name="namespace"
          rules={[{ required: true, message: 'Please input namespace!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="ImageName"
          name="imagename"
          rules={[{ required: true, message: 'Please input imagename!' }]}
        >
          <Input placeholder="<imagename>:<tag>" />
        </Form.Item>
        <Form.Item
          label="CPU"
          name="cpu"
          rules={[{ required: true, message: 'Please input cpu!' }]}
        >
          <Input placeholder="1" />
        </Form.Item>
        <Form.Item
          label="Memory"
          name="memory"
          rules={[{ required: true, message: 'Please input memory!' }]}
        >
          <Input placeholder="2Gi" />
        </Form.Item>
        <Form.Item
          label="GPUs"
          name="gpus"
          rules={[{ required: true, message: 'Please select gpu!' }]}
        >
          <Select defaultValue="none" >
            <Option value="none" >None</Option>
            {
              gpucount.map((num) => <Option value={String(num)} >{num}</Option>)
            }
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddServerModal;
