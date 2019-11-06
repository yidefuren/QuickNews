<template>
    <el-page-header @back="goBack" content="the page not found">
    </el-page-header>
</template>

<script>
    export default {
        methods: {
            goBack() {
                this.$router.go(-1)
            }
        }
    }
</script>