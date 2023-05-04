import React, { forwardRef, useImperativeHandle, useState } from "react";
import styled from "@emotion/styled";

interface CarretProps {
  blink: boolean;
}

interface IHandlers {
  changeCoords: (x: number, y: number) => any;
}

const animationString =
  "animation: blink-animation 1s steps(2, start) infinite; -webkit-animation: blink-animation 1s steps(2, start) infinite;";

const StyledCarret = styled.div<CarretProps>`
  ${(p) => (p.blink ? animationString : "")}
  height: 30px;
  width: 3px;
  position: absolute;
  background-color: ${(p) => p.theme.primary};
  transition: all 0.1s ease;
  border-radius: 1px;

  @keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }
  @-webkit-keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }
`;

const Carret = forwardRef<IHandlers, CarretProps>(({ blink }, ref) => {
  const [coords, setCoords] = useState<Coords>();
  useImperativeHandle(ref, () => ({
    changeCoords(x: number, y: number) {
      setCoords({ x, y });
    },
  }));

  if (!coords || !coords.x || !coords.y) return null;

  return (
    <StyledCarret
      blink={blink}
      style={{ left: coords.x - 2, top: coords.y + 1 }}
    ></StyledCarret>
  );
});

export default Carret;
