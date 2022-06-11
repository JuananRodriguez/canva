import { log } from "console";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { TooltipWrapper, TooltipMessage } from "./tooltip.styled";

type Props = {
  alignment: "right" | "left" | "top" | "bottom";
  children: React.ReactNode;
  message: string;
  style?: Object;
};

export const Tooltip: React.FC<Props> = ({
  children,
  alignment,
  message,
  ...rest
}) => {
  const wrapper = useRef<HTMLInputElement>(null);
  const popup = useRef<HTMLInputElement>(null);

  // const [rect, setRect] = useState({
  //   height: 0,
  //   bottom: 0,
  //   right: 0,
  //   left: 0,
  //   width: 0,
  //   x: 0,
  //   y: 0,
  // });
  // const [rectWrapper, setRectWrapper] = useState({
  //   height: 0,
  //   bottom: 0,
  //   right: 0,
  //   left: 0,
  //   width: 0,
  //   x: 0,
  //   y: 0,
  // });

  // useLayoutEffect(() => {
  //   if (popup.current && wrapper.current) {
  //     const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
  //     // console.log(windowWidth, windowHeight);
  //     const rect = popup.current.getBoundingClientRect();
  //     setRect(rect);
  //     const rectWrapper = wrapper.current.getBoundingClientRect();
  //     setRectWrapper(rectWrapper);
  //     // const { height, width, x, y } = rect;
  //     console.log({ rect, rectWrapper });

  //     // if width + x > windowWidth ( right overflow )
  //     // then -rect.x + rect.width - window.innerWidth
  //   }
  // }, []);

  // let translateX = rectWrapper.width;
  // let translateY = rectWrapper.height;

  // if (rect.right >= window.innerWidth) {
  //   console.log(rect.right + rect.width);
  //   translateX =
  //     window.innerWidth - rect.right + rect.width + rectWrapper.width;
  // }

  // if (rect.bottom + rectWrapper.height >= window.innerHeight) {
  //   translateY = window.innerHeight - rect.bottom - rectWrapper.height;
  // }

  return (
    <TooltipWrapper ref={wrapper} {...rest}>
      <TooltipMessage ref={popup} alignment={alignment}>
        {message}
      </TooltipMessage>
      {children}
    </TooltipWrapper>
  );
};
