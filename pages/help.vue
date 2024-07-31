<script lang="ts" setup>
const router = useIonRouter()
function backRandom() {
  router.push('/random')
}
function nextUser() {
  router.push('/user')
}
function handleRefresh(event: CustomEvent) {
  setTimeout(() => {
    if (event.target) {
      (event.target as HTMLIonRefresherElement).complete()
    }
  }, 2000)
}
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <van-nav-bar
          :title="$t('FAQ')"
          left-arrow
          @click-left="backRandom"
          @click-right="nextUser"
        >
          <template #left>
            <van-icon name="arrow-double-left" dot size="30" />
          </template>

          <template #right>
            <van-icon name="user-o" size="30" />
          </template>
        </van-nav-bar>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <template #fixed>
        <ion-refresher :pull-factor="0.5" :pull-min="100" :pull-max="200" @ion-refresh="handleRefresh($event)">
          <ion-refresher-content />
        </ion-refresher>
      </template>
      <div class="w-full">
        <InstallPwa />

        <FeedbackActions />

        <div class="mx-auto max-w-md w-full rounded-2xl p-2" text-left>
          <FAQItem :title="$t('faq.未来计划')">
            {{ $t('faq.1') }}
          </FAQItem>

          <FAQItem :title="$t('faq.什么是模式')">
            <ul>
              <li><b>{{ $t('模糊匹配') }}</b>：{{ $t('faq.31') }}</li>
              <li><b>{{ $t('faq.精准匹配') }}</b>：{{ $t('faq.32') }}</li>
              <li><b>{{ $t('faq.生存模式') }}</b>：{{ $t('faq.33') }}</li>
            </ul>
          </FAQItem>

          <FAQItem :title="$t('faq.如何快速清空所选食材和工具')">
            <div inline-flex items-center justify-center>
              {{ $t('faq.点击顶部') }} <div i-mdi-pot-steam-outline mx-1 inline-block /> {{ $t('faq.图标即可') }}
            </div>
          </FAQItem>

          <FAQItem title="是否有微信小程序?" class-name="hidden">
            因不可抗力（小程序因跳转 B 站视频而被判定为导流违规）下架。
            将不再提供小程序版本。
            <br>
            <br>
            搜索微信公众号<b>「云游君」</b>并发送<b>「做菜」</b>，也可以快速找到本网站。
          </FAQItem>

          <FAQItem :title="$t('faq.是否有')">
            <b>{{ $t('faq.APP') }}</b>
          </FAQItem>

          <FAQItem title="未来是否会收费？" class-name="hidden">
            该项目将以免费开源的形式运营。
            <br>
            您可以考虑赞助本项目，以支持我们的开发。
            我会将其投入在周边的服务器、域名、CDN 等费用上。
            <ul mt-1>
              <li>
                <a href="https://afdian.net/a/yunyoujun" target="_blank">爱发电赞助</a>
              </li>
              <li>
                <a href="https://sponsors.yunyoujun.cn/" target="_blank">我要直接打钱！</a>
              </li>
            </ul>
          </FAQItem>

          <FAQItem :title="$t('faq.页面无法点击')">
            <blockquote>
              {{ $t('faq.MODE') }}
            </blockquote>
            <br>
            <ol>
              <li>
                <b>{{ $t('faq.Cookie') }}</b>
                <ol>
                  <li>
                    {{ $t('faq.点击浏览器网址前方的') }}
                  </li>
                  <li>
                    {{ $t('faq.Cookie2') }}
                  </li>
                </ol>
              </li>
              <li>
                <b>{{ $t('faq.强制刷新缓存') }}</b>
                <ul>
                  <li>Windows: <code>Ctrl + F5</code></li>
                  <li>macOS: <code>Cmd + Shift + R</code></li>
                </ul>
              </li>
            </ol>
          </FAQItem>

          <hr h="1" my="4" bg-black>

          <FAQItem :default-open="true" :title="$t('faq.关于')">
            <div text-left>
              <ul>
                <li>
                  {{ $t('faq.about_1') }}
                </li>
                <li>
                  {{ $t('faq.about_2') }}
                </li>
              </ul>
            </div>
          </FAQItem>

          <FAQItem :title="$t('faq.关于我页面无法点击')">
            <div text-left>
              {{ $t('faq.about_3') }}
            </div>
          </FAQItem>

          <FAQItem title="致谢" class-name="hidden">
            <p>
              感谢以下小伙伴为本项目提供的数据支持和 QA ！
            </p>

            <ul mt-2 text-left text-sm>
              <li>
                <a href="https://weibo.com/runny" target="_blank">Runny</a>
              </li>
              <li>
                麒麟
              </li>
              <li>
                晴方啾
              </li>
              <li>
                课代表阿伟
              </li>
            </ul>
          </FAQItem>

          <FAQItem title="赞助者们" class-name="hidden">
            <div>
              感谢至今以来所有的<a href="https://afdian.net/a/yunyoujun" class="text-purple" target="_blank">赞助者</a>们，你们的支持是我持续维护和开发新项目的动力！
            </div>
            <div pt-2>
              <a href="https://sponsors.yunyoujun.cn" target="_blank">
                <img src="https://sponsors.yunyoujun.cn/sponsors.svg">
              </a>
            </div>
          </FAQItem>
        </div>
      </div>
      <BaseFooter mt-4 />
    </ion-content>
  </ion-page>
</template>

<style scoped>
.ml-custom {
  margin-left: 28%;
}
</style>
