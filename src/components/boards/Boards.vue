<template>
    <div class="boards">
        <PageTitle icon="fa fa-home" main="boards"
                   sub="Tasks Board"/>
        <div class="boards">
            <router-link to="/new-board">
                <b-button variant="info">Criar Quadro</b-button>
            </router-link>
            <b-row>
                <b-col cols="3" v-for="item in boards" v-bind:key="item.id">
                    <b-card bg-variant="dark" text-variant="white" :title="item.name">
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
        methods: {
            async getBoards() {
                axios.get(`${baseApiUrl}/board`)
                    .then(response => {
                            if (response && response.data) {
                                this.boards = response.data
                            }
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
