import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    iconPack: 'fontawesome',
    duration: 3000
})

Vue.toasted.register(
    'showSuccess',
    payload => !payload.message ? 'Operação realizada com sucesso!' : payload.message,
    { type: 'success', icon: 'check' }
)

Vue.toasted.register(
    'showError',
    payload => !payload.message ? 'Oops... Erro inesperado.' : payload.message,
    { type: 'error', icon: 'times' }
)
