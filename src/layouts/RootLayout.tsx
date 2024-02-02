import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UsergroupAddOutlined,
    HomeOutlined,
    ShopOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import styles from './root-layout.module.css'
import {Space} from "antd/lib";
import {NavLink, Outlet} from "react-router-dom";
const { Header, Sider, Content } = Layout;



 const RootLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className={styles.container}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className={styles.logo} />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <HomeOutlined />,
                            label:(<NavLink to="/">Home</NavLink>),
                        },
                        {
                            key: '2',
                            icon: <ShopOutlined />,
                            label: (<NavLink to="/habitaciones">Habitaciones</NavLink>),                     
                        },
                        {
                            key: '3',
                            icon: <ShopOutlined />,
                            label: (<NavLink to="/reservas">Reservas</NavLink>),                     
                        },
                        {
                            key: '4',
                            icon: <UsergroupAddOutlined />,
                            label: (<NavLink to="/usuarios">Usuarios</NavLink>),                     
                        },
                    ]}
                />
            </Sider>
            <Layout className={styles.siteLayout}>
                <Header style={{ padding: 0, background: colorBgContainer }}>

                    <Space>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: styles.trigger,
                            onClick: () => setCollapsed(!collapsed),
                        })}
                        <h1 className={styles.title} >Hostería Capillapamba</h1>
                    </Space>
                </Header>

                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
<Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default RootLayout
