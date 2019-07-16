<template>
    <div class="boards">
        <PageTitle icon="fa fa-th" main="Quadros de Tarefa" sub=""/>
        <router-link to="/new-board">
            <b-button variant="info" style="margin: 20px">Criar Quadro</b-button>
        </router-link>
        <b-row>
            <b-col class="col-boards" cols="auto" md="auto" v-for="item in boards" v-bind:key="item.id">
                <b-card class="card-boards" bg-variant="secondary" text-variant="white" :title="item.name">
                    <b-card-text>
                        {{ item.description }}
                    </b-card-text>
                    <router-link :to="'/board/' + item.id">
                        <b-button variant="primary">Abrir</b-button>
                    </router-link>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import PageTitle from '../template/PageTitle'
    import axios from 'axios'
    import {baseApiUrl} from '@/global'

    export default {
        name: 'Boards',
        components: {PageTitle},
        data: function () {
            return {
                boards: {}
            }
        },
        computed: {
            waitingForResponse: {
                get() {
                    return this.$store.getters['boardModule/getWaitingForResponse']
                },
                set(value) {
                    this.$store.commit('boardModule/setWaitingForResponse', value)
                }
            }
        },
        methods: {
            async getBoards() {
                this.waitingForResponse = true
                axios.get(`${baseApiUrl}/board`)
                    .then(response => {
                            if (response && response.data) {
                                this.boards = response.data
                            }
                            this.waitingForResponse = false
                        }
                    )
            }
        },
        mounted() {
            let user = this.$store.getters['userModule/getUser']
            if (user && user.token) {
                this.getBoards()
            } else {
                this.$router.push({name: 'auth'})
            }
        }
    }
</script>

<style>
</style>
