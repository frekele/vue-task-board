<template>
    <div class="new-column">
    </div>
</template>

<script>
    import axios from 'axios'
    import {baseApiUrl} from '@/global'

    export default {
        name: 'NewColumn',
        components: {},
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
        }
    }
</script>

<style>
</style>
