import { Badge as BadgeComponent } from "flowbite-react";

import { badgeTypes } from "../../../constants";

type BadgeType = {
  type: string;
};

const Badge = ({ type }: BadgeType) => {
  return (
    <BadgeComponent color={badgeTypes.find((t) => t.key === type)?.color}>
      {type}
    </BadgeComponent>
  );
};

export default Badge;
