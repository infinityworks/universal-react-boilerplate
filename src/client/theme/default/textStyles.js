import { css } from 'styled-components';

export const body = css`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const title = css`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;
