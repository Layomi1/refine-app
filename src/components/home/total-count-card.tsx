import { totalCountVariants } from "@/constants";
import { Card, Skeleton } from "antd";
import { Text } from "@/components/text";
import { Area, AreaConfig } from "@ant-design/plots";

type Props = {
  resource: "companies" | "contacts" | "deals";
  isLoading: boolean;
  totalCount?: number;
};

const DashboardTotalCountCard = ({
  resource,
  isLoading,
  totalCount,
}: Props) => {
  const { primaryColor, secondaryColor, icon, title } =
    totalCountVariants[resource];

  const config: AreaConfig = {
    data: totalCountVariants[resource].data,
    xField: "index",
    yField: "value",
    appendPadding: [1, 0, 0, 0],
    padding: 0,
    syncViewPadding: true,
    autoFit: true,
    tooltip: false,
    animate: false,
    xAxis: false,
    yAxis: {
      tickCount: 12,
      label: {
        style: {
          stroke: "transparent",
        },
      },
      grid: {
        line: {
          style: {
            stroke: "transparent",
          },
        },
      },
    },
    smooth: true,
    line: {
      color: primaryColor,
    },
    areaStyle: () => {
      return {
        fill: `l(270) O:#fff 0.2${secondaryColor} 1:${primaryColor}`,
      };
    },
  };

  return (
    <Card
      style={{ height: "96px", padding: 0 }}
      bodyStyle={{ padding: "8px 8px 8px 12px" }}
      size="small"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          whiteSpace: "nowrap",
        }}
      >
        {icon}
        <Text
          size="md"
          className="secondary"
          strong
          style={{ marginLeft: "8px" }}
        >
          {title}
        </Text>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          size="xxxl"
          strong
          style={{
            whiteSpace: "nowrap",
            flex: 1,
            flexShrink: 0,
            textAlign: "start",
            marginLeft: "48px",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {isLoading ? (
            <Skeleton.Button
              style={{
                marginTop: "8px",
                width: "74px",
              }}
            />
          ) : (
            totalCount
          )}
        </Text>
        <Area {...config} style={{ width: "50%", backgroundColor: "black" }} />
      </div>
    </Card>
  );
};

export default DashboardTotalCountCard;
