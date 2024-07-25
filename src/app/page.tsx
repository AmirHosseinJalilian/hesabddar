// sections
import { HomeView } from "src/sections/home/view";
import { buildSiteTitle } from "src/utils/build-site-title";

// ----------------------------------------------------------------------

export const metadata = {
  title: buildSiteTitle("خانه"),
};

export default function HomePage() {
  return <HomeView />;
}
