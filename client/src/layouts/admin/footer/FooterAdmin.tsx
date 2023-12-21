import { Layout } from 'antd';
import { CSSProperties } from 'styled-components';
const { Footer } = Layout;

const footerStyle: CSSProperties = {
  position: 'fixed',
  height: '6rem',
  bottom: 0,
  width: '100%',
  display: 'flex',
  marginTop: '2px',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
  color: 'var(--color-text-secondary)',
  fontSize: 'var(--font-size-12)',
};

export const FooterAdmin = () => {
  return (
    <Footer style={footerStyle}>
      Công ty Sicnew. Địa chỉ văn phòng: 126 Nguyễn Trãi, Quận 5, Thành phố Hồ
      Chí Minh, Việt Nam. Điện thoại: 034.529.9087
    </Footer>
  );
};
