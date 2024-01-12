import { getStateCollapsedSide } from '@/slices/layoutSlice';
import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { CSSProperties } from 'styled-components';
const { Footer } = Layout;

const footerStyle: CSSProperties = {
  position: 'fixed',
  bottom: 0,
  width: 'calc(100% - 80px)',
  marginTop: '2px',
  backgroundColor: '#fff',
  color: 'var(--color-text-secondary)',
  padding: '1rem 2rem',
};

const ContainerFooter = styled.div`
  height: 5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--font-size-12);
`;

export const FooterAdmin = () => {
  const isCollapsedSide = useSelector(getStateCollapsedSide);

  const footerStyle: CSSProperties = {
    position: 'fixed',
    bottom: 0,
    width: `calc(100% - ${isCollapsedSide ? '80px' : '22rem'})`,
    marginTop: '2px',
    backgroundColor: '#fff',
    color: 'var(--color-text-secondary)',
    padding: '1rem 2rem',
    transition: 'all 0.3s',
  };

  return (
    <Footer style={footerStyle}>
      <ContainerFooter>
        <span>Công ty TNHH Công Nghệ Rồng Biển</span>
        <span>Phiên bản 1.0</span>
      </ContainerFooter>
    </Footer>
  );
};
