import React from "react";
import { UserAvatar } from "./Avatar";
import { Badge } from "@mantine/core";
import { User } from "@prisma/client";

interface UserInfoProps {
  user: User;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="flex items-center gap-5">
      <UserAvatar src={user.image || "/avatar.webp"} width={100} height={100} />
      <div>
        {user.role !== "user" && (
          <Badge color={user.role === "admin" ? "red" : "blue"}>
            {user.role}
          </Badge>
        )}
        <h1 className="text-3xl font-bold md:text-5xl">{user.name}</h1>
        <h2 className="text-md text-gray-500 md:text-lg">
          {!!user.email && user.email}
        </h2>
      </div>
    </div>
  );
};
