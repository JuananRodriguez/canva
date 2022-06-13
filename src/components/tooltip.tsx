import { useEffect, useLayoutEffect, useCallback, useRef, useState } from "react";
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
  const secureAlignment = useRef<Aligment>(alignment);
  const natureAlignment: Collisions = {
    top: false,
    right: false,
    bottom: false,
    left: false,
  };
  const [visible, setVisible] = useState(isOpen);
  const [collisions, setCollisions] = useState<Collisions>(natureAlignment);

  const verifyCollisions = useCallback(() => {
    if (popup.current) {
      const { right, left, top, bottom } =
        popup.current.getBoundingClientRect();

      const newCollisions = {
        top: top < 0,
        right: right > window.innerWidth,
        bottom: bottom > window.innerHeight,
        left: left < 0,
      };

      switch (secureAlignment.current) {
        case "top":
          secureAlignment.current = newCollisions.top ? "bottom" : "top";
          return setCollisions({ ...newCollisions, top: false });
        case "bottom":
          secureAlignment.current = newCollisions.bottom ? "top" : "bottom";
          return setCollisions({ ...newCollisions, bottom: false });
        case "left":
          secureAlignment.current = newCollisions.left ? "right" : "left";
          return setCollisions({ ...newCollisions, left: false });
        // right by default
        default:
          secureAlignment.current = newCollisions.right ? "left" : "right";
          return setCollisions({ ...newCollisions, right: false });
      }
    }
  }, []);

  useLayoutEffect(() => {
    setTimeout(verifyCollisions, 0);
  }, [alignment, isOpen, verifyCollisions]);

  useLayoutEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  const handleHover = () => {
    if (isOpen === undefined) {
      setVisible(true);
      setTimeout(verifyCollisions, 0);
    }
  };

  const handleBlur = () => {
    if (isOpen === undefined) {
      setVisible(false);
      setCollisions(natureAlignment);
    }
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
        alignment={secureAlignment.current}
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
