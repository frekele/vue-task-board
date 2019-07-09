<template>
    <header class="header">
        <h1 class="title">
            <router-link to="/">{{ title }}</router-link>
        </h1>
        <UserDropdown v-if="!hideUserDropdown"/>
    </header>
</template>

<script>
    import UserDropdown from './UserDropdown'

    export default {
        name: 'Header',
        components: {UserDropdown},
        props: {
            title: String,
            hideUserDropdown: Boolean
        },
        computed: {},
        methods: {}
    }
</script>

<style>

</style>
