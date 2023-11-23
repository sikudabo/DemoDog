import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export default styled(Typography)(({ theme, ownerState }: any) => {
  const { palette, typography } = theme;
  const { color, textTransform, verticalAlign, opacity, textGradient, darkMode } =
    ownerState;

  const { gradients, transparent, white } = palette;
  const { fontWeightLight, fontWeightRegular, fontWeightMedium, fontWeightBold } = typography;

  // fontWeight styles
  const fontWeights = {
    light: fontWeightLight,
    regular: fontWeightRegular,
    medium: fontWeightMedium,
    bold: fontWeightBold,
  };

  // styles for the typography with textGradient={true}
  const gradientStyles = () => ({
    backgroundImage:
      color !== "inherit" && color !== "text" && color !== "white" && gradients[color]
        ? gradients[color].state
        : gradients.dark.main,
    display: "inline-block",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: transparent.main,
    position: "relative",
    zIndex: 1,
  });

  // color value
  let colorValue = color === "inherit" || !palette[color] ? "inherit" : palette[color].main;

  if (darkMode && (color === "inherit" || !palette[color])) {
    colorValue = "inherit";
  } else if (darkMode && color === "dark") colorValue = white.main;

  return {
    opacity,
    textTransform,
    verticalAlign,
    textDecoration: "none",
    color: colorValue,
    fontWeight: fontWeights['bold'] && fontWeights['bold'],
    ...(textGradient && gradientStyles()),
  };
});