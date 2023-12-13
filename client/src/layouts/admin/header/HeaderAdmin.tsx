import { Layout } from 'antd';
import { CSSProperties } from 'styled-components';
import { LeftInfo } from './left';
import { RightInfo } from './right';
const { Header } = Layout;

const headerStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '2rem 2rem 2rem 1.5rem',
  backgroundColor: '#fff',
  alignItems: 'center',
  boxShadow: '0 0 2px 0 #bdbdbd',
  //   position: 'fixed',
};

export const HeaderAdmin = () => {
  return (
    <Header style={headerStyle}>
      <LeftInfo />
      <RightInfo />
    </Header>
  );
};
