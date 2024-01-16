import { Select, Space } from 'antd';
import { IOptionInput } from '@/interfaces/common';
import styled from 'styled-components';

const SelectStyle = styled(Select)`
  padding: 1rem 0;
  width: 100%;
  .ant-select-selector {
    padding: 5px 1rem;
    cursor: pointer !important;
  }

  .ant-select-selection-search {
    margin-inline-start: 0 !important;
  }

  .ant-select-selection-item {
    align-items: center;
    padding: 1rem 1.8rem;
    border-radius: var(--border-radius-md);
    gap: 5px;

    &-content {
      line-height: 1.4;
      font-weight: 500;
      font-size: var(--font-size-13);
    }

    &-remove {
      transition: all 0.3s;
      &:hover {
        scale: 1.4;
      }
    }
  }
`;

interface IProps {
  defaultValue: string[];
  options: IOptionInput[];
  placeholder: string;
  handleChangeSelect: (values: string[]) => void;
}

export function InputSelectMulti({
  defaultValue,
  options,
  placeholder,
  handleChangeSelect,
}: IProps) {
  return (
    <SelectStyle
      mode='multiple'
      allowClear
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={handleChangeSelect}
      options={options}
    />
  );
}
