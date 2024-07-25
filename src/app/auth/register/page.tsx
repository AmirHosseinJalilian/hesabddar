// sections
import { RegisterView } from "src/sections/auth";
import { buildSiteTitle } from "src/utils/build-site-title";

// ----------------------------------------------------------------------

export const metadata = {
  title: buildSiteTitle('ثبت نام'),
};

export default function RegisterPage() {
  return <RegisterView />;
}
