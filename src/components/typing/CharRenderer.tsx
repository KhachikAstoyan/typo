import React, { useRef } from "react";
import styled from "@emotion/styled";
import Carret from "./Carret";

interface CharRendererProps {
  chars: string[];
  currentChar: number;
  errors: number[];
  extraChars: number[];
}

const CharWrapper = styled.div`
  overflow: hidden;
  max-width: 100%;

  span {
    font-size: 24px;
    display: inline;
  }

  .inactive {
    color: ${(p) => p.theme.inactiveCharColor};
  }

  .error {
    color: rgb(239, 68, 68);
    border-bottom: solid 1px rgb(239, 68, 68);
  }

  .typed {
    color: ${(p) => p.theme.typedCharColor};
  }
`;

const Characters: React.FC<CharRendererProps> = React.memo(
  ({ chars, extraChars, currentChar, errors }) => {
    const carretRef = useRef();

    return (
      <CharWrapper>
        {/* @ts-ignore */}
        <Carret blink={currentChar === 0} ref={carretRef} />
        {chars.map((char, id) => {
          let className = "inactive";
          if (id === currentChar) {
            return (
              <span
                className="inactive"
                ref={(ref) => {
                  if (ref && ref?.offsetLeft && ref?.offsetTop) {
                    // @ts-ignore
                    carretRef.current.changeCoords(
                      ref.offsetLeft,
                      ref.offsetTop
                    );
                  }
                }}
              >
                {char}
              </span>
            );
          } else if (errors.includes(id) || extraChars.includes(id)) {
            className = "error";
          } else if (id <= currentChar) {
            className = "typed";
          }

          return <span className={className}>{char}</span>;
        })}
      </CharWrapper>
    );
  }
);

export default Characters;
