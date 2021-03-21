import { Layout, Menu } from 'antd';
import { Route, Switch } from 'react-router';

import Issues from './container/Issues';

import 'antd/dist/antd.css';
import './App.css';
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="/">Issue Tracker</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Switch>
          <Route exact path="/" component={Issues} />
        </Switch>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Issue Tracker ©2021 Created by Moreen Kim
      </Footer>
    </Layout>
  );
}

export default App;
