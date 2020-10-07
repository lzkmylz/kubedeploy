import React from 'react';
import { Modal } from 'antd';

interface props {
  /* other props for ChildComponent */
  visible: boolean;
  handleOk: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void);
  handleClose: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void);
}

const AddServerModal : React.SFC<props> = ({ visible, handleOk, handleClose }) => {

  return (
    <Modal
      title="Add Server"
      visible={visible}
      onOk={handleOk}
      onCancel={handleClose}
    >
      This is add server modal
    </Modal>
  );
}

export default AddServerModal;
