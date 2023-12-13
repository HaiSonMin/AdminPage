import styled from 'styled-components';

const ItemChatStyle = styled.li`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 2.2rem;
  cursor: pointer;
  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const AvatarRoomChat = styled.div`
  flex-shrink: 0;
  flex-grow: 1;
  line-height: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size-22);
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: #6fa9ab;
  color: #fff;
`;

const AvatarLastChat = styled.img`
  position: absolute;
  bottom: 0rem;
  right: 0rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: contain;
`;

const ContentChat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: hidden;

  .room-name {
    font-weight: 500;
  }
  .last-mes {
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 20px;
    color: var(--color-text-secondary);

    &-user {
      font-weight: 500;
    }
  }
`;

const ROOM_NAME = 'Chat';
export function ItemChat() {
  return (
    <ItemChatStyle>
      <AvatarRoomChat>
        <span>{ROOM_NAME.slice(0, 1)}</span>
        <AvatarLastChat
          src='https://klain.1office.vn/f/p/TDI0OHg4d045SHpkUkF0d2REV0NRQ1pCZlJnWFhlMlJrODd4TFhkb2JTVFphRDFpL3llNFg4WFI4dytibExGNUFSY1RuKzNIVC9KL0wzR2RwRFZvUkRsV3ZjOXFuWUgwUVk0NTlqN0dWWmZUTjI4TA/836792671656fe89761e31906404218.06.12.2023.small.png'
          alt='Avatar chat'
        />
      </AvatarRoomChat>
      <ContentChat>
        <p className='room-name'>{ROOM_NAME}</p>
        <p className='last-mes'>
          <span className='last-mes-user'>Bạn: </span> Alo chơi vé số không em
          trai kkkkkkkkkkkkkkkkkkkk
        </p>
      </ContentChat>
    </ItemChatStyle>
  );
}
