<template>
    <div class="dashboard">
        <PageTitle icon="fa fa-home" main="Dashboard"
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
        name: 'DashBoard',
        components: {PageTitle},
        data: function () {
            return {
                boards: {}
            }
        },
        methods: {
            getBoards() {
                axios.get(`${baseApiUrl}/board`).then(res => {
                        this.boards = res.data
                    }
                )
            }
        },
        mounted() {
            this.getBoards()
        }
    }
</script>

<style>
</style>
