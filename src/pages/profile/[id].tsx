import React, { useEffect } from "react";
import type { GetServerSideProps, NextPage } from "next";
import { prisma } from "@/server/db";
import { User } from "@prisma/client";
import { MainLayout } from "@/layouts/Main";
import { Center } from "@/components/common/Center";
import { UserInfo } from "@/components/user/UserInfo";
import { UserStats as Stats, UserStats } from "@/components/user/UserStats";
import axios from "axios";
import { useQuery } from "react-query";
import UserTests from "../../components/user/UserTests";
import { Button } from "@mantine/core";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

interface Props {
  user: User | null;
}

const Profile: NextPage<Props> = ({ user }) => {
  const router = useRouter();
  if (!user) {
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
        </div>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: (context.params?.id as string) || "",
      },
    });

    if (!user) {
      return {
        props: {
          user: null,
        },
      };
    }

    return {
      props: {
        user,
      },
    };
  } catch (error) {
    return {
      props: {
        user: null,
      },
    };
  }
};

export default Profile;
