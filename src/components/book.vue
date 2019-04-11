<template>
    <div class="book">

    </div>
</template>

<script>
    export default {
        name: "Index",
        created(){
            this.$store.commit('show_tabShow');
        }
    }
</script>

<style scoped>

</style>