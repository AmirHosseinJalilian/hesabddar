import { Box, Container, Typography } from "@mui/material";
import { useTheme, styled, alpha } from "@mui/material/styles";
import React from "react";
import { varFade } from "src/components/animate";
import { m } from "framer-motion";

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

const ContentStyle = styled(Box)(({ theme }) => ({
  maxWidth: 520,
  margin: "auto",
  textAlign: "center",
  [theme.breakpoints.up("md")]: {
    zIndex: 11,
    textAlign: "left",
    position: "absolute",
  },
}));

const IMG = [...Array(10)].map(
  (_, index) => `/static/home/clean-${index + 1}.png`
);

// ----------------------------------------------------------------------

export default function HomeCleanInterface() {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <ContentStyle>
          <m.div variants={varFade().inUp}>
            <Typography
              component="p"
              variant="h5"
              sx={{ mb: 2, color: "text.secondary" }}
            >
              آشپزیار
            </Typography>
          </m.div>
          <m.div variants={varFade().inUp}>
            <Typography
              variant="h4"
              paragraph
              sx={{
                ...(!isLight && {
                  textShadow: `4px 4px 16px ${alpha(
                    theme.palette.grey[800],
                    0.48
                  )}`,
                }),
              }}
            >
              بخش آشپزیار حسابی کمک میکنه تا همه چی دقیق پیش بره
            </Typography>
          </m.div>
        </ContentStyle>
        <Box sx={{ position: "relative" }}>
          {IMG.map((_, index) => (
            <m.div
              key={index}
              variants={varFade().inUp}
              style={{
                top: 0,
                left: 0,
                position: "absolute",
                ...(index === 0 && { zIndex: 8 }),
                ...(index === 9 && { position: "relative", zIndex: 9 }),
              }}
            >
              <Box
                component="img"
                src={`/assets/home/clean-${index + 1}.png`}
              />
            </m.div>
          ))}
        </Box>
      </Container>
    </RootStyle>
  );
}
