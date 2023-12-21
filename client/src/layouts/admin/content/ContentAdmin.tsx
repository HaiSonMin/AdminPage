import { Outlet } from 'react-router-dom';
import styled, { CSSProperties } from 'styled-components';
import { Layout } from 'antd';
const { Content } = Layout;

const contentStyle: CSSProperties = {
  color: 'var(--color-text)',
  paddingTop: '1.5rem',
  paddingBottom: '8rem',
};

const ContentAdminStyle = styled.div`
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  background-color: 'var(--color-background-sidebar)';
`;

export const ContentAdmin = () => {
  return (
    <ContentAdminStyle>
      <Content style={contentStyle}>
        <Outlet />
      </Content>
    </ContentAdminStyle>
  );
};
