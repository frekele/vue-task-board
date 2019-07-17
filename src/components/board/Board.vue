<template>
    <div class="board" style="min-width: 400px">
        <b-container v-if="board.columns">
            <b-row>
                <b-col>
                    <router-link
                            :to="'/board/'+ id +'/column/'+ board.columns[0].id +'/new-task'">
                        <b-button variant="info">
                            <i class="fa fa-plus" aria-hidden="true"></i> Nova Tarefa
                        </b-button>
                    </router-link>
                </b-col>
                <b-col>
                    <div class="page-title">
                        <h2><i class="fa fa-th"></i> {{board.name}} - #{{id}}</h2>
                        <span>{{board.description}}</span>
                    </div>
                </b-col>
                <b-col>
                    <router-link :to="'/edit-board/'+ id">
                        <b-button variant="warning" class="float-right">
                            <i class="fa fa-pencil" aria-hidden="true"></i> Editar Quadro
                        </b-button>
                    </router-link>
                </b-col>
            </b-row>
        </b-container>
        <hr>

        <b-container v-if="board.columns">
            <b-row>
                <b-col>
                    <b-card bg-variant="light" :header="board.columns[0].name" class="text-center">
                        <b-card-text>
                            <Container group-name="board-columns"
                                       :get-child-payload="getPayloadColumns1"
                                       @drop="onDrop(0, $event)">
                                <Draggable v-for="item in board.columns[0].tasks" :key="item.id">
                                    <div class="draggable-item">
                                        <b-row>
                                            <b-col style="text-align: center">
                                                <strong>#{{item.id}} - {{item.name}}</strong>
                                                <router-link
                                                        :to="'/board/'+ id +'/column/'+ board.columns[0].id +'/edit-task/'+ item.id">
                                                    <b-button variant="warning" class="float-right">
                                                        <i class="fa fa-pencil" aria-hidden="true"></i>
                                                    </b-button>
                                                </router-link>
                                            </b-col>
                                        </b-row>
                                        <b-row>
                                            <b-col>
                                                <span>{{item.description}}</span>
                                            </b-col>
                                        </b-row>
                                    </div>
                                </Draggable>
                            </Container>
                        </b-card-text>
                    </b-card>
                </b-col>

                <b-col>
                    <b-card bg-variant="light" :header="board.columns[1].name" class="text-center">
                        <b-card-text>
                            <Container group-name="board-columns"
                                       :get-child-payload="getPayloadColumns2"
                                       @drop="onDrop(1, $event)">
                                <Draggable v-for="item in board.columns[1].tasks" :key="item.id">
                                    <div class="draggable-item">
                                        <b-row>
                                            <b-col style="text-align: center">
                                                <strong>#{{item.id}} - {{item.name}}</strong>
                                                <router-link
                                                        :to="'/board/'+ id +'/column/'+ board.columns[1].id +'/edit-task/'+ item.id">
                                                    <b-button variant="warning" class="float-right">
                                                        <i class="fa fa-pencil" aria-hidden="true"></i>
                                                    </b-button>
                                                </router-link>
                                            </b-col>
                                        </b-row>
                                        <b-row>
                                            <b-col>
                                                <span>{{item.description}}</span>
                                            </b-col>
                                        </b-row>
                                    </div>
                                </Draggable>
                            </Container>
                        </b-card-text>
                    </b-card>
                </b-col>

                <b-col>
                    <b-card bg-variant="light" :header="board.columns[2].name" class="text-center">
                        <b-card-text>
                            <Container group-name="board-columns"
                                       :get-child-payload="getPayloadColumns3"
                                       @drop="onDrop(2, $event)">
                                <Draggable v-for="item in board.columns[2].tasks" :key="item.id">
                                    <div class="draggable-item">
                                        <b-row>
                                            <b-col style="text-align: center">
                                                <strong>#{{item.id}} - {{item.name}}</strong>
                                                <router-link
                                                        :to="'/board/'+ id +'/column/'+ board.columns[2].id +'/edit-task/'+ item.id">
                                                    <b-button variant="warning" class="float-right">
                                                        <i class="fa fa-pencil" aria-hidden="true"></i>
                                                    </b-button>
                                                </router-link>
                                            </b-col>
                                        </b-row>
                                        <b-row>
                                            <b-col>
                                                <span>{{item.description}}</span>
                                            </b-col>
                                        </b-row>
                                    </div>
                                </Draggable>
                            </Container>
                        </b-card-text>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>

<script>
    import {Container, Draggable} from "vue-smooth-dnd";
    import {applyDrag} from "@/utils/helpers";

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
            onDrop(columnIndex, dropResult) {
                this.board.columns[columnIndex].tasks = applyDrag(this.board.columns[columnIndex].tasks, dropResult)
            },
            getPayloadColumns1(index) {
                return this.board.columns[0].tasks[index]
            },
            getPayloadColumns2(index) {
                return this.board.columns[1].tasks[index]
            },
            getPayloadColumns3(index) {
                return this.board.columns[2].tasks[index]
            },
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

    .draggable-item {
        /*height: 50px;*/
        /*line-height: 50px;*/
        text-align: center;
        display: block;
        background-color: #fff;
        outline: 0;
        border: 1px solid rgba(0, 0, 0, .125);
        margin-bottom: 2px;
        margin-top: 2px;
        cursor: default;
        user-select: none;
    }

    .draggable-item-horizontal {
        height: 300px;
        padding: 10px;
        line-height: 100px;
        text-align: center;
        /* width : 200px; */
        display: block;
        background-color: #fff;
        outline: 0;
        border: 1px solid rgba(0, 0, 0, .125);
        margin-right: 4px;
        cursor: default;
    }

    .dragging {
        background-color: yellow;
    }

    .card-scene {
        padding: 50px;
        /* background-color: #fff; */
    }

    .card-container {
        width: 320px;
        padding: 10px;
        margin: 5px;
        margin-right: 45px;
        background-color: #f3f3f3;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
    }

    .card {
        margin: 5px;
        /* border: 1px solid #ccc; */
        background-color: white;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
        padding: 10px;
    }

    .card-column-header {
        font-size: 18px;
    }

    .column-drag-handle {
        cursor: move;
        padding: 5px;
    }

    .card-body {
        padding: 0;
    }

</style>
