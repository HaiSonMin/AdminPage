import styled from 'styled-components';
import { IoKeyOutline } from 'react-icons/io5';
import { HiOutlineLogout } from 'react-icons/hi';
import { useAuthApiLogout } from '@/apis-use';
import { SpinnerPage } from '@/components/loadings';
import { LOCAL_STORE_KEYS } from '@/constants/values';
import { useState } from 'react';
import { PopupChangePass } from '../../popup-change-pass/PopupChangePass';

const PopupUserFooterStyle = styled.div`
  margin: 0 1.2rem;
  padding: 1.2rem 0 1.5rem;

  .action {
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s;
    cursor: pointer;
    line-height: 1;
    padding: 1.4rem 1rem;
    color: var(--color-text);

    svg {
      width: 2rem;
      height: 2rem;
      color: var(--color-text-secondary);
    }

    &:hover {
      background-color: var(--color-grey-200);
    }
  }
  .action:last-child {
    color: red;
    svg {
      color: inherit;
    }
  }
`;

export const PopupUserFooter = () => {
  const { isLogout, logout } = useAuthApiLogout();
  const [isDisplayChangingPass, setIsDisplayChangingPass] =
    useState<boolean>(false);

  const onClosePass = () => setIsDisplayChangingPass(false);
  const onDisplayPopup = () => setIsDisplayChangingPass(true);

  const handleLogout = () => {
    logout(null, {
      onSuccess: () => {
        window.location.reload();
      },
    });
  };

  return (
    <>
      <PopupUserFooterStyle>
        {isLogout && <SpinnerPage />}
        <div className='action' onClick={onDisplayPopup}>
          <IoKeyOutline />
          Đổi mật khẩu
        </div>
        <div className='action' onClick={handleLogout}>
          <HiOutlineLogout />
          Đăng xuất
        </div>
      </PopupUserFooterStyle>
      <PopupChangePass
        onChangePass={() => {}}
        close={onClosePass}
        isDisplay={isDisplayChangingPass}
        title='Đổi mật khẩu đăng nhập'
      />
    </>
  );
};
