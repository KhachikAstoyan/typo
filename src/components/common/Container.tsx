import styled from "@emotion/styled";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 768px) {
    padding: 0 2rem;
  }

  @media (min-width: 1024px) {
    padding: 0 3rem;
  }

  @media (min-width: 1280px) {
    padding: 0 4rem;
  }

  @media (min-width: 1536px) {
    padding: 0 5rem;
  }
`;
