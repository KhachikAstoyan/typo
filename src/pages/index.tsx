import { type NextPage } from "next";
// import { TypingTest } from "../components/typing";
import TestLayout from "@/layouts/Test";
import dynamic from "next/dynamic";
import { Spinner } from "@/components/common/Spinner";
import { Center } from "@/components/common/Center";

const TypingTest = dynamic(() => import("@/components/typing"), {
  ssr: false,
  loading: () => (
    <Center>
      <Spinner size={20} />
    </Center>
  ),
});

const Home: NextPage = () => {
  return (
    <TestLayout>
      <TypingTest />
    </TestLayout>
  );
};

export default Home;
