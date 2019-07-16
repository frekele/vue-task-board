<template>
    <div id="app">
        <Header title="Task Board"
                :hideUserDropdown="!user.token"/>
        <Loading v-if="validatingToken || waitingForResponse"/>
        <Content v-else/>
        <Footer/>
    </div>
</template>

<script>
    import {mapGetters} from "vuex"
    import Header from "@/components/template/Header"
    import Content from "@/components/template/Content"
    import Footer from "@/components/template/Footer"
    import Loading from "@/components/template/Loading"

    export default {
        name: "App",
        components: {Header, Content, Footer, Loading},
        computed: {
            ...mapGetters('userModule', {
                validatingToken: 'getValidatingToken',
                user: 'getUser'
            }),
            ...mapGetters('boardModule', {
                waitingForResponse: 'getWaitingForResponse'
            })
        },
        methods: {
            async validateToken() {
                this.$store.dispatch('userModule/validateToken', null).then((valid) => {
                    if (!valid) {
                        this.$router.push({name: 'auth'})
                    }
                })
            }
        },
        created() {
            this.validateToken()
        }
    }
</script>

<style>
</style>