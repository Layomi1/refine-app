import { User } from "@/graphql/schema.types";
import { Card, ConfigProvider, theme } from "antd";

import React from "react";

type ProjectCardProps = {
  id: string;
  title: string;
  dueDate?: string;
  updatedAt: string;
  users?: {
    id: string;
    name: string;
    avatarUrl?: User["avatarUrl"];
  };
};
export const ProjectCard = ({
  id,
  title,
  dueDate,
  users,
}: ProjectCardProps) => {
  const { token } = theme.useToken();
  return (
    <ConfigProvider
      theme={{
        components: {
          Tag: {
            colorText: token.colorTextSecondary,
          },
          Card: {
            headerBg: "transparent",
          },
        },
      }}
    >
      <Card></Card>
    </ConfigProvider>
  );
};
