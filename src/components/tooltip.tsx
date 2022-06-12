import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { TooltipWrapper, TooltipMessage } from "./tooltip.styled";

type Aligment = "right" | "left" | "top" | "bottom";

type Props = {
  alignment: Aligment;
  children: React.ReactNode;
  message: string;
  style?: Object;
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
  alignment = "top",
  message,
  ...rest
}) => {
  const popup = useRef<HTMLInputElement>(null);
  const [collisions, setCollisions] = useState<Collisions>({
    secureAlignment: alignment,
    top: false,
    right: false,
    bottom: false,
    left: false,
  });

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
      
      switch (alignment) {
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

      // if (alignment === "right") {
      //   new
      //   setSecure((secure) => ({
      //     ...secure,
      //     secureAlignment: right > windowWidth ? "left" : alignment,
      //     topModifier: top < 0 ? Math.abs(top) : 0,
      //     // leftModifier: top < 0 ? Math.abs(top) : 0,
      //   }));
      // }
      // if (alignment === "left") {
      //   setSecure((secure) => ({
      //     ...secure,
      //     secureAlignment: left < 0 ? "right" : alignment,
      //     topModifier: top < 0 ? Math.abs(top) : 0,
      //     // leftModifier: top < 0 ? Math.abs(top) : 0,
      //   }));
      // }
      // if (alignment === "top") {
      //   setSecure((secure) => ({
      //     ...secure,
      //     secureAlignment: top < 0 ? "bottom" : alignment,
      //     leftModifier:
      //       left < 0
      //         ? Math.abs(left)
      //         : right > windowWidth
      //         ? windowWidth - right
      //         : 0,
      //   }));
      // }

      // rest.debug &&
      //   console.log(
      //     left < 0
      //       ? Math.abs(left)
      //       : right > windowWidth
      //       ? windowWidth - right
      //       : 0
      //   );

      // if (alignment === "bottom") {
      //   setSecure((secure) => ({
      //     ...secure,
      //     secureAlignment: bottom > windowHeight ? "top" : alignment,
      //     // topModifier: top < 0 ? Math.abs(top) : 0,
      //     leftModifier:
      //       left < 0
      //         ? Math.abs(left)
      //         : right > windowWidth
      //         ? windowWidth - right
      //         : 0,
      //   }));
      // }
    }
  };

  useEffect(() => {
    verifyCollisions();

    // if (rest.debug && popup.current) {
    //   const popupRect = popup.current.getBoundingClientRect();
    //   const { innerWidth: windowWidth, innerHeight: windowHeight } = window;

    //   console.log({ popupRect, windowWidth, windowHeight });
    // }
  }, [alignment]);

  rest.debug && console.log(collisions);

  return (
    <TooltipWrapper {...rest}>
      <TooltipMessage
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
