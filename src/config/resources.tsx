import {
  DashboardOutlined,
  ProjectOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { IResourceItem } from "@refinedev/core";

export const resources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/",
    meta: {
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
  },
  {
    name: "companies",
    list: "/companies",
    show: "/companies/:id",
    create: "/companies/new",
    edit: "/companies/edit/:id",
    meta: {
      label: "Companies",
      icon: <ShareAltOutlined />,
    },
  },
  {
    name: "tasks",
    list: "/task",
    show: "/task/:id",
    create: "/task/new",
    edit: "/task/edit/:id",
    meta: {
      label: "Task",
      icon: <ProjectOutlined />,
    },
  },
];
