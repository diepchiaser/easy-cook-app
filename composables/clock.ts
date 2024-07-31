import { onMounted, ref } from 'vue'

const time = ref('')
const date = ref('')

const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

export function useUpdateTime() {
  const update = () => {
    const cd = new Date()
    time.value = `${zeroPadding(cd.getHours(), 2)}:${zeroPadding(cd.getMinutes(), 2)}:${zeroPadding(cd.getSeconds(), 2)}`
    date.value = `${cd.getFullYear()}-${zeroPadding(cd.getMonth() + 1, 2)}-${zeroPadding(cd.getDate(), 2)} ${weekDays[cd.getDay()]}`
  }

  onMounted(() => {
    update()
    setInterval(update, 1000)
  })

  return { time, date }
}

export function zeroPadding(num: number, digit: number): string {
  return num.toString().padStart(digit, '0')
}
