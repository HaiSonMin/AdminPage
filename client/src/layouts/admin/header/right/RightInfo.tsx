import styled from 'styled-components';
import { User } from './user';
import { TbCategory } from 'react-icons/tb';
import { TbHome } from 'react-icons/tb';
import { Icon } from './Icon';
import { NotificationIcon } from './notification';
import { MessageIcon } from './message';

const RightInfoStyle = styled.div`
  display: flex;
  align-items: center;
`;

const BoxIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-right: 2rem;
`;

export const RightInfo = () => {
  return (
    <RightInfoStyle>
      <BoxIcon>
        <Icon>
          <TbHome />
        </Icon>
        <Icon>
          <TbCategory />
        </Icon>
        <MessageIcon />
        <NotificationIcon />
      </BoxIcon>
      <User />
    </RightInfoStyle>
  );
};
