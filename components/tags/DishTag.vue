<script lang="ts" setup>
import type { DbRecipeItem } from '~/utils/db'
import { tools } from '~/data/food'
import type { RecipeItem } from '~/types'
import { getEmojisFromStuff } from '~/utils'
import { recipeHistories } from '~/composables/store/history'

const props = defineProps<{
  dish: RecipeItem | DbRecipeItem
}>()

const gtm = useGtm()

function triggerGtm(dish: RecipeItem) {
  recipeHistories.value.push({
    recipe: dish,
    time: Date.now(),
  })

  gtm?.trackEvent({
    event: 'click',
    category: `dish_${dish.name}`,
    action: 'click_recipe',
    label: '跳转菜谱',
  })
  gtm?.trackEvent({
    event: 'click_dish',
    action: dish.name,
  })
}
const $t = useTranslation()

function mapDishTag(text: string) {
  const mappings: { [key: string]: string } = {
    '电饭煲版蛋糕（废手版）': '电饭煲版蛋糕',
    '骨头汤火锅锅底做法（全鸡版）': '骨头汤火锅锅底做法',
    '清汤锅万能高汤做法（鸡蛋+猪肉）': '清汤锅万能高汤做法',
    '油墩子/腰子饼': '油墩子腰子饼',
    '微波炉版厚蛋烧（没芝士就别选了）': '微波炉版厚蛋烧',
    '电饭煲卤菜（开店级别）': '电饭煲卤菜',
    '家常黄焖鸡（多调料版）': '家常黄焖鸡',
    '三杯鸡（无九层塔版）': '三杯鸡',
    '电饭煲叉烧肉（叉烧酱版）': '电饭煲叉烧肉',
    '日式汉堡排（废手）': '日式汉堡排',
    '电饭煲版吐司（尽量不做，废手）': '电饭煲版吐司',
    '年轮蛋糕（难度max）': '年轮蛋糕',
    '空气炸锅甜点（没酵母别选）': '空气炸锅甜点',
    '豆腐饭（蛋炒饭）': '豆腐饭',
    '富贵金钱蛋（湖南口味辣）': '富贵金钱蛋',
    '6阶番茄炒蛋': '阶番茄炒蛋',
    '莲花洋葱（消耗洋葱！）': '莲花洋葱',
    '蒸蛋羹（硬核0失败版）': '蒸蛋羹硬',
    '雪碧拌面（要雪碧+老干妈）': '雪碧拌面',
    '早餐白面包（无鸡蛋版）': '早餐白面包',
    '朝鲜冷面（方便面版）': '朝鲜冷面',
  }
  return mappings[text] || ''
}

function speciaLabel(text: string | null) {
  if (text) {
    const mappedTag = mapDishTag(text)
    if (mappedTag) {
      return mappedTag
    }

    return text
  }
  return null
}

const dishLabel = computed(() => {
  const emojis = getEmojisFromStuff(props.dish.stuff)
  const trans = $t(`dishTag.${speciaLabel(props.dish.name)}`)
  // console.log(trans);
  return `${props.dish.tags?.includes('杂烩') ? '🍲' : emojis.join(' ')} ${trans}`
})
</script>

<template>
  <a
    :href="dish.link || `https://www.bilibili.com/video/${dish.bv}`" target="_blank" class="dish-tag rounded tag" p="x-2"
    border="~ blue-200 dark:blue-800"
    bg="blue-300 opacity-20"
    @click="triggerGtm(dish)"
  >
    <span m="r-1" text="sm blue-700 dark:blue-200">
      {{ dishLabel }}
    </span>
    <template v-for="tool, i in tools">
      <span v-if="dish.tools?.includes(tool.name)" :key="i" :class="tool.icon" />
    </template>
  </a>
</template>
