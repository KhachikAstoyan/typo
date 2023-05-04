import React, { PropsWithChildren } from "react";
import { Container } from "@/components/common/Container";
import { Header } from "@/components/Header";
import { Animate } from "@/components/common/Animate";

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container className="flex min-h-screen flex-col justify-between pb-[75px]">
      <Header />

      <Animate className="flex flex-grow">
        <div className="flex-grow">{children}</div>
      </Animate>

      {/* <Header /> */}
    </Container>
  );
};
