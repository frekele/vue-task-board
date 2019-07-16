<template>
    <div class="user-dropdown">
        <div class="user-button">
            <span class="d-none d-sm-block">{{ user.name }}</span>
            <div class="user-dropdown-img">
                <Gravatar :email="user.email" alt="User"/>
            </div>
            <i class="fa fa-angle-down"></i>
        </div>
        <div class="user-dropdown-content">
            <router-link to="/profile">
                <i class="fa fa-user"></i> Meu Perfil
            </router-link>
            <a href @click.prevent="logout"><i class="fa fa-sign-out"></i> Sair</a>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import Gravatar from 'vue-gravatar'

    export default {
        name: 'UserDropdown',
        components: {Gravatar},
        computed: mapState('userModule', ['user']),
        methods: {
            async logout() {
                this.$store.dispatch('userModule/logout', null).then(() => {
                    this.$router.push({name: 'auth'})
                })
            }
        }
    }
</script>

<style>
</style>
