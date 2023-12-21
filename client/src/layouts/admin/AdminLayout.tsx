import { Layout, Space } from 'antd';
import React from 'react';
import { SiderAdmin } from './sider';
import { HeaderAdmin } from './header';
import { FooterAdmin } from './footer';
import { ContentAdmin } from './content';
import { CSSProperties } from 'styled-components';

const spaceStyle: CSSProperties = {
  width: '100%',
  minHeight: '100vh',
  backgroundColor: 'var(--color-background-sidebar)',
};

const layoutRightStyled: CSSProperties = {};

export const AdminLayout: React.FC = () => {
  return (
    <Space direction='vertical' style={spaceStyle}>
      <Layout>
        <SiderAdmin />
        <Layout style={layoutRightStyled}>
          <HeaderAdmin />
          <ContentAdmin />
          <FooterAdmin />
        </Layout>
      </Layout>
    </Space>
  );
};
