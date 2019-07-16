import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    iconPack: 'fontawesome',
    duration: 3000,
    position: 'bottom-center',
    keepOnHover: true,
    fullWidth: false,
    fitToScreen: false,
    theme: 'outline'
})

Vue.toasted.register(
    'defaultSuccess',
    (payload) => {
        return !payload.msg ? 'Operação realidada com sucesso!' : payload.msg
    },
    {
        type: 'success',
        icon: 'check'
    }
)

Vue.toasted.register(
    'defaultError',
    (payload) => {
        return !payload.msg ? 'Oops.. Erro inesperado.' : payload.msg
    },
    {
        type: 'error',
        icon: 'times'
    }
)