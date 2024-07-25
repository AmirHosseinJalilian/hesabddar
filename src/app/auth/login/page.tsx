// sections
// import { JwtLoginView } from "src/sections/auth/jwt";
import { LoginView } from "src/sections/auth";
import { buildSiteTitle } from "src/utils/build-site-title";

// ----------------------------------------------------------------------

export const metadata = {
  title: buildSiteTitle("ورود"),
};

export default function LoginPage() {
  return <LoginView />;
}
