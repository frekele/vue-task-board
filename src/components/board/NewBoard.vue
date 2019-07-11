<template>
    <div class="new-board">
        <PageTitle icon="fa fa-th" main="Quadro de Tarefas" sub="Criar Novo Quadro de Tarefas" style="text-align: center"/>

        <b-container>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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
                <b-button type="submit" @click="confirmou = true" variant="primary">Salvar</b-button>

                <b-button type="reset" variant="danger"  style="margin-left: 10px">Limpar</b-button>
            </b-form>
        </b-container>
    </div>
</template>

<script>
    import PageTitle from '../template/PageTitle'

    export default {
        name: 'NewBoard',
        components: {PageTitle},
        data: function () {
            return {
                show: true,
                confirmou: false
            }
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
            this.board = {}
        }
    }
</script>

<style>
</style>
