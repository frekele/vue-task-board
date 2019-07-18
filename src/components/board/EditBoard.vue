<template>
    <div class="edit-new-board">
        <PageTitle icon="fa fa-th" :main="mainTitle" :sub="subTitle" style="text-align: center"/>
        <b-container>
            <b-form @submit.stop.prevent v-if="show">
                <b-form-group
                        id="board-name-group"
                        label="Nome do Quadro:"
                        label-for="board-name">
                    <b-form-input
                            id="board-name"
                            v-model.trim="board.name"
                            type="text"
                            :state="validation('name')"
                            placeholder="Digite o nome do quadro de tarefas"
                    ></b-form-input>
                    <b-form-invalid-feedback :state="validation('name')">
                        O Nome deve conter de 3 a 25 caracteres.
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group id="board-description-group" label="Descrição:" label-for="board-description">
                    <b-form-textarea
                            id="board-description"
                            v-model="board.description"
                            placeholder="Digite alguma coisa..."
                            rows="3"
                            max-rows="50"
                    ></b-form-textarea>
                </b-form-group>
                <hr>
                <b-row>
                    <b-col cols="12" sm="6">
                        <router-link :to="isNewBoard ? '/' : '/board/' + id ">
                            <b-button @click="confirmed = true" variant="secondary">
                                <i class="fa fa-chevron-circle-left" aria-hidden="true"></i> Voltar
                            </b-button>
                        </router-link>
                    </b-col>

                    <b-col cols="12" sm="6" :style=" ($mq === 'xs') ? 'margin-top: 20px;' : ''">
                        <b-button type="reset"
                                  class="float-right"
                                  @click.prevent="clear"
                                  v-if="isNewBoard"
                                  variant="danger">
                            <span><i class="fa fa-eraser" aria-hidden="true"></i> Limpar</span>
                        </b-button>
                        <b-button type="submit"
                                  class="float-right"
                                  @click.prevent="remove"
                                  v-if="!isNewBoard"
                                  variant="danger">
                            <span><i class="fa fa-times" aria-hidden="true"></i> Excluir</span>
                        </b-button>
                        <b-button type="submit"
                                  class="float-right"
                                  @click.prevent="save"
                                  :disabled="!validation('name')"
                                  variant="primary"
                                  style="margin-right: 10px">
                            <span><i class="fa fa-check" aria-hidden="true"></i> Salvar</span>
                        </b-button>
                    </b-col>
                </b-row>
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
                confirmed: false
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
            validation(fieldName) {
                switch (fieldName) {
                    case 'name':
                        if (this.board.name) {
                            return this.board.name.length > 3 && this.board.name.length <= 25
                        } else {
                            return false;
                        }
                    case 'description':
                        if (this.board.description) {
                            return this.board.description.length >= 0 && this.board.description.length <= 50
                        } else {
                            return null;
                        }
                    default:
                        throw new Error("Nome do campo incorreto.")
                }
            },
            save(event) {
                event.preventDefault()
                this.confirmed = true
                //alert(JSON.stringify(this.board))
                if (this.isNewBoard) {
                    this.insertBoard()
                    this.$router.push({path: '/'})
                } else {
                    this.updateBoard()
                }

            },
            remove(event) {
                event.preventDefault()
                this.$bvModal.msgBoxConfirm('Você tem certeza que deseja excluir o quadro de tarefas?', {
                    titleHtml: '<i class="fa fa-question-circle" aria-hidden="true"></i> Confirmação',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'SIM',
                    cancelTitle: 'NÃO',
                    footerClass: 'p-3',
                    hideHeaderClose: false,
                    centered: true
                })
                    .then(value => {
                        if (value) {
                            this.confirmed = true
                            if (!this.isNewBoard) {
                                this.deleteBoard()
                                this.$router.push({path: '/'})
                            }
                        }
                    })
                    .catch(() => {
                    })
            },
            clear(event) {
                event.preventDefault()
                this.board = {}
                this.show = false
                this.confirmed = false
                this.$nextTick(() => {
                    this.show = true
                })
            },
            loadBoard() {
                this.$store.dispatch('boardModule/loadBoard', {id: this.id}).then()
            },
            insertBoard() {
                this.$store.dispatch('boardModule/insertBoard').then(() => {
                    this.$toasted.global.defaultSuccess({msg: this.mainTitle + ' inserido com Sucesso!'})
                })
            },
            updateBoard() {
                this.$store.dispatch('boardModule/updateBoard').then(() => {
                    this.$toasted.global.defaultSuccess({msg: this.mainTitle + ' #' + this.id + ' Alterado com Sucesso!'})
                })
            },
            deleteBoard() {
                this.$store.dispatch('boardModule/deleteBoard', {id: this.id}).then(() => {
                    this.$toasted.global.defaultSuccess({msg: this.mainTitle + ' #' + this.id + ' Excluido com Sucesso!'})
                })
            }
        },
        beforeRouteLeave(to, from, next) {
            if (this.confirmed) {
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
            if (!this.isNewBoard) {
                this.loadBoard()
            }
        }
    }
</script>

<style>
</style>
