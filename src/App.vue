<template>
    <div id="app">
        <Header title="Task Board"
                :hideUserDropdown="!user"/>
        <Loading v-if="validatingToken"/>
        <Content v-else/>
        <Footer/>
    </div>
</template>

<script>
    import axios from "axios"
    import {baseApiUrl, userKey} from "@/global"
    import {mapState} from "vuex"
    import Header from "@/components/template/Header"
    import Content from "@/components/template/Content"
    import Footer from "@/components/template/Footer"
    import Loading from "@/components/template/Loading"

    export default {
        name: "App",
        components: {Header, Content, Footer, Loading},
        computed: mapState(['user']),
        data: function () {
            return {
                validatingToken: true
            }
        },
        methods: {
            async validateToken() {
                this.validatingToken = true

                const json = localStorage.getItem(userKey)
                const userData = JSON.parse(json)
                this.$store.commit('setUser', null)

                if (!userData) {
                    this.validatingToken = false
                    this.$router.push({name: 'auth'})
                    return
                }

                const res = await axios.post(`${baseApiUrl}/validate-token`, userData)

                if (res.data) {
                    this.$store.commit('setUser', userData)
                } else {
                    localStorage.removeItem(userKey)
                    this.$router.push({name: 'auth'})
                }

                this.validatingToken = false
            }
        },
        created() {
            this.validateToken()
        }
    }
</script>

<style>
</style>