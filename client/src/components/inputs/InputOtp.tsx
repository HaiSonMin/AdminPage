import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import styled from 'styled-components';

const InputOtpStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const InputOtpCode = styled.input`
  /* padding: 1.5rem 2.8rem; */
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-grey-300);
  width: 6.5rem;
  height: 5rem;
  text-align: center;
  font-size: var(--font-size-18);
  font-weight: 500;
  &:focus {
    background-color: var(--color-primary-light);
    border: 1px solid var(--color-primary);
  }
`;

interface IProps {
  otpValues: Array<string>;
  setOtpValues: Dispatch<SetStateAction<string[]>>;
}

export const InputOtp = ({ otpValues, setOtpValues }: IProps) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const keyEventNumber = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const newOtpValues = [...otpValues];

    if (e.key === 'Backspace' && index >= 0) {
      // Move focus to the previous input field on Backspace
      newOtpValues[index] = '';
      setOtpValues(newOtpValues);
      if (index != 0) inputRefs.current[index - 1]?.focus();
    }
    if (keyEventNumber.includes(e.key)) {
      newOtpValues[index] = e.key;
      setOtpValues(newOtpValues);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = () => {
    console.log('Paste right there');
  };

  useEffect(() => {
    // Cleanup inputRefs.current when the component unmounts
    return () => {
      inputRefs.current = [];
    };
  }, []);

  return (
    <InputOtpStyle>
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index}>
          {/* Adding a unique key for each div */}
          <InputOtpCode
            type='tel'
            min={0}
            max={9}
            pattern='[0-9]'
            maxLength={1}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            onChange={() => {}}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            value={otpValues[index]}
            autoFocus={index === 0}
          />
        </div>
      ))}
    </InputOtpStyle>
  );
};
