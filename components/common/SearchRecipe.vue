<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

import { db } from '~/utils/db'

const isOpen = ref(false)
const show = ref(false)

function closeModal() {
  isOpen.value = false
}
const showLoading = () => {
  show.value = true
}
function openModal() {
  isOpen.value = true
}
watch (show, (value) => {
  if (value) {
    setTimeout(() => {
      show.value = false
      isOpen.value = true
      openModal()
    }, 500)
  }
})
const {t: $t} = useI18n()
const mapDishTag = (text: string) => {
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
        '朝鲜冷面（方便面版）': '朝鲜冷面'
    };
    return mappings[text] || '';
};

const speciaLabel = (text: string | null) => {
    if (text) {
        const mappedTag = mapDishTag(text);
        if (mappedTag) {
            return mappedTag;
        }

        return text;
    }
    return null;
};

const keyword = ref('')
async function getFilterRecipes(keyword: string) {
  return db.recipes.filter((recipe) => {
    const recipeName = speciaLabel(recipe.name)
    return $t('dishTag.'+recipeName).includes(keyword)
  }).toArray()
}
const filteredRecipes = computedAsync(async () => {
  return await getFilterRecipes(keyword.value)
})
</script>

<template>
  <YlfIconButton
    absolute right-3 top-5
    class="icon-btn hover:text-yellow-400 !outline-none"
    text-xl
    title="切换" @click="showLoading"
  >
    <div i="ri-search-line" />
  </YlfIconButton>

  <van-overlay :show="show">
    <div class="wrapper" @click.stop>
      <van-loading type="spinner" color="#1989fa" />
    </div>
  </van-overlay>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/10" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="h-full flex justify-center text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="h-full max-w-xl w-full transform overflow-hidden bg-white p-4 text-left align-middle shadow-xl transition-all dark:bg-dark-600"
              md="rounded-2xl"
              overflow="auto"
              flex="~ col"
            >
              <DialogTitle
                as="h3"
                class="flex items-center justify-center text-lg font-medium leading-6"
              >
                <div relative inline-flex flex="grow">
                  <div
                    i-ri-search-line
                    class="absolute left-3 top-2 cursor-pointer text-gray-400"
                  />
                  <input
                    v-model="keyword"
                    type="text"
                    class="w-full rounded-full bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
                    border="~ rounded-full gray-300 op-50 focus:border-blue-500"
                    :placeholder="$t('搜索菜谱')"
                    autofocus py-2 pl-10 pr-3
                  >
                  <div
                    v-if="keyword" i-ri-close-line
                    class="absolute right-3 top-2 cursor-pointer text-gray-400"
                    @click="keyword = ''"
                  />
                </div>
                <div op="70" ml-2 inline-flex cursor-pointer text-base @click="closeModal">
                  {{ $t('取消') }}
                </div>
              </DialogTitle>
              <div flex="~ col grow" overflow="auto" class="mt-2" text-xs>
                <DishTag v-for="item, i in filteredRecipes" :key="i" :dish="item" />
                <van-back-top />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }
</style>