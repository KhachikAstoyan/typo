import React, { PropsWithChildren } from "react";
import styled from "@emotion/styled";

const StyledImg = styled.img`
  object-fit: cover;
  width: ${(p) => p.width || "35"}px;
  height: ${(p) => p.height || "35"}px;
  border-radius: 50%;
`;

type Props = PropsWithChildren<React.ImgHTMLAttributes<HTMLImageElement>>;

export const UserAvatar: React.FC<Props> = (props) => {
  return <StyledImg {...props} referrerPolicy="no-referrer" />;
};
