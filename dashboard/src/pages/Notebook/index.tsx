import React, { useState } from 'react';
import { useObserver } from 'mobx-react';
import { Button } from 'antd';
import NotebookTable from './NotebookTable';
import styles from './index.module.scss';
import { PlusOutlined } from '@ant-design/icons';
import AddServerModal from './AddServerModal';

const Index = () => {
  const [visible, setVisible] = useState(false);

  const onSubmit = (e : React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log(e);
    setVisible(false);
  }

  const onClose = (e : React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log(e);
    setVisible(false);
  }

  const onAddServerClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setVisible(true);
  }

  return useObserver(() => {
    return (
      <div>
        <div className={styles.add_btn_container} >
          <Button type="primary" onClick={onAddServerClick} >
            <PlusOutlined />
            NEW SERVER
          </Button>
        </div>
        <NotebookTable />
        <AddServerModal
          visible={visible}
          handleOk={onSubmit}
          handleClose={onClose}
        />
      </div>
    );
  });
}

export default Index;