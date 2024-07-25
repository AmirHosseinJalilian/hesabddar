// routes
import { paths } from "src/routes/paths";
// config
// import { PATH_AFTER_LOGIN } from "src/config-global";
// components
import homeFill from "@iconify/icons-eva/home-fill";
import contacts from "@iconify/icons-ic/round-contact-mail";
import { Icon } from "@iconify/react";

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

export const navConfig = [
  {
    title: "خانه",
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
    path: "/",
  },
  {
    title: "تماس با ما",
    icon: <Icon icon={contacts} {...ICON_SIZE} />,
    path: paths.contact,
  },
];
