import { useState } from 'react';
import { FaListUl } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getItem } from '@/helpers';
import { FiUsers } from 'react-icons/fi';
import { FaUserMd } from 'react-icons/fa';
import { IoMdLink } from 'react-icons/io';
import { CiDiscount1 } from 'react-icons/ci';
import { Layout, Menu, MenuProps } from 'antd';
import { useLocalStorage } from '@mantine/hooks';
import { ButtonIcon } from '@/components/buttons';
import { PieChartOutlined } from '@ant-design/icons';
import { LOCAL_STORE_KEYS } from '@/constants/values';
import styled, { CSSProperties } from 'styled-components';
import { PATH_ADMIN, PATH_ROOT_ADMIN } from '@/constants/paths';
import IconCom from '@/assets/images/image-logo/logo_seadragon_w127-h127.webp';
const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const NavLink = styled(Link)`
  /* font-size: var(--font-size-18); */
  span {
    font-size: 1.8rem;
  }
  svg {
    width: 2rem;
    height: 2rem;
  }
`;

const items: MenuItem[] = [
  getItem(
    'Trang chủ',
    'home',
    <NavLink to={`/${PATH_ROOT_ADMIN}/${PATH_ADMIN.DASHBOARD.ROOT}`}>
      <PieChartOutlined />
    </NavLink>
  ),
  getItem(
    'Khách hàng',
    'customers',
    <NavLink to={`/${PATH_ROOT_ADMIN}/${PATH_ADMIN.CUSTOMER.ROOT}`}>
      <FiUsers />
    </NavLink>
  ),
  getItem(
    'Quản lí webs',
    'webs',
    <NavLink to={`/${PATH_ROOT_ADMIN}/${PATH_ADMIN.WEB.ROOT}`}>
      <IoMdLink />
    </NavLink>
  ),
  getItem(
    'Voucher',
    'vouchers',
    <NavLink to={`/${PATH_ROOT_ADMIN}/${PATH_ADMIN.VOUCHER.ROOT}`}>
      <CiDiscount1 />
    </NavLink>
  ),
  getItem(
    'Tài khoản',
    'accounts',
    <NavLink to={`/${PATH_ROOT_ADMIN}/${PATH_ADMIN.EMPLOYEE.ROOT}`}>
      <FaUserMd />
    </NavLink>
  ),
];

const sideStyle: CSSProperties = {
  color: 'var(--color-text-sidebar)',
  // backgroundColor: '#fff',
  backgroundColor: 'var(--color-background-sidebar)',
  padding: '5px 1rem 0',
};

const menuStyled: CSSProperties = {
  borderInlineEnd: 'none',
  backgroundColor: 'var(--color-background-sidebar)',
};

const BoxTop = styled.div<{ $isCollapsed: boolean }>`
  display: flex;

  justify-content: ${(props) =>
    props.$isCollapsed ? 'center' : 'space-between'};
  align-items: center;
  padding: 1rem 5px 5px 5px;
`;

const Icon = styled.img`
  width: 3rem;
  height: 3rem;
`;

const MenuList = styled(Menu)`
  .ant-menu-item.ant-menu-item-active {
    color: var(--color-primary) !important;
    background-color: var(--color-primary-light) !important;
  }

  .ant-menu-item-selected {
    color: var(--color-primary) !important;
    background-color: var(--color-primary-light) !important;
  }

  .ant-menu-item {
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--color-text-secondary);
  }
`;

export const SiderAdmin = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dataStore] = useLocalStorage({ key: LOCAL_STORE_KEYS.DATA_USER });

  return (
    <Sider
      collapsed={isCollapsed}
      onCollapse={(value) => setIsCollapsed(value)}
      trigger={true}
      style={sideStyle}
      width={'22rem'}
    >
      <BoxTop $isCollapsed={isCollapsed}>
        <ButtonIcon
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={<FaListUl />}
        />
        {!isCollapsed && (
          <Link to={'/admin'}>
            <Icon src={IconCom} alt='Logo company' />
          </Link>
        )}
      </BoxTop>
      <MenuList
        mode='inline'
        defaultSelectedKeys={['home']}
        items={items}
        style={menuStyled}
      />
    </Sider>
  );
};
