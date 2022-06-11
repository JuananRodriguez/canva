import { PropsWithChildren } from "react";
import styled from "styled-components";

type Props = PropsWithChildren & {
  color: React.ReactNode;
};

export const DummyBox: React.FC<Props> = styled.div`
  width: 210px;
  height: 30px;
  background-color: ${({ color }) => color};
  cursor: pointer;
`;
