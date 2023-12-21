import styled, { css } from 'styled-components';
import { IoIosSearch } from 'react-icons/io';
import { MdOutlineCancel } from 'react-icons/md';
import { useState } from 'react';
const InputSearchStyle = styled.div`
  position: relative;
  width: 100%;

  &:focus {
    outline: 2px solid var(--color-primary);
  }

  input {
    width: 100%;
    line-height: 1;
    transition: all 0.2s;
    color: var(--color-text);
    padding: 8px 3.5rem 8px 3.5rem;
    border-radius: var(--border-radius-md);
    background-color: var(--color-grey-100);
    border: 1px solid var(--color-grey-300);
    font-size: var(--font-size-12);
    font-weight: 500;

    &::placeholder {
      color: var(--color-text-secondary);
    }
  }
`;

const commonIconCss = css`
  position: absolute;
  top: 50%;
  width: 2rem;
  height: 2rem;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--color-grey-400) !important;

  &:hover {
    color: var(--color-grey-700) !important;
  }
`;

const IConSearch = styled(IoIosSearch)<{ $onFocus: boolean }>`
  left: 1rem;
  ${commonIconCss}
`;
const IconRemove = styled(MdOutlineCancel)`
  right: 1rem;
  ${commonIconCss}
`;

export function InputSearchV2() {
  const [valueSearch, setValueSearch] = useState<string>('');

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(e.target.value);
  };

  const handleSearch = () => {
    console.log('Search Term:::', valueSearch);
  };

  const handleClearInput = () => {
    setValueSearch('');
  };

  return (
    <InputSearchStyle>
      <input
        placeholder='Tìm kiếm mọi người'
        onChange={handleChangeSearch}
        value={valueSearch}
      />
      <IConSearch onClick={handleSearch} />
      <IconRemove onClick={handleClearInput} />
    </InputSearchStyle>
  );
}
