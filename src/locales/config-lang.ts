// @mui
import { enUS, faIR } from '@mui/material/locale';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export enum LangValues {
  Fa = "fa-IR",
  En = "en-UK",
}

export const allLangs = [
  {
    label: "فارسی",
    value: LangValues.Fa,
    systemValue: faIR,
    direction: "rtl",
    icon: "twemoji:flag-iran"
  },
  {
    label: "English",
    value: LangValues.En,
    systemValue: enUS,
    direction: "ltr",
    icon: "emojione-v1:flag-for-united-kingdom"
  },
];

export const defaultLang = allLangs[0]; // Persian

// GET MORE COUNTRY FLAGS
// https://icon-sets.iconify.design/flagpack/
// https://www.dropbox.com/sh/nec1vwswr9lqbh9/AAB9ufC8iccxvtWi3rzZvndLa?dl=0
