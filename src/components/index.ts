import UpcomingEvents from "./home/upcoming-events";
import DealsChart from "./home/deals-chart";
import DashboardTotalCountCard from "@/components/home/total-count-card";
import DashboardLatestActivities from "@/components/home/latest-activities";

import { KanbanBoardContainer } from "./tasks/kanban/board";
import { KanbanBoard } from "./tasks/kanban/board";
import KanbanItem from "./tasks/kanban/item";
import KanbanColumn from "./tasks/kanban/column";
import ProjectCard from "./tasks/kanban/card";
import { UserTag } from "./tags/user-tag";
import { KanbanAddCardButton } from "./tasks/kanban/add-card-button";
import UpcomingEventsSkeleton from "./skeleton/upcoming-events";
import ProjectCardSkeleton from "./skeleton/project-card";
import KanbanColumnSkeleton from "./skeleton/kanban";
import LatestActivitiesSkeleton from "./skeleton/latest-activities";
import AccordionHeaderSkeleton from "./skeleton/accordion-header";

export {
  UpcomingEvents,
  DealsChart,
  DashboardTotalCountCard,
  DashboardLatestActivities,
  KanbanBoardContainer,
  KanbanColumn,
  KanbanBoard,
  KanbanItem,
  ProjectCard,
  KanbanAddCardButton,
  UserTag,
  UpcomingEventsSkeleton,
  ProjectCardSkeleton,
  KanbanColumnSkeleton,
  LatestActivitiesSkeleton,
  AccordionHeaderSkeleton,
};
export * from "./accordion";
export * from "./tasks/form/description";
export * from "./tasks/form/due-date";
export * from "./tasks/form/stage";
export * from "./tasks/form/title";
export * from "./tasks/form/header";
export * from "./tasks/form/users";
export * from "./text";
