<template>
    <div class="dashboard">
        <PageTitle icon="fa fa-home" main="Dashboard"
                   sub="Tasks Board"/>
        <div class="boards">
            <b-button variant="info">Criar Quadro</b-button>
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
                axios.get(`${baseApiUrl}/board`).then(res => this.stat = res.data)
            }
        },
        mounted() {
            this.getBoards()
        }
    }
</script>

<style>
</style>
