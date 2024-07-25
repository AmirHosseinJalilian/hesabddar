import { ReactNode, useEffect } from "react";
// material
import { experimentalStyled as styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Link from "next/link";
import Logo from "src/components/logo";
import Cookies from "js-cookie";
import { paths } from "src/routes/paths";
import { useRouter } from "next/navigation";

// ----------------------------------------------------------------------

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

// ----------------------------------------------------------------------

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) router.push(paths.dashboard.root)
  }, [])
  return (
    <HeaderStyle>
      <Link href="/">
        <Logo />
      </Link>

      {/* <MHidden width="smDown"> */}
      <Typography
        variant="body2"
        sx={{
          mt: { md: -2 },
        }}
      >
        {children}
      </Typography>
      {/* </MHidden> */}
    </HeaderStyle>
  );
}
