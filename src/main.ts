import { createApp } from 'vue'

import App from './App.vue'
import { initStore } from './store' // Store
import { initRouter } from './router' // Router
import language from './locales' // 国际化
import '@styles/core/tailwind.css' // tailwind
import '@styles/index.scss' // 样式
import { setupGlobDirectives } from './directives'

const app = createApp(App)

initStore(app)

initRouter(app)
setupGlobDirectives(app)
app.use(language)
app.mount('#app')
