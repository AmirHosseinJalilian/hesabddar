import { useMemo } from "react";
// routes
import { paths } from "src/routes/paths";
// locales
import { useLocales } from "src/locales";
// components
import SvgColor from "src/components/svg-color";

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  recipe: icon("ic_recipe"),
  path: icon("ic_path"),
  ingredient: icon("ic_ingredient"),
  nutrient: icon("ic_nutrient"),
  category: icon("ic_category"),
  difficulty: icon("ic_difficulty"),
  ticket: icon("ic_ticket"),
  unit: icon("ic_unit"),
  utensil: icon("ic_utensil"),
  user: icon("ic_users"),
  // ----------------------------------
  blog: icon("ic_blog"),
  cart: icon("ic_cart"),
  chat: icon("ic_chat"),
  mail: icon("ic_mail"),
  calendar: icon("ic_calendar"),
  ecommerce: icon("ic_ecommerce"),
  analytics: icon("ic_analytics"),
  dashboard: icon("ic_dashboard"),
  kanban: icon("ic_kanban"),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t("اطلاعات کلی"),
        items: [
          {
            title: "عمومی",
            path: paths.dashboard.general.app,
            icon: ICONS.dashboard,
            accessKey: "",
          },
        ],
      },
      // ----------------------------------------------------------------------
      {
        subheader: "کتاب آشپزی",
        items: [
          {
            title: "دستور پخت",
            path: paths.dashboard.general.app,
            icon: ICONS.recipe,
            accessKey: "CanAccessRecipe",
            children: [
              {
                title: "دستور پخت جدید",
                path: "/",
              },
              { title: "لیست دستور پخت‌ها", path: "/" },
            ],
          },
          {
            title: "نظرها",
            icon: ICONS.chat,
            accessKey: "",
            path: "/",
          },
        ],
      },
      // ----------------------------------------------------------------------
      {
        subheader: "بوفه",
        items: [
          {
            title: "مواد غذایی",
            path: "/",
            icon: ICONS.ingredient,
            accessKey: "CanAccessIngredient",
            children: [
              {
                title: "ماده غذایی جدید",
                path: "/",
              },
              { title: "لیست مواد غذایی", path: "/" },
            ],
          },
          {
            title: "ریز مغذی‌ها",
            path: "/",
            icon: ICONS.nutrient,
            accessKey: "CanAccessNutrient",
            children: [
              {
                title: "افزودن ریز مغذی",
                path: "/",
              },
              { title: "لیست ریز مغذی‌ها", path: "/" },
              {
                title: "افزودن گروه",
                path: "/",
              },
              { title: "لیست گروه‌ها", path: "/" },
            ],
          },
        ],
      },
      // ----------------------------------------------------------------------
      {
        subheader: "کابینت",
        items: [
          {
            title: "دسته بندی",
            path: "/",
            icon: ICONS.category,
            accessKey: "CanAccessCategory",
            children: [
              { title: "دسته جدید", path: "/" },
              { title: "لیست دسته‌ها", path: "/" },
            ],
          },
          {
            title: "سطح سختی",
            path: "/",
            icon: ICONS.difficulty,
            accessKey: "CanAccessDifficulty",
            children: [
              {
                title: "سطح سختی جدید",
                path: "/",
              },
              {
                title: "لیست سطح سختی‌ها",
                path: "/",
              },
            ],
          },
          {
            title: "ابزارهای آشپزی",
            path: "/",
            icon: ICONS.utensil,
            accessKey: "CanAccessUtensil",
            children: [
              { title: "ابزار جدید", path: "/" },
              { title: "لیست تمام ابزارها", path: "/" },
            ],
          },
          {
            title: "واحدهای اندازی‌گیری",
            path: "/",
            icon: ICONS.unit,
            accessKey: "CanAccessUnit",
            children: [
              { title: "واحد جدید", path: "/" },
              { title: "لیست واحدها", path: "/" },
            ],
          },
        ],
      },
      // ----------------------------------------------------------------------
      {
        subheader: "پشتیبانی",
        items: [
          {
            title: "تیکت‌ها",
            path: "/",
            icon: ICONS.ticket,
            accessKey: "",
            children: [
              { title: "تیکت جدید", path: "/" },
              { title: "لیست تیکت‌ها", path: "/" },
            ],
          },
        ],
      },
      // ----------------------------------------------------------------------
      {
        subheader: "مدیریت",
        items: [
          {
            title: "کاربران",
            path: "/",
            icon: ICONS.user,
            accessKey: "CanAccessUser",
            children: [
              { title: "کاربر جدید", path: "/" },
              { title: "لیست کاربران", path: "/" },
            ],
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
