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
    height: 50,
    syncViewPadding: true,
    autoFit: true,
    tooltip: false,
    style: {
      opacity: "0.4",
    },
    animate: false,
    xAxis: { line: { style: { lineWidth: 0 } } },

    yAxis: {
      tickCount: 12,
      label: {
        style: {
          fill: "transparent",
          stroke: 0,
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
      styles={{
        body: {
          padding: "8px 8px 8px 12px",
        },
      }}
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
        <div style={{ padding: "0 10px" }}>
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
        </div>
        <div style={{ width: "50%" }}>
          <Area {...config} />
        </div>
      </div>
    </Card>
  );
};

export default DashboardTotalCountCard;
