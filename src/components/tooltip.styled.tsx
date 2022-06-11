import styled, { css, FlattenSimpleInterpolation } from "styled-components";

export const TooltipWrapper = styled.div`
  position: relative;
`;

type Aligment = "right" | "left" | "top" | "bottom";

interface TooltipMessageProps {
  alignment: Aligment;
}

const ARROW_SIZE_PX = 8;

function getMessagePosition(alignment: Aligment): FlattenSimpleInterpolation {
  switch (alignment) {
    case "top":
      return css`
        transform: translate(-50%, calc(-100% - ${ARROW_SIZE_PX}px));
        top: 0%;
        left: 50%;
      `;
    case "bottom":
      return css`
        transform: translate(-50%, calc(0% + ${ARROW_SIZE_PX}px));
        top: 100%;
        left: 50%;
      `;
    case "left":
      return css`
        transform: translate(calc(-100% - ${ARROW_SIZE_PX}px), -50%);
        top: 50%;
        left: 0;
      `;
    // right by default
    default:
      return css`
        transform: translate(calc(0% + ${ARROW_SIZE_PX}px), -50%);
        top: 50%;
        left: 100%;
      `;
  }
}

function getArrowPosition(alignment: Aligment): FlattenSimpleInterpolation {
  switch (alignment) {
    case "top":
      return css`
        top: 100%;
        left: 50%;
        margin-left: -${ARROW_SIZE_PX}px;
        border-color: black transparent transparent transparent;
      `;
    case "bottom":
      return css`
        bottom: 100%;
        left: 50%;
        margin-left: -${ARROW_SIZE_PX}px;
        border-color: transparent transparent black transparent;
      `;
    case "left":
      return css`
        top: 50%;
        left: 100%;
        margin-top: -${ARROW_SIZE_PX}px;
        border-color: transparent transparent transparent black;
      `;
    // right by default
    default:
      return css`
        top: 50%;
        right: 100%;
        margin-top: -${ARROW_SIZE_PX}px;
        border-color: transparent black transparent transparent;
      `;
  }
}

export const TooltipMessage = styled.div<TooltipMessageProps>`
  background: black;
  color: white;
  position: absolute;
  padding: 0.25em 0.5em;
  border-radius: 0.25em;
  min-width: 250px;

  ${({ alignment }) => getMessagePosition(alignment)}

  &:after {
    content: " ";
    position: absolute;
    border-width: ${ARROW_SIZE_PX}px;
    border-style: solid;
    ${({ alignment }) => getArrowPosition(alignment)}
  }
`;
