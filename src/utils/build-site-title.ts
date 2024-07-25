export function buildSiteTitle(value: string) {
  return `${value} | ${process.env.NEXT_PUBLIC_SITE_TITLE}`;
}
