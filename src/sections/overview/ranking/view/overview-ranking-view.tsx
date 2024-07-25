"use client";

import { Grid, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";

import React from "react";
import { useSettingsContext } from "src/components/settings";
import { _analyticPosts, _bankingContacts } from "src/_mock";
import AppWidgetSummary from "../app-widget-summary";
import AnalyticsWebsiteVisits from "../../analytics/analytics-website-visits";
import AnalyticsNews from "../../analytics/analytics-news";

export default function OverviewRankingView() {
  const settings = useSettingsContext();
  const theme = useTheme();

  return (
    <Container maxWidth={settings.themeStretch ? false : "xl"}>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        سلام، خوش آمدید 👋
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <AppWidgetSummary
            title="مجموع آشپزان فعال"
            percent={2.6}
            total={18765}
            chart={{
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AppWidgetSummary
            title="مجموع پزشکان فعال"
            percent={0.2}
            total={4876}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <AppWidgetSummary
            title="مجموع کاربران فعال"
            percent={-0.1}
            total={678}
            chart={{
              colors: [theme.palette.warning.light, theme.palette.warning.main],
              series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <Stack spacing={3}>
            <AnalyticsWebsiteVisits
              dir="rtl"
              title="تعداد انجام خدمت"
              subheader="نسبت به ماه گذشته (+43%) "
              chart={{
                labels: [
                  "01/01/2003",
                  "02/01/2003",
                  "03/01/2003",
                  "04/01/2003",
                  "05/01/2003",
                  "06/01/2003",
                  "07/01/2003",
                  "08/01/2003",
                  "09/01/2003",
                  "10/01/2003",
                  "11/01/2003",
                ],
                series: [
                  {
                    name: "برنامه رژیم لاغری",
                    type: "column",
                    fill: "solid",
                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                  },
                  {
                    name: "برنامه بدنسازی مبتدی",
                    type: "area",
                    fill: "gradient",
                    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                  },
                  {
                    name: "آموزش تزریق انسولین",
                    type: "line",
                    fill: "solid",
                    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                  },
                ],
              }}
            />
          </Stack>
        </Grid>
       
        <Grid item xs={12} md={6}>
          <AnalyticsNews
            title="پربازدیدترین محتوای وبسایت"
            list={_analyticPosts}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AnalyticsNews
            title="پربازدیدترین محتوای وبسایت"
            list={_analyticPosts}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
