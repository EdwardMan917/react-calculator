import styled from 'styled-components';
import { Button } from 'antd';

export const StyledButtonContainer = styled.div`
  height: 100%;
  display: flex;
  padding: 1.2rem;
  flex-wrap: wrap;
`;

export const StyledButton = styled(Button)`
  display: flex;
  width: 100%;
  margin: 0.2rem;
  height: 100%;
  width: 100px;
  margin: 0.2rem; 
  flex-basis: 100%;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;
