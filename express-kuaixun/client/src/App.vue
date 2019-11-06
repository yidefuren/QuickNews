<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
    import jwt_decode from 'jwt-decode'

    export default {
        name: 'app',
        created() {
            if (localStorage.eleToken) {
                const decoded = jwt_decode(localStorage.eleToken)
                // 存储数据
                this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decoded));
                this.$store.dispatch("setUser", decoded);
            }
        },
        methods: {
            isEmpty(value) {
                return (
                    value === undefined ||
                    value === null ||
                    (typeof value === "object" && Object.keys(value).length === 0) ||
                    (typeof value === "string" && value.trim().length === 0)
                );
            }
        }
    }
</script>
<style>
    body, ol, ul, h1, h2, h3, h4, h5, h6, p, th, td, dl, dd, form, fieldset, legend, input, textarea, select {
        margin: 0;
        padding: 0
    }

    body {
        font: 12px "宋体", "Arial Narrow", HELVETICA;
        background: #fff;
        -webkit-text-size-adjust: 100%;
    }

    a {
        color: #2d374b;
        text-decoration: none
    }

    a:hover {
        color: #cd0200;
        text-decoration: underline
    }

    em {
        font-style: normal
    }

    li {
        list-style: none
    }

    img {
        border: 0;
        vertical-align: middle
    }

    table {
        border-collapse: collapse;
        border-spacing: 0
    }

    p {
        word-wrap: break-word
    }
</style>
