<template>
    <div class="boards">
        <PageTitle icon="fa fa-th" main="Quadros de Tarefa" sub=""/>
        <b-container>
            <router-link to="/new-board">
                <b-button variant="info"
                          style="margin: 10px"
                          v-b-tooltip.hover
                          title="Adicionar Novo Quadro">
                    <i class="fa fa-plus" aria-hidden="true"></i> Novo Quadro
                </b-button>
            </router-link>
            <b-row>
                <b-col class="col-boards" v-for="item in boards" v-bind:key="item.id">
                    <b-card no-body class="card-boards overflow-hidden" bg-variant="primary" text-variant="white">
                        <b-row no-gutters>
                            <b-col md="12">
                                <router-link :to="'/board/' + item.id" class="float-right">
                                    <b-button variant="light">
                                        <i class="fa fa-folder-open"
                                           v-b-tooltip.hover
                                           title="Abrir Quadro"
                                           aria-hidden="true"></i></b-button>
                                </router-link>
                            </b-col>
                            <b-col md="12">
                                <h3>{{ item.name }}</h3>
                            </b-col>
                            <b-col md="12">
                                <b-card-body>
                                    <b-card-text>
                                        {{ item.description }}
                                    </b-card-text>
                                </b-card-body>
                            </b-col>

                        </b-row>
                    </b-card>

                </b-col>
            </b-row>
        </b-container>
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
