import styled from "@emotion/styled";
import { Keyboard } from "./KeyboardIcon";

const StyledIcon = styled(Keyboard)`
  height: 2rem;
  fill: ${(p) => p.theme.primary};
  aspect-ratio: 1 / 1;
`;

// StyledIcon.defaultProps = { theme: mainTheme };

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <StyledIcon />
      <h1 className="text-gray-100">typo.io</h1>
    </div>
  );
};

export default Logo;
