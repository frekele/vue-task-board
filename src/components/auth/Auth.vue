<template>
    <div class="auth-content">
        <div class="auth-modal">
            <h1>Task Board</h1>

            <hr>
            <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>

            <input v-if="showSignup" v-model="user.name" type="text" placeholder="Nome">
            <input v-model="user.email" name="email" type="text" placeholder="E-mail">
            <input v-model="user.password" name="password" type="password" placeholder="Senha">
            <input v-if="showSignup" v-model="user.confirmPassword"
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
                axios.post(`${baseApiUrl}/signin`, this.user)
                    .then(res => {
                        this.$store.commit('setUser', res.data)
                        localStorage.setItem(userKey, JSON.stringify(res.data))
                        this.$router.push({path: '/'})
                    })
                    .catch(showError)
            },
            signup() {
                axios.post(`${baseApiUrl}/signup`, this.user)
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
