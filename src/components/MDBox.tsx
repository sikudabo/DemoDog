import { forwardRef } from "react";

// Custom styles for MDBox
import MDBoxRoot from "./MDBoxRoot";

const MDBox = forwardRef(
  ({ variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow, ...rest }: any, ref) => (
    <MDBoxRoot
      {...rest}
      ref={ref}
      ownerState={{ variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow }}
    />
  )
);

export default MDBox;