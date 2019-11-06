<template>
    <div class="wraper">
        <el-timeline>
            <el-timeline-item class="infinite-list-item" :timestamp="item.time" placement="top"
                              v-for="(item, key) in news">
                <el-card>
                    <p>{{item.title}}</p>
                </el-card>

            </el-timeline-item>
        </el-timeline>
        <div style="text-align: center" v-show="news">
            <a href="javascript:void(0)" v-on:click="more()" class="more">加载更多</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data() {
            return {
                news: [],
                page: 1,
                pageSize: 10
            }
        },
        components: {},
        created() {
            this.fetch()
        },
        computed: {},
        methods: {
            async fetch() {
                let res = await this.$http.get(`kx?page=${this.page}&pageSize=${this.pageSize}`)
                this.news = this.news.concat(res.data)
            },
            more() {
                this.page = this.page + 1
                this.fetch()
            }
        }
    }
</script>

<style>
    .wraper {
        padding: 20px;
    }
    .more {
        color: #c8c9cc;
        text-decoration: none;
        outline: none;
        cursor: pointer;
    }
</style>
