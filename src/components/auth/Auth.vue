<template>
    <div class="auth-content">
        <div class="auth-modal">
            <h1>Task Board</h1>

            <hr>
            <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>

            <input id="name" v-if="showSignup" v-model="user.name" type="text" placeholder="Nome">
            <input id="login" v-model="user.login" name="email" type="email" placeholder="E-mail">
            <input id="password" v-model="user.password" name="password" type="password" placeholder="Senha">
            <input id="confirmPassword" v-if="showSignup" v-model="user.confirmPassword"
                   type="password" placeholder="Confirme a Senha">

            <button v-if="showSignup" @click="signup">Registrar</button>
            <button v-else @click="signin">Entrar</button>

            <a href @click.prevent="showSignup = !showSignup">
                <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
                <span v-else>Não tem cadastro? Registre-se aqui!</span>
            </a>
        </div>
    </div>
</template>

<script>
    import {baseApiUrl, showError, userKey} from '@/global'
    import axios from 'axios'

    export default {
        name: 'Auth',
        data: function () {
            return {
                showSignup: false,
                user: {}
            }
        },
        methods: {
            signin() {
                this.$log(this.user)
                axios.post(`${baseApiUrl}/sign-in`, this.user)
                    .then(res => {
                        this.$store.commit('setUser', res.data)
                        localStorage.setItem(userKey, JSON.stringify(res.data))
                        this.$router.push({path: '/'})
                    })
                    .catch(showError)
            },
            signup() {
                this.$log(this.user)
                axios.post(`${baseApiUrl}/sign-up`, this.user)
                    .then(() => {
                        this.$toasted.global.defaultSuccess()
                        this.user = {}
                        this.showSignup = false
                    })
                    .catch(showError)
            }
        }
    }
</script>

<style>
</style>
