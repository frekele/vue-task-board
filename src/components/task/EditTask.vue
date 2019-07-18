<template>
    <div class="edit-new-task">
        <PageTitle icon="fa fa-check-square-o" :main="mainTitle" :sub="subTitle" style="text-align: center"/>

        <b-container>
            <b-form @submit.stop.prevent v-if="show">
                <b-form-group
                        id="task-name-group"
                        label="Nome da Tarefa:"
                        label-for="task-name">
                    <b-form-input
                            id="task-name"
                            v-model.trim="task.name"
                            type="text"
                            :state="validation('name')"
                            placeholder="Digite o nome da tarefas"
                    ></b-form-input>
                    <b-form-invalid-feedback :state="validation('name')">
                        O Nome deve conter de 3 a 40 caracteres.
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group id="task-description-group" label="Descrição da Tarefa:" label-for="task-description">
                    <b-form-textarea
                            id="task-description"
                            v-model="task.description"
                            placeholder="Digite alguma coisa..."
                            rows="4"
                            max-rows="250"
                    ></b-form-textarea>
                </b-form-group>
                <hr>
                <b-row>
                    <b-col cols="12" sm="6">
                        <router-link :to="'/board/' + boardId">
                            <b-button @click="confirmed = true" variant="secondary">
                                <i class="fa fa-chevron-circle-left" aria-hidden="true"></i> Voltar
                            </b-button>
                        </router-link>
                    </b-col>

                    <b-col cols="12" sm="6" :style=" ($mq === 'xs') ? 'margin-top: 20px;' : ''">
                        <b-button type="reset"
                                  class="float-right"
                                  @click.prevent="clear"
                                  v-if="isNewTask"
                                  variant="danger">
                            <span><i class="fa fa-eraser" aria-hidden="true"></i> Limpar</span>
                        </b-button>
                        <b-button type="submit"
                                  class="float-right"
                                  @click.prevent="remove"
                                  v-if="!isNewTask"
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
    import {mapGetters} from "vuex"
    import PageTitle from '../template/PageTitle'

    export default {
        name: 'EditTask',
        components: {PageTitle},
        props: ['boardId', 'columnId', 'id'],
        data: function () {
            return {
                show: true,
                confirmed: false
            }
        },
        computed: {
            ...mapGetters('userModule', {
                user: 'getUser'
            }),
            isNewTask() {
                return !this.id;
            },
            mainTitle() {
                return 'Tarefa'
            },
            subTitle() {
                return this.isNewTask ? 'Criar Nova Tarefas' : ('Editar Tarefa #' + this.id)
            },
            task: {
                get() {
                    return this.$store.getters['taskModule/getTask']
                },
                set(value) {
                    this.$store.commit('taskModule/setTask', value)
                }
            }
        },
        methods: {
            validation(fieldName) {
                switch (fieldName) {
                    case 'name':
                        if (this.task.name) {
                            return this.task.name.length > 3 && this.task.name.length <= 40
                        } else {
                            return false;
                        }
                    case 'description':
                        if (this.task.description) {
                            return this.task.description.length >= 0 && this.task.description.length <= 250
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
                if (this.isNewTask) {
                    this.insertTask()
                    this.$router.push({path: '/board/' + this.boardId})
                } else {
                    this.updateTask()
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
                            if (!this.isNewTask) {
                                this.deleteTask()
                                this.$router.push({path: '/board/' + this.boardId})
                            }
                        }
                    })
                    .catch(() => {
                    })
            },
            clear(event) {
                event.preventDefault()
                this.task = {}
                this.show = false
                this.confirmed = false
                this.$nextTick(() => {
                    this.show = true
                })
            },
            loadTask() {
                this.$store.dispatch('taskModule/loadTask', {id: this.id}).then()
            },
            insertTask() {
                this.$store.dispatch('taskModule/insertTask').then(() => {
                    this.$toasted.global.defaultSuccess({msg: this.mainTitle + ' inserido com Sucesso!'})
                })
            },
            updateTask() {
                this.$store.dispatch('taskModule/updateTask').then(() => {
                    this.$toasted.global.defaultSuccess({msg: this.mainTitle + ' #' + this.id + ' Alterado com Sucesso!'})
                })
            },
            deleteTask() {
                this.$store.dispatch('taskModule/deleteTask', {id: this.id}).then(() => {
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
            this.task = {}
            if (!this.isNewTask) {
                this.loadTask()
            } else {
                this.task.weight = 1
                this.task.assignedUserId = this.user.id
                this.task.assignedUserName = this.user.name
            }
            this.task.boardId = this.boardId
            this.task.columnId = this.columnId
        }
    }
</script>

<style>
</style>
