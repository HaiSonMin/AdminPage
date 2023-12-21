import { IOptionInput } from '@/interfaces/common';
import { Select } from 'antd';
import styled from 'styled-components';

const InputSelectSingleStyle = styled(Select)`
  width: 100%;
  font-size: var(--font-size-14);
  margin: 1rem 0 1.2rem;

  .ant-select {
    border-color: red;
  }
`;

interface IProps {
  options: IOptionInput[] | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  isRequired?: boolean;
  defaultValue?: string;
  allowClear?: boolean;
  isLoading?: boolean;
}

export const InputSelectSingle = ({
  placeholder,
  options,
  onChange,
  isRequired,
  defaultValue,
  allowClear = false,
  isLoading = false,
}: IProps) => {
  return (
    <InputSelectSingleStyle
      defaultValue={defaultValue}
      placeholder={
        <p style={{ color: 'var(--color-text-secondary)' }}>
          {placeholder}
          {isRequired && (
            <span style={{ color: 'var(--color-danger)' }}> (*)</span>
          )}
        </p>
      }
      allowClear={allowClear}
      options={options}
      onChange={onChange}
      loading={isLoading}
    />
  );
};
