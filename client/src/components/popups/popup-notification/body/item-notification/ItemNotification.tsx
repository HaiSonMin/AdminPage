import styled from 'styled-components';

const ItemNotificationStyle = styled.li`
  border-bottom: 1px solid var(--color-grey-200);
`;

const Title = styled.p`
  font-size: 1.4rem;
  padding: 1.5rem;
  line-height: 1rem;
  font-weight: 500;
`;

const NotifiBox = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: flex-start;
  padding: 1.2rem 1.5rem;
  cursor: pointer;
  &:hover {
    background-color: var(--color-grey-100);
  }

  .dot-unchecked {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: var(--color-red-600);
  }

  .avatar {
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      object-fit: contain;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &-noti {
      font-size: var(--font-size-14);
      line-height: 1.4;
      color: var(--color-text-secondary);
      .user-name {
        font-weight: 600;
        text-transform: uppercase;
        color: var(--color-text);
        letter-spacing: -0.3px;
      }
    }

    &-time {
      font-size: var(--font-size-12);
      color: var(--color-text-secondary);
      line-height: 1;
    }
  }
`;
export const ItemNotification = () => {
  return (
    <ItemNotificationStyle>
      <Title>Hôm nay</Title>
      <NotifiBox>
        <div className='avatar'>
          <div className='dot-unchecked' />
          <img
            src='https://klain.1office.vn/f/p/TDI0OHhzd045SHpkUkF0d2REV0NRQ1pCZlJnWFcrMlJrODd4TFhkb1pDN1lhemRvK1NPL1VjYlQ4MStXbTdJc1V4QVl6T0RBVGY5N0tIcWVyQ3gyUWlOSnY5aDJuNFAxWE5NbitqUEdGOG5OUGlvUyt3PT0/197438036864f5564ccb8b4749439207.04.09.2023.small.png'
            alt='Avatar user'
          />
        </div>
        <div className='content'>
          <p className='content-noti'>
            <span className='user-name'>Nguyễn Đức Nghĩa</span>,{' '}
            <span className='user-name'>La Thái Tuấn Phong</span> đã duyệt 2 đơn
            checking/out
          </p>
          <span className='content-time'>4 giờ trước</span>
        </div>
      </NotifiBox>
      <NotifiBox>
        <div className='avatar'>
          <div className='dot-unchecked' />
          <img
            src='https://klain.1office.vn/f/p/TDI0OHhzd045SHpkUkF0d2REV0NRQ1pCZlJnWFcrMlJrODd4TFhkb1pDN1lhemRvK1NPL1VjYlQ4MStXbTdJc1V4QVl6T0RBVGY5N0tIcWVyQ3gyUWlOSnY5aDJuNFAxWE5NbitqUEdGOG5OUGlvUyt3PT0/197438036864f5564ccb8b4749439207.04.09.2023.small.png'
            alt='Avatar user'
          />
        </div>
        <div className='content'>
          <p className='content-noti'>
            <span className='user-name'>Nguyễn Đức Nghĩa</span>,{' '}
            <span className='user-name'>La Thái Tuấn Phong</span> đã duyệt 2 đơn
            checking/out
          </p>
          <span className='content-time'>4 giờ trước</span>
        </div>
      </NotifiBox>
      <NotifiBox>
        <div className='avatar'>
          <div className='dot-unchecked' />
          <img
            src='https://klain.1office.vn/f/p/TDI0OHhzd045SHpkUkF0d2REV0NRQ1pCZlJnWFcrMlJrODd4TFhkb1pDN1lhemRvK1NPL1VjYlQ4MStXbTdJc1V4QVl6T0RBVGY5N0tIcWVyQ3gyUWlOSnY5aDJuNFAxWE5NbitqUEdGOG5OUGlvUyt3PT0/197438036864f5564ccb8b4749439207.04.09.2023.small.png'
            alt='Avatar user'
          />
        </div>
        <div className='content'>
          <p className='content-noti'>
            <span className='user-name'>Nguyễn Đức Nghĩa</span>,{' '}
            <span className='user-name'>La Thái Tuấn Phong</span> đã duyệt 2 đơn
            checking/out
          </p>
          <span className='content-time'>4 giờ trước</span>
        </div>
      </NotifiBox>
      <NotifiBox>
        <div className='avatar'>
          <div className='dot-unchecked' />
          <img
            src='https://klain.1office.vn/f/p/TDI0OHhzd045SHpkUkF0d2REV0NRQ1pCZlJnWFcrMlJrODd4TFhkb1pDN1lhemRvK1NPL1VjYlQ4MStXbTdJc1V4QVl6T0RBVGY5N0tIcWVyQ3gyUWlOSnY5aDJuNFAxWE5NbitqUEdGOG5OUGlvUyt3PT0/197438036864f5564ccb8b4749439207.04.09.2023.small.png'
            alt='Avatar user'
          />
        </div>
        <div className='content'>
          <p className='content-noti'>
            <span className='user-name'>Nguyễn Đức Nghĩa</span>,{' '}
            <span className='user-name'>La Thái Tuấn Phong</span> đã duyệt 2 đơn
            checking/out
          </p>
          <span className='content-time'>4 giờ trước</span>
        </div>
      </NotifiBox>
      <NotifiBox>
        <div className='avatar'>
          <div className='dot-unchecked' />
          <img
            src='https://klain.1office.vn/f/p/TDI0OHhzd045SHpkUkF0d2REV0NRQ1pCZlJnWFcrMlJrODd4TFhkb1pDN1lhemRvK1NPL1VjYlQ4MStXbTdJc1V4QVl6T0RBVGY5N0tIcWVyQ3gyUWlOSnY5aDJuNFAxWE5NbitqUEdGOG5OUGlvUyt3PT0/197438036864f5564ccb8b4749439207.04.09.2023.small.png'
            alt='Avatar user'
          />
        </div>
        <div className='content'>
          <p className='content-noti'>
            <span className='user-name'>Nguyễn Đức Nghĩa</span>,{' '}
            <span className='user-name'>La Thái Tuấn Phong</span> đã duyệt 2 đơn
            checking/out
          </p>
          <span className='content-time'>4 giờ trước</span>
        </div>
      </NotifiBox>
    </ItemNotificationStyle>
  );
};
