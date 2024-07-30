import type { Ref } from 'vue'
import { useI18n } from 'vue-i18n';

export const useI18nLocale = () => {
    const { locale } = useI18n()
    return locale;
};

export const useTranslation = () => {
    const { t } = useI18n()
    return t;
}

export const useLocale = () => {
  return useState<string>('locale', () => useI18nLocale())
}

export const useLocales = () => {
    const locale = useLocale();
    const locales = ref([
        { text: 'English', value: 'en'},
        { text: 'Vietnamese', value: 'vi'},
    ])

    if (!locales.value.includes(locale.value)) locales.value.unshift(locale.value)

    return locales
}

export const useLocaleDate = (date: Ref<Date> | Date, locale = useLocale()) => {
    return computed(() => new Intl.DateTimeFormat(locale.value, { dateStyle: 'medium' }).format(unref(date)))
}
