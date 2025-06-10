import React, { forwardRef } from "react";
import { getNameInitials } from "@/utilities";
import { Avatar as AntdAvatar, AvatarProps } from "antd";

type Props = AvatarProps & {
  name?: string;
};

const CustomAvatar = forwardRef<HTMLDivElement, Props>(
  ({ name, style, ...rest }, ref) => {
    return (
      <AntdAvatar
        ref={ref}
        alt={name}
        size="small"
        style={{
          backgroundColor: "#078668",
          display: "flex",
          alignItems: "center",
          border: "none",
          ...style,
        }}
        {...rest}
      >
        {getNameInitials(name || "")}
      </AntdAvatar>
    );
  }
);

CustomAvatar.displayName = "CustomAvatar";

export default CustomAvatar;
