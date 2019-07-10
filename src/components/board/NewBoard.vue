<template>
    <div class="new-board">
    </div>
</template>

<script>
    import axios from 'axios'
    import {baseApiUrl} from '@/global'

    export default {
        name: 'NewBoard',
        components: {},
        data: function () {
            return {
                board: {}
            }
        },
        methods: {
            getBoards() {
                axios.get(`${baseApiUrl}/board`).then(res => {
                        this.boards = res.data
                    }
                )
            }
        }
    }
</script>

<style>
</style>
