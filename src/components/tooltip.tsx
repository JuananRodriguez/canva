import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { TooltipWrapper, TooltipMessage } from "./tooltip.styled";

type Aligment = "right" | "left" | "top" | "bottom";

type Props = {
  alignment: Aligment;
  children: React.ReactNode;
  message: string;
  style?: Object;
  isOpen?: boolean;
  debug?: boolean;
};

type Collisions = {
  secureAlignment: Aligment;
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
};

export const Tooltip: React.FC<Props> = ({
  children,
  isOpen,
  alignment = "right",
  message,
  ...rest
}) => {
  const popup = useRef<HTMLInputElement>(null);
  const natureAlignment: Collisions = {
    secureAlignment: alignment,
    top: false,
    right: false,
    bottom: false,
    left: false,
  };
  const [visible, setVisible] = useState(isOpen);
  const [collisions, setCollisions] = useState<Collisions>(natureAlignment);

  const verifyCollisions = () => {
    if (popup.current) {
      const { right, left, top, bottom } =
        popup.current.getBoundingClientRect();

      const newCollisions = {
        top: top < 0,
        right: right > window.innerWidth,
        bottom: bottom > window.innerHeight,
        left: left < 0,
      };

      switch (collisions.secureAlignment) {
        case "top":
          return setCollisions({
            ...newCollisions,
            secureAlignment: newCollisions.top ? "bottom" : "top",
            top: false,
          });
        case "bottom":
          return setCollisions({
            ...newCollisions,
            secureAlignment: newCollisions.bottom ? "top" : "bottom",
            bottom: false,
          });
        case "left":
          return setCollisions({
            ...newCollisions,
            secureAlignment: newCollisions.left ? "right" : "left",
            left: false,
          });
        // right by default
        default:
          return setCollisions({
            ...newCollisions,
            secureAlignment: newCollisions.right ? "left" : "right",
            right: false,
          });
      }
    }
  };

  useEffect(() => {
    setTimeout(verifyCollisions, 0);
  }, [alignment, isOpen]);

  const handleHover = () => {
    isOpen === undefined && setVisible(true);
    setTimeout(verifyCollisions, 0);
  };

  const handleBlur = () => {
    isOpen === undefined && setVisible(false);
    setCollisions(natureAlignment);
  };

  return (
    <TooltipWrapper
      {...rest}
      onMouseEnter={handleHover}
      onMouseLeave={handleBlur}
    >
      <TooltipMessage
        className={visible ? "active" : "no-active"}
        ref={popup}
        alignment={collisions.secureAlignment}
        collisionTop={collisions.top}
        collisionRight={collisions.right}
        collisionBottom={collisions.bottom}
        collisionLeft={collisions.left}
      >
        {message}
      </TooltipMessage>
      {children}
    </TooltipWrapper>
  );
};
