import { memo } from "react";

import Groups from "../../components/Groups/Groups";

const Dashboard = () => {
  return (
    <div className="w-full h-full">
      <Groups />
    </div>
  );
};

export default memo(Dashboard);
