import type { Ref } from 'vue'
import { useI18n } from 'vue-i18n'

export function useI18nLocale() {
  const { locale } = useI18n()
  return locale
}

export function useTranslation() {
  const { t } = useI18n()
  return t
}

export function useLocale() {
  return useState<string>('locale', () => useI18nLocale())
}

export function useLocales() {
  const locale = useLocale()
  const locales = ref([
    { text: 'English', value: 'en' },
    { text: 'Vietnamese', value: 'vi' },
  ])

  if (!locales.value.includes(locale.value))
    locales.value.unshift(locale.value)

  return locales
}

export function useLocaleDate(date: Ref<Date> | Date, locale = useLocale()) {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }
  return computed(() => new Intl.DateTimeFormat(locale.value, options).format(unref(date)))
}
