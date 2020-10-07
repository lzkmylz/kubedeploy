import React, {} from 'react';
import { useObserver } from 'mobx-react';
import { Button } from 'antd';
import NotebookTable from './NotebookTable';
import styles from './index.module.scss';
import { PlusOutlined } from '@ant-design/icons';

const Index = () => {

  return useObserver(() => {
    return (
      <div>
        <div className={styles.add_btn_container} >
          <Button type="primary" >
            <PlusOutlined />
            NEW SERVER
          </Button>
        </div>
        <NotebookTable />
      </div>
    );
  });
}

export default Index;