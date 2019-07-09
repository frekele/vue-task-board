<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Dashboard"
                   sub="Tasks Board"/>
        <div class="boards">

        </div>
    </div>
</template>

<script>
    import PageTitle from '../template/PageTitle'
    import axios from 'axios'
    import {baseApiUrl} from '@/global'

    export default {
        name: 'Home',
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
