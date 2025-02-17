import { m } from "framer-motion";
// @mui
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import homeFill from "@iconify/icons-eva/home-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
import Typography from "@mui/material/Typography";
// routes
import { paths } from "src/routes/paths";
import { useRouter } from "src/routes/hooks";
// auth
// components
import { varHover } from "src/components/animate";
import { useSnackbar } from "src/components/snackbar";
import CustomPopover, { usePopover } from "src/components/custom-popover";
import { Button } from "@mui/material";
import { Icon } from "@iconify/react";

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: "خانه",
    linkTo: "/",
    icon: homeFill,
  },
  // {
  //   label: "تنظیمات",
  //   linkTo: paths.dashboard.user.account,
  //   icon: settings2Fill, 
  // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();


  const { enqueueSnackbar } = useSnackbar();

  const popover = usePopover();

  const handleLogout = async () => {
    try {
      popover.onClose();
      router.replace("/");
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Unable to logout!", { variant: "error" });
    }
  };

  const handleClickItem = (path: string) => {
    popover.onClose();
    router.push(path);
  };

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src=""
          alt="Hi"
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        />
      </IconButton>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        sx={{ width: 200, p: 0 }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {/* {user?.displayName} */}
            Amir Hossein Jalilian
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {/* {user?.email} */}
            jalilian.amirhossein@gmail.com
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleClickItem(option.linkTo)}
            >
              <Box
                component={Icon}
                icon={option.icon}
                sx={{
                  mr: 2,
                  width: 24,
                  height: 24,
                }}
              />

              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={handleLogout}
          >
            خروج
          </Button>
        </Box>
      </CustomPopover>
    </>
  );
}
