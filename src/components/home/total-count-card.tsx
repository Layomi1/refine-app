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
    height: 60,
    autoFit: true,
    tooltip: false,
    axis: {
      x: false,
      y: false,
    },

    shapeField: "smooth",
    line: {
      color: primaryColor,
    },

    area: {
      style: {
        fill: `l(270) 0:#fff 0.2:${secondaryColor} 1:${primaryColor}`,
      },
    },
  };

  return (
    <Card
      style={{
        height: "96px",
        padding: "0",
      }}
      styles={{
        body: {
          padding: "10px 8px 10px 12px",
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
        <Text size="md" className="secondary" style={{ marginLeft: "8px" }}>
          {title}
        </Text>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          // paddingBottom: "10px",
          paddingBottom: "5px",
        }}
      >
        <div>
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
