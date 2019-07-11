<template>
    <div class="auth-content">
        <div class="auth-modal">
            <h1>Task Board</h1>

            <hr>
            <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>

            <input id="name" v-if="showSignup" v-model="user.name" type="text" placeholder="Nome">
            <input id="email" v-model="user.email" name="email" type="email" placeholder="E-mail">
            <input id="password" v-model="user.password" name="password" type="password" placeholder="Senha">
            <input id="confirmPassword" v-if="showSignup" v-model="user.confirmPassword"
                   type="password" placeholder="Confirme a Senha">

            <button v-if="showSignup" @click="signUp">Registrar</button>
            <button v-else @click="signIn">Entrar</button>

            <a href @click.prevent="showSignup = !showSignup">
                <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
                <span v-else>Não tem cadastro? Registre-se aqui!</span>
            </a>
        </div>
    </div>
</template>

<script>
    import {showError,} from '@/global'

    export default {
        name: 'Auth',
        data: function () {
            return {
                showSignup: false,
            }
        },
        computed: {
            user: {
                get() {
                    return this.$store.getters['userModule/getUser']
                },
                set(value) {
                    this.$store.userModule.commit('setUser', value)
                }
            }
        },
        methods: {
            signIn() {
                this.$store.dispatch('userModule/signIn', null)
                    .then(() => {
                        this.$router.push({path: '/'})
                    })
                    .catch(showError)
            },
            signUp() {
                this.$store.dispatch('userModule/signIn', null)
                    .then(() => {
                        this.$toasted.global.defaultSuccess()
                        this.showSignup = false
                    })
                    .catch(showError)
            }
        }
    }
</script>

<style>
</style>
