import React, {} from 'react';
import { useObserver } from 'mobx-react';
import {} from 'antd';
import NotebookTable from './NotebookTable';

const Index = () => {

  return useObserver(() => {
    return (
      <div>
        <NotebookTable />
      </div>
    );
  });
}

export default Index;