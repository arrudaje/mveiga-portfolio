import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import tooltip from '@/components/tooltip/tooltip'

const app = createApp(App)
app.directive('tooltip', tooltip)

app.use(router)

app.mount('#app')
