import styled from 'styled-components';
import { Layout} from 'antd';

const { Content } = Layout;

export const StyledLayout = styled(Layout)`
  background: #585f5b;
  width: 500px;
  border-radius: 10px;
  height: 550px;
`;

export const StyledContent = styled(Content)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;