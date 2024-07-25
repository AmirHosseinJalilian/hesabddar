import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function ColorSquare({ color, ...props }: any) {
  return (
    <Box
      {...props}
      sx={{
        border: (theme) => `solid 1px ${theme.palette.text.primary}`,
        backgroundColor: color || grey[500],
        height: 20,
        width: 20,
        borderRadius: "3px",
      }}
    />
  );
}
