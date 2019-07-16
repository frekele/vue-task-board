<template>
    <div class="edit-new-board">
        <PageTitle icon="fa fa-th" :main="mainTitle" :sub="subTitle" style="text-align: center"/>

        <b-container>
            <b-form @submit.prevent="onSubmit" @reset.prevent="onReset" v-if="show">
                <b-form-group
                        id="board-name-group"
                        label="Nome do Quadro:"
                        label-for="board-name"
                        description="Use um nome curto de preferência!">
                    <b-form-input
                            id="board-name"
                            v-model="board.name"
                            type="text"
                            required
                            placeholder="Digite o nome do quadro de tarefas"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="board-description-group" label="Descrição:" label-for="board-description">
                    <b-form-textarea
                            id="board-description"
                            v-model="board.description"
                            placeholder="Digite alguma coisa..."
                            rows="3"
                            max-rows="250"
                    ></b-form-textarea>
                </b-form-group>
                <hr>
                <b-button type="submit" @click="confirmou = true" variant="primary" style="margin-right: 10px">
                    <span>Salvar</span>
                </b-button>
                <b-button type="submit" v-if="!isNewBoard" variant="danger">
                    <span>Excluir</span>
                </b-button>
                <b-button type="reset" v-if="isNewBoard" variant="danger">
                    <span>Limpar</span>
                </b-button>
            </b-form>
        </b-container>
    </div>
</template>

<script>
    import PageTitle from '../template/PageTitle'

    export default {
        name: 'EditBoard',
        components: {PageTitle},
        props: ['id'],
        data: function () {
            return {
                show: true,
                confirmou: false
            }
        },
        computed: {
            isNewBoard() {
                return !this.id;
            },
            mainTitle() {
                return 'Quadro de Tarefas'
            },
            subTitle() {
                return this.isNewBoard ? 'Criar Novo Quadro de Tarefas' : ('Editar Quadro de Tarefas #' + this.id)
            },
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
            onSubmit(event) {
                event.preventDefault()
                alert(JSON.stringify(this.board))
                this.$router.push({path: '/'})
            },
            onReset(event) {
                event.preventDefault()
                this.board = {}
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            },
            loadBoard() {
                this.$store.dispatch('boardModule/loadBoard', {id: this.id}).then()
            },
            insertBoard() {
                this.$store.dispatch('boardModule/insertBoard').then()
            },
            updateBoard() {
                this.$store.dispatch('boardModule/updateBoard').then()
            }
        },
        beforeRouteLeave(to, from, next) {
            if (this.confirmou) {
                next()
            } else {
                if (confirm('Tem certeza?')) {
                    next()
                } else {
                    next(false)
                }
            }
        },
        mounted() {
            if (this.isNewBoard) {
                this.board = {}
            } else {
                this.loadBoard()
            }
        }
    }
</script>

<style>
</style>
