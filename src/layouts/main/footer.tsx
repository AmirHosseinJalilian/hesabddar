// routes
import { paths } from "src/routes/paths";
import { usePathname } from "src/routes/hooks";
import { RouterLink } from "src/routes/components";
// mui
import {
  Grid,
  Link,
  Divider,
  Container,
  Typography,
  IconButton,
  Stack,
  Box,
} from "@mui/material";
// components
import instagramFill from "@iconify/icons-ant-design/instagram-fill";
import twitterFill from "@iconify/icons-eva/twitter-fill";
import linkedinFill from "@iconify/icons-eva/linkedin-fill";
import Logo from "src/components/logo";
import { styled } from "@mui/material/styles";
import { Icon } from "@iconify/react";

// ----------------------------------------------------------------------

const SOCIALS = [
  { name: "Instagram", icon: instagramFill, url: "instagram" },
  { name: "Linkedin", icon: linkedinFill, url: "tahersoft" },
  { name: "Twitter", icon: twitterFill, url: "https://twitter.com/tahersoft" },
];

const LINKS = [
  {
    headline: "اطلاعات",
    children: [
      // { name: 'درباره ما', href: PATH_PAGE.about },
      { name: "تماس با ما", href: paths.contact },
      { name: "سوالات پر تکرار (FAQs)", href: paths.faqs },
    ],
  },
  {
    headline: "ارتباط با ما",
    children: [
      { name: "support@cookthepot.com", href: "" },
      { name: "09109649362", href: "" },
      { name: "025 - 37208588", href: "" },
    ],
  },
  {
    headline: "قوانین",
    children: [
      // TODO: open dialog
      { name: "قوانین سایت", href: "#" },
      { name: "حریم خصوصی", href: "#" },
    ],
  },
];

// ----------------------------------------------------------------------

export default function Footer() {
  const pathname = usePathname();

  const isHome = pathname === "/";

  const simpleFooter = (
    <Box
      component="footer"
      sx={{
        py: 5,
        textAlign: "center",
        position: "relative",
        bgcolor: "background.default",
      }}
    >
      <Container>
        <Logo sx={{ mb: 1, mx: "auto", cursor: "pointer" }} />

        <Typography variant="caption" component="div">
          © تمام حقوق مادی و معنوی برای گروه طاهر محفوظ می‌باشد.
          <br /> تیم تولید &nbsp;
          <Link target="_blank" href="https://cookthepot.com">
            حسابدار
          </Link>
        </Typography>
      </Container>
    </Box>
  );

  const RootStyle = styled("div")(({ theme }) => ({
    position: "relative",
    backgroundColor: theme.palette.background.default,
  }));

  const mainFooter = (
    <RootStyle>
      <Divider />
      <Container maxWidth="lg" sx={{ pt: 10 }}>
        <Grid
          container
          justifyContent={{ xs: "center", md: "space-between" }}
          sx={{ textAlign: { xs: "center", md: "left" } }}
        >
          <Grid item xs={12} sx={{ mb: 3 }}>
            <Logo sx={{ mx: { xs: "auto", md: "inherit" } }} />
          </Grid>
          <Grid item xs={8} md={3}>
            <Typography variant="body2" sx={{ pr: { md: 5 } }}>
              این‌جا بخش مدیریت نرم‌افزار قابلمه هست. برگزاری مسابقات، داوری و
              نوشتن دستور پخت های خوشمزه، همه اینجا انجام میشه !!!
            </Typography>

            <Stack
              spacing={1.5}
              direction="row"
              justifyContent={{ xs: "center", md: "flex-start" }}
              sx={{ mt: 5, mb: { xs: 5, md: 0 } }}
            >
              {SOCIALS.map((social) => (
                <IconButton
                  target="_target"
                  component="a"
                  href={social.url}
                  key={social.name}
                  color="primary"
                  sx={{ p: 1 }}
                >
                  <Icon icon={social.icon} width={24} height={24} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack
              spacing={5}
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
            >
              {LINKS.map((list) => {
                const { headline, children } = list;
                return (
                  <Stack key={headline} spacing={2}>
                    <Typography component="p" variant="overline">
                      {headline}
                    </Typography>
                    {children.map((link) => (
                      <Link
                        href={link.href}
                        key={link.name}
                        color="inherit"
                        variant="body2"
                        component={link.href ? RouterLink : "div"}
                        sx={{ display: "block", direction: "rtl" }}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </Stack>
                );
              })}
            </Stack>
          </Grid>
        </Grid>

        <Typography
          component="p"
          variant="body2"
          sx={{
            mt: 10,
            pb: 5,
            fontSize: 13,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          © {new Date().getFullYear()}. تمام حقوق مادی و معنوی متعلق به{" "}
          <Link href="https://cookthepot.com" target="_blank">
            قابلمه
          </Link>{" "}
          می‌باشد
        </Typography>
      </Container>
    </RootStyle>
  );

  return isHome ? simpleFooter : mainFooter;
}
