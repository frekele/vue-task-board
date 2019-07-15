<template>
    <div class="board">
        <div>User: {{ $route.params.id }}</div>

        <hr>
        <div class="simple-page">
            <Container @drop="onDrop">
                <Draggable v-for="item in items" :key="item.id">
                    <div class="draggable-item">
                        {{item.data}}
                    </div>
                </Draggable>
            </Container>
        </div>


    </div>
</template>

<script>
    import axios from 'axios'
    import {baseApiUrl} from '@/global'
    import {Container, Draggable} from "vue-smooth-dnd";
    import {applyDrag, generateItems} from "@/utils/helpers";

    export default {
        name: 'Board',
        components: {Container, Draggable},
        data: function () {
            return {
                boards: {},
                items: generateItems(50, i => ({id: i, data: "Draggable " + i}))
            }
        },
        methods: {
            onDrop(dropResult) {
                this.items = applyDrag(this.items, dropResult);
            },
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
