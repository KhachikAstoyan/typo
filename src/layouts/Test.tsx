import styled from "@emotion/styled";
import React, { PropsWithChildren } from "react";
import { Header } from "@/components/Header";
import { Animate } from "@/components/common/Animate";
import { Container } from "@/components/common/Container";

const AppWrapper = styled.main`
  align-items: center;
  display: grid;
  gap: 2rem;
  grid-auto-flow: row;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  // bottom padding
  padding-bottom: 75px;
  width: 100%;
`;

const TestLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container className="flex min-h-screen flex-col justify-between">
      <AppWrapper>
        <Header />

        <Animate>{children}</Animate>

        {/* <Header /> */}
      </AppWrapper>
    </Container>
  );
};

export default TestLayout;
