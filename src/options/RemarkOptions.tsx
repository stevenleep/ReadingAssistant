import React from "react";
import { useRemarkConfigContext } from "./RemarkConfigContext";
import RemarkColors from "./RemarkColors";

export default function RemarkOptions() {
  const [config] = useRemarkConfigContext();
  return (
    <div>
      <RemarkColors colors={config.colors} />
    </div>
  );
}
