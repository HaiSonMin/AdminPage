import { randomKey } from '@/utils';
import React, { useState } from 'react';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import styled, { css } from 'styled-components';

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 2px 1.2rem;
  padding-top: 2rem;
  font-size: 1.4rem;
  left: 0px;
  border: none;
  border-radius: 1rem;
  background-color: transparent;
  border-bottom: solid 2px var(--color-grey-200);
  font-weight: 500;
  &:focus {
    border-color: 'var(--color-primary)';
    border-bottom: solid 2px var(--color-primary);
    outline: none;
  }
`;

const Label = styled.label<{ $focused: boolean; $hasValue: boolean }>`
  position: absolute;
  transition: all 0.3s;
  ${(props) =>
    props.$focused || props.$hasValue
      ? css`
          left: 0.5rem;
          top: 0.4rem;
        `
      : css`
          left: 1.2rem;
          top: 2rem;
        `};
  font-size: ${(props) =>
    props.$focused || props.$hasValue ? '1.2rem' : '1.4rem'};
  color: ${(props) =>
    props.$focused ? 'var(--color-primary)' : 'var(--color-text-secondary)'};
  cursor: auto;

  .required {
    color: var(--color-danger);
    font-weight: 500;
  }
`;

const ShowPasswordButton = styled.button<{ $showPassword: boolean }>`
  position: absolute;
  right: 1rem;
  top: 2.8rem;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: ${(props) =>
    props.$showPassword ? 'var(--color-primary)' : 'inherit'};
`;

const ErrorInput = styled.p`
  margin-top: 5px;
  color: var(--color-danger);
  font-size: 1.1rem;
  font-weight: 600;
  text-align: left;
`;

interface IProps {
  id?: string;
  type: React.HTMLInputTypeAttribute;
  label: string;
  register: any;
  hasValue: boolean;
  children?: React.ReactNode;
  error?: string;
  autoFocus?: boolean;
  isRequired: boolean;
}

export function InputInfo({
  type,
  id = randomKey(),
  label,
  error,
  children,
  register,
  hasValue,
  autoFocus,
  isRequired,
}: IProps) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputFocus = () => setFocused(true);

  const handleInputBlur = () => setFocused(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <InputContainer>
      <Input
        type={type !== 'password' ? type : showPassword ? 'text' : type}
        id={id}
        {...register}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        autoComplete='true'
        autoFocus={autoFocus || false}
      />
      <Label htmlFor={id} $focused={focused} $hasValue={hasValue}>
        {label} {isRequired && <span className='required'>(*)</span>}
      </Label>
      {type === 'password' && (
        <ShowPasswordButton
          tabIndex={-1}
          type='button'
          onClick={toggleShowPassword}
          $showPassword={showPassword}
        >
          {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
        </ShowPasswordButton>
      )}
      {children}
      {error && <ErrorInput>{error}</ErrorInput>}
    </InputContainer>
  );
}
