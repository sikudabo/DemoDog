import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "./MDBox";
import MDTypography from "./MDTypography";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { colors } from "./colors";

type DemoDogComplexStatisticsCardProps = {
    color: string;
    className?: string;
    title: string;
    count: number | string;
    percentage?: any;
    timeTable: string;
    icon: any;
};

function DemoDogComplexStatisticsCard({ className, color, title, timeTable, count, percentage, icon }: DemoDogComplexStatisticsCardProps) {
  return (
    <Card elevation={10} className={className}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center' }}>
            <p style={{ fontWeight: 900, fontSize: 20}}>
            {title}
            </p>
            <div>
                {icon}
            </div>
            <p style={{ fontWeight: 900, fontSize: 30 }}>
            {count}
            </p>
        </div>
      <Divider />
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            <p>
                {timeTable}
            </p>
        </div>
    </Card>
  );
}

// Typechecking props for the ComplexStatisticsCard
/* ComplexStatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
}; */

export default DemoDogComplexStatisticsCard;
