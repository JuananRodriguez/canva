import styled, { css, FlattenSimpleInterpolation } from "styled-components";

type Aligment = "right" | "left" | "top" | "bottom";

const ARROW_SIZE_PX = 8;

interface TooltipMessageProps {
  alignment: Aligment;
  collisionTop?: boolean;
  collisionRight?: boolean;
  collisionBottom?: boolean;
  collisionLeft?: boolean;
}

type GetMessagePosition = (
  TooltipProps: TooltipMessageProps
) => FlattenSimpleInterpolation;

type GetArrowPosition = (
  TooltipProps: TooltipMessageProps
) => FlattenSimpleInterpolation;

const getMessagePosition: GetMessagePosition = ({
  alignment,
  collisionTop,
  collisionRight,
  collisionBottom,
  collisionLeft,
}) => {
  switch (alignment) {
    case "top":
      return css`
        top: 0;
        transform: translate(
          ${collisionLeft || collisionRight ? 0 : "-50%"},
          calc(-100% - ${ARROW_SIZE_PX}px)
        );
        right: ${collisionRight ? "1px" : collisionLeft ? "auto" : "50%"};
        left: ${collisionLeft ? "1px" : collisionRight ? "auto" : "50%"};
      `;
    case "bottom":
      return css`
        top: 100%;
        transform: translate(
          ${collisionLeft || collisionRight ? 0 : "-50%"},
          ${ARROW_SIZE_PX}px
        );
        right: ${collisionRight ? "1px" : collisionLeft ? "auto" : "50%"};
        left: ${collisionLeft ? "1px" : collisionRight ? "auto" : "50%"};
      `;
    case "left":
      return css`
        transform: translate(
          calc(-100% - ${ARROW_SIZE_PX}px),
          ${collisionTop || collisionBottom ? 0 : "-50%"}
        );
        top: ${collisionTop ? "1px" : collisionBottom ? "auto" : "50%"};
        bottom: ${collisionBottom ? "1px" : "auto"};
        right: ${collisionRight ? "1px" : "auto"};
        left: ${collisionLeft ? "1px" : "auto"};
      `;
    // right by default
    default:
      return css`
        transform: translate(
          ${ARROW_SIZE_PX}px,
          ${collisionTop || collisionBottom ? 0 : "-50%"}
        );
        top: ${collisionTop ? "1px" : collisionBottom ? "auto" : "50%"};
        bottom: ${collisionBottom ? "1px" : "auto"};
        right: ${collisionRight ? "1px" : "auto"};
        left: ${collisionLeft ? "1px" : "100%"};
      `;
  }
};

const getArrowPosition: GetArrowPosition = ({
  alignment,
  collisionTop,
  collisionBottom,
}) => {
  switch (alignment) {
    case "top":
      return css`
        border-color: black transparent transparent transparent;
        top: 100%;
        left: 50%;
        margin-left: -${ARROW_SIZE_PX}px;
      `;
    case "bottom":
      return css`
        border-color: transparent transparent black transparent;
        bottom: 100%;
        left: 50%;
        margin-left: -${ARROW_SIZE_PX}px;
      `;
    case "left":
      return css`
        border-color: transparent transparent transparent black;
        left: 100%;
        top: ${collisionTop ? "4px" : collisionBottom ? "auto" : "50%"};
        margin-top: ${collisionTop
          ? "0px"
          : collisionBottom
          ? "auto"
          : -ARROW_SIZE_PX + "px"};
      `;
    // right by default
    default:
      return css`
        border-color: transparent black transparent transparent;
        right: 100%;
        top: ${collisionTop ? "4px" : collisionBottom ? "auto" : "50%"};
        margin-top: ${collisionTop
          ? "0px"
          : collisionBottom
          ? "auto"
          : -ARROW_SIZE_PX + "px"};
      `;
  }
};

export const TooltipMessage = styled.div<TooltipMessageProps>`
  /* display: none; */
  visibility: hidden;
  background: black;
  color: white;
  position: absolute;
  padding: 0.25em 0.5em;
  border-radius: 0.25em;
  min-width: 250px;
  z-index: 1;
  box-sizing: border-box;

  ${getMessagePosition}

  &:after {
    content: " ";
    position: absolute;
    border-width: ${ARROW_SIZE_PX}px;
    border-style: solid;
    ${getArrowPosition}
  }
`;

export const TooltipWrapper = styled.div`
  position: relative;

  &:hover ${TooltipMessage} {
    display: block;
    visibility: visible;
  }
`;
