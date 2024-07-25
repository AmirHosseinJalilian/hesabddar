import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// locales
import { useLocales } from 'src/locales';
// components
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  invoices: icon('ic-invoices'),
  customer: icon('ic_customer'),
  stuff: icon('ic_stuff'),
  category: icon('ic_category'),
  analytics: icon('ic_analytics'),
  nutrient: icon('ic_nutrient'),
  recipe: icon('ic_recipe'),
  utensil: icon('ic_utensil'),
  difficulty: icon('ic_difficulty'),
  ingredient: icon('ic_ingredient'),
  // ---------------------------------------
  exercises: icon('ic_exercises'),
  equipment: icon('ic_equipment'),
  exercise_level: icon('ic_exerciseLevel'),
  muscle: icon('ic_muscle'),
  exercise_location: icon('ci_exerciseLocation'),
  fitness_goal: icon('ic_fitnessGoals'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t('اطلاعات کلی'),
        items: [
          {
            title: t('داشبورد کاربردی'),
            path: paths.dashboard.root,
            icon: ICONS.analytics,
          },
          {
            title: t('فاکتور'),
            path: paths.dashboard.general.invoices.root,
            icon: ICONS.invoices,
          },
          {
            title: t('طرف حساب'),
            path: paths.dashboard.general.customer,
            icon: ICONS.customer,
          },
          {
            title: t('کالا/خدمات'),
            path: paths.dashboard.general.stuff,
            icon: ICONS.stuff,
          },
          {
            title: t('کارپوشه'),
            path: paths.dashboard.general.company,
            // icon: ICONS.ranking,
          },
          {
            title: t('کاربران'),
            path: paths.dashboard.general.user,
            // icon: ICONS.ranking,
          },
          {
            title: t('صدورCSR،کلید عمومی و خصوصی'),
            path: paths.dashboard.general.csr,
            // icon: ICONS.ranking,
          },
          {
            title: t('سامانه هوشمند شناسه کالا/خدمات'),
            path: paths.dashboard.general.search_stuff,
            // icon: ICONS.ranking,
          },
          // {
          //   title: t('ناحیه کاربری'),
          //   path: paths.dashboard.general.ranking,
          //   // icon: ICONS.ranking,
          // },
        ],
      },
    ],
    [t]
  );

  return data;
}
