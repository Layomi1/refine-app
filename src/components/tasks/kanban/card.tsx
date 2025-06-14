import { User } from "@/graphql/schema.types";
import { Button, Card, ConfigProvider, Dropdown, theme, MenuProps } from "antd";
import { Text } from "@/components/text";
import { useMemo } from "react";
import { DeleteOutlined, EyeOutlined, MoreOutlined } from "@ant-design/icons";

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

  const edit = () => {};
  const dropdownItems = useMemo(() => {
    const dropdownItems: MenuProps["items"] = [
      {
        label: "View card",
        key: "1",
        icon: <EyeOutlined />,
        onclick: () => {
          edit();
        },
      },
      {
        danger: true,
        label: "Delete card",
        key: "2",
        icon: <DeleteOutlined />,
        onClick: () => {},
      },
    ];
    return dropdownItems;
  }, []);

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
      <Card
        size="small"
        title={<Text ellipsis={{ tooltip: title }}>{title}</Text>}
        onClick={() => edit()}
        extra={
          <Dropdown
            trigger={["click"]}
            menu={{
              items: dropdownItems,
            }}
            placement="bottom"
            arrow={{ pointAtCenter: true }}
          >
            <Button
              type="text"
              shape="circle"
              icon={
                <MoreOutlined
                  style={{
                    transform: "rotate(90deg)",
                  }}
                />
              }
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </Dropdown>
        }
      >
        <div></div>
      </Card>
    </ConfigProvider>
  );
};
