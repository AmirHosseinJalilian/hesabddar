import React from "react";
import { OverviewRankingView } from "src/sections/overview/ranking/view";
import { buildSiteTitle } from "src/utils/build-site-title";

export const metadata = {
  title: buildSiteTitle("رتبه بندی"),
};

export default function Ranking() {
  return <OverviewRankingView />;
}
