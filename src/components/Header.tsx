import { UserAvatar } from "./user/Avatar";
import Logo from "./common/Logo";
import styled from "@emotion/styled";

import { Button } from "@mantine/core";
import { Spinner } from "./common/Spinner";
import { FaGoogle } from "react-icons/fa/";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  min-height: 75px;
`;

const Menu = () => {
  const { data, status } = useSession();
  const router = useRouter();

  if (data) {
    return (
      <>
        <button
          onClick={() => router.push(`/profile/${data.user.id} `)}
          className="flex items-center gap-2"
        >
          <h1 style={{ color: "gray" }}>{data.user.name}</h1>

          <UserAvatar src={data?.user.image || "/avatar.webp"} />
        </button>
      </>
    );
  }

  if (status === "loading") {
    return <Spinner size={20} />;
  }

  // return (
  // 	<IoPersonSharp
  // 		// onClick={() => dispatch(toggleLoginModal(true))}
  // 		onClick={() => navigate("/login")}
  // 		size={18}
  // 		className="text-gray-500 cursor-pointer"
  // 	/>
  // );

  return (
    <Button
      variant="default"
      color="gray"
      leftIcon={<FaGoogle />}
      onClick={() => signIn("google")}
    >
      Sign in
    </Button>
  );
};

export const Header: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <StyledHeader>
        <div
          className="cursor-pointer"
          onClick={() =>
            router.pathname == "/" ? router.reload() : router.push("/")
          }
        >
          <Logo />
        </div>
        <nav>
          <Menu />
        </nav>
      </StyledHeader>
    </>
  );
};
