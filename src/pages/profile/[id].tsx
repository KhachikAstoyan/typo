import React from "react";
import type { NextPage } from "next";
import { User } from "@prisma/client";
import { MainLayout } from "@/layouts/Main";
import { Center } from "@/components/common/Center";
import { UserInfo } from "@/components/user/UserInfo";
import { UserStats } from "@/components/user/UserStats";
import { useQuery } from "react-query";
import { UserTests } from "@/components/user/UserTests";
import { Button } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Spinner } from "@/components/common/Spinner";
import axios from "axios";

const Profile: NextPage = () => {
  const router = useRouter();
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<User>(`user-${router.query.id}`, () =>
    axios.get(`/api/users/${router.query.id}`).then((r) => r.data)
  );
  const { data: session } = useSession();

  if (isLoading) {
    return (
      <MainLayout>
        <Center>
          <Spinner size={20} />
        </Center>
      </MainLayout>
    );
  }

  if (!user || isError) {
    return (
      <MainLayout>
        <Center>
          <h1>Failed to fetch the user.</h1>
        </Center>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="py-10">
        <UserInfo user={user} />
        <UserStats user={user} />
        <div className="mt-10">
          <UserTests user={user} />
          {session?.user.id === router.query.id && (
            <Button
              color="red"
              variant="outline"
              size="sm"
              className="float-right"
              onClick={() =>
                signOut().then(() => {
                  if (window) {
                    window.location.href = "/";
                  }
                })
              }
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
