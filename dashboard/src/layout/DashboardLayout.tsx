import React from 'react';
import {
  Layout,
  Menu,
} from 'antd';
import {
  PieChartOutlined,
  CodeSandboxOutlined,
} from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/lib/interface';
import { Route, RouteComponentProps } from 'react-router-dom';
import { useObserver } from 'mobx-react';
import styles from './DashboardLayout.module.scss';
import Dashboard from '../pages/Dashboard';
import Notebook from '../pages/Notebook';

const { Header, Content, Sider } = Layout;

interface ChildComponentProps extends RouteComponentProps<any> {
  /* other props for ChildComponent */
}

const DashboardLayout: React.SFC<ChildComponentProps> = ({ history }) => {

  const menuKeyPathMapping: {[key:string]:string} = {
    "1": "/",
    "2": "/notebook",
  };

  const onSidecarMenuClick = (e: MenuInfo) => {
    history.push(menuKeyPathMapping[e.key]);
  };

  return useObserver(() => {
    return (
      <Layout className={styles.dashboardlayout}>
        <Header className={styles.header} >
          <div className={styles.logo_container} >
            <img
              src={process.env.PUBLIC_URL + '/rocket512.png'}
              alt="logo"
              className={styles.logo_img}
            />
            <p className={styles.header_title} >
              分布式深度学习推理加速服务平台
            </p>
          </div>
        </Header>
        <Layout>
          <Sider
            width={200}
            className="site-layout-background"
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
              onClick={onSidecarMenuClick}
            >
              <Menu.Item key="1" icon={<PieChartOutlined />} >
                Dashboard
              </Menu.Item>
              <Menu.Item key="2" icon={<CodeSandboxOutlined />} >
                Notebook
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }} >
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Route path="/" component={Dashboard} exact />
              <Route path="/notebook" component={Notebook} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  });
}

export default DashboardLayout;
