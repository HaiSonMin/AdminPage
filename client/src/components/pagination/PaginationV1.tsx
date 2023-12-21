/* eslint-disable react-hooks/exhaustive-deps */
import styled, { css } from 'styled-components';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { getQueries, randomKey } from '@/utils';
import { useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { EQuery } from '@/enums';
import { useQueriesString, useSetParams } from '@/hooks';
const PaginationV1Style = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const BoxAction = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CommonBtnAction = css`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  padding: 8px;
  border-radius: var(--border-radius-sm);

  &:hover {
    background-color: var(--color-primary-light);
    color: var(--color-primary);
    cursor: pointer;
  }
`;

const ButtonNumberAction = styled.div`
  ${CommonBtnAction}
  flex-shrink: 0;
  flex-grow: 1;
  font-size: 1.6rem;
  line-height: 1;
  font-weight: 500;

  &.active {
    background-color: var(--color-primary-light) !important;
    color: var(--color-primary) !important;
  }
`;

const ButtonIconAction = styled.div<{ $isDisable?: boolean }>`
  ${CommonBtnAction}
  ${(props) =>
    props.$isDisable &&
    css`
      background-color: var(--color-grey-200) !important;
      cursor: default !important;
    `}

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

interface IProps {
  totalItems?: number;
}

export const PaginationV1 = ({ totalItems = 10 }: IProps) => {
  const queryString = useQueriesString();
  const query = getQueries(queryString);

  const { setParams } = useSetParams();
  const [totalPages, setTotalPages] = useState<number>(() =>
    Math.ceil(totalItems / 10)
  );
  const [currentPage, setCurrentPage] = useState<number>(() => {
    if (query?.page) return query.page;
    return 1;
  });
  const [isDisablePre, setIsDisablePre] = useState<boolean>(false);
  const [isDisableNext, setIsDisableNext] = useState<boolean>(false);

  const clickPage = (page: number) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((pre) => pre + 1);
  };

  const prePage = () => {
    if (currentPage > 1) setCurrentPage((pre) => pre - 1);
  };

  const firstPage = () => setCurrentPage(1);

  const lastPage = () => setCurrentPage(totalPages);

  useEffect(() => {
    if (currentPage === totalPages) setIsDisableNext(true);
    if (currentPage !== totalPages) setIsDisableNext(false);

    if (currentPage === 1) setIsDisablePre(true);
    if (currentPage !== 1) setIsDisablePre(false);

    if (totalItems) setTotalPages((pre) => Math.ceil(totalItems / 10));

    setParams(EQuery.PAGE, `${currentPage}`);
  }, [currentPage, totalPages, totalItems]);

  return (
    <PaginationV1Style>
      <BoxAction>
        {/* Go to next  */}
        <ButtonIconAction onClick={prePage} $isDisable={isDisablePre}>
          <GrFormPrevious />
        </ButtonIconAction>
      </BoxAction>
      <BoxAction>
        {totalPages <= 5 ? (
          Array.from({ length: totalPages }, (_, index) => index + 1)
            .slice(0, 5)
            .map((numberPage) => (
              <ButtonNumberAction
                className={currentPage === numberPage ? 'active' : ''}
                // className='active'
                onClick={() => clickPage(numberPage)}
                key={randomKey()}
              >
                {numberPage}
              </ButtonNumberAction>
            ))
        ) : (
          <>
            {currentPage >= 4 && totalPages >= 6 && (
              <>
                <ButtonNumberAction onClick={firstPage}>1</ButtonNumberAction>
                <ButtonIconAction>
                  <HiOutlineDotsHorizontal />
                </ButtonIconAction>
              </>
            )}
            {currentPage <= 3 &&
              Array.from({ length: totalPages }, (_, index) => index + 1)
                .slice(0, 5)
                .map((numberPage) => (
                  <ButtonNumberAction
                    className={currentPage === numberPage ? 'active' : ''}
                    // className='active'
                    onClick={() => clickPage(numberPage)}
                    key={randomKey()}
                  >
                    {numberPage}
                  </ButtonNumberAction>
                ))}

            {currentPage > 3 &&
              totalPages > currentPage + 2 &&
              Array.from({ length: totalPages }, (_, index) => index + 1)
                .slice(currentPage - 2, currentPage + 1)
                .map((numberPage) => (
                  <ButtonNumberAction
                    className={currentPage === numberPage ? 'active' : ''}
                    // className='active'
                    onClick={() => clickPage(numberPage)}
                    key={randomKey()}
                  >
                    {numberPage}
                  </ButtonNumberAction>
                ))}

            {totalPages <= currentPage + 2 &&
              Array.from({ length: totalPages }, (_, index) => index + 1)
                .slice(totalPages - 5)
                .map((numberPage) => (
                  <ButtonNumberAction
                    className={currentPage === numberPage ? 'active' : ''}
                    // className='active'
                    onClick={() => clickPage(numberPage)}
                    key={randomKey()}
                  >
                    {numberPage}
                  </ButtonNumberAction>
                ))}

            {/* Last Page */}
            {totalPages >= 6 && totalPages > currentPage + 2 && (
              <>
                <ButtonIconAction>
                  <HiOutlineDotsHorizontal />
                </ButtonIconAction>
                <ButtonNumberAction onClick={lastPage}>
                  {totalPages}
                </ButtonNumberAction>
              </>
            )}
          </>
        )}
      </BoxAction>

      <BoxAction>
        {/* Go to next  */}
        <ButtonIconAction onClick={nextPage} $isDisable={isDisableNext}>
          <GrFormNext />
        </ButtonIconAction>
      </BoxAction>
    </PaginationV1Style>
  );
};
