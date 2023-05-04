import { PropsWithChildren } from "react";
import styled from "@emotion/styled";

interface StatCardProps extends PropsWithChildren {
  title: string;
}

const StatCardWrapper = styled.div`
  background-color: ${(p) => p.theme.bgSecondary};
  border-radius: 0.5rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* display: inline-block; */

  /* width: 50%; */

  p {
    color: ${(p) => p.theme.textSecondary};
    position: relative;
    left: 2px;
  }

  div {
    font-size: 2.25rem;
    line-height: 2.5rem;
    color: ${(p) => p.theme.primary};
  }
`;

export const StatCard: React.FC<StatCardProps> = ({
  children,
  title,
  ...props
}) => {
  return (
    <StatCardWrapper>
      <p>{title}</p>
      <div>{children}</div>
    </StatCardWrapper>
  );
};
