import React from 'react';
import { Table, Tag, Space } from 'antd';
import { Resource } from '../../types';

const NotebookTable = () => {
  const tagColorMap : {[key: string]: string} = {
    success: "green",
    failed: "red",
    pending: "geekblue",
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: String) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Gpu',
      dataIndex: 'gpu',
      key: 'gpu',
    },
    {
      title: 'Cpu',
      dataIndex: 'cpu',
      key: 'cpu',
    },
    {
      title: 'Memory',
      dataIndex: 'memory',
      key: 'memory',
    },
    {
      title: 'Volumes',
      dataIndex: 'volumes',
      key: 'volumes',
      render: (volumes : [string]) => (
        <Space size="middle" >
          {
            volumes.map((volume) => (
              <span>{volume}</span>
            ))
          }
        </Space>
      )
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status : string) => (
        <>
          <Tag color={tagColorMap[status]} >{status}</Tag>
        </>
      ),
    },
  ];
  
  const data : Resource[] = [
    {
      name: 'John Brown',
      age: '32',
      image: 'New York No. 1 Lake Park',
      gpu: '0',
      cpu: '0',
      memory: "512Mb",
      volumes: ["volume-1", "volume-2"],
      status: "pending",
      reason: '',
    },
    {
      name: 'Jim Green',
      age: '42',
      image: 'London No. 1 Lake Park',
      gpu: '0',
      cpu: '0',
      memory: "512Mb",
      volumes: ["volume-1", "volume-2"],
      status: "failed",
      reason: '',
    },
    {
      name: 'Joe Black',
      age: '32',
      image: 'Sidney No. 1 Lake Park',
      gpu: '0',
      cpu: '0',
      memory: "512Mb",
      volumes: ["volume-1", "volume-2"],
      status: "success",
      reason: '',
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default NotebookTable