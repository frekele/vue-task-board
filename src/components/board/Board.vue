<template>
    <div class="board">
        <b-container fluid>
            <b-row>
                <b-col>
                    <div class="page-title">
                        <h1><i class="fa fa-th"></i> {{board.name}}</h1>
                        <h2>{{board.description}}</h2>
                    </div>
                </b-col>

                <b-col>
                    <router-link :to="'/edit-board/'+ id">
                        <b-button variant="warning" class="float-right">
                            <i class="fa fa-pencil" aria-hidden="true"></i> Editar
                        </b-button>
                    </router-link>
                </b-col>
            </b-row>
        </b-container>
        <hr>

    </div>
</template>

<script>
    import {mapGetters} from "vuex"
    import {Container, Draggable} from "vue-smooth-dnd";
    import {applyDrag, generateItems} from "@/utils/helpers";


    export default {
        name: 'Board',
        components: {Container, Draggable},
        props: ['id'],
        data: function () {
            return {}
        },
        computed: {
            board: {
                get() {
                    return this.$store.getters['boardModule/getBoard']
                },
                set(value) {
                    this.$store.commit('boardModule/setBoard', value)
                }
            }
        },
        methods: {
            async loadEagerFullBoard() {
                this.$store.dispatch('boardModule/loadEagerFullBoard', {id: this.id}).then(() => {
                })
            }
        },
        mounted() {
            this.loadEagerFullBoard()
        }

    }
</script>

<style>
</style>
