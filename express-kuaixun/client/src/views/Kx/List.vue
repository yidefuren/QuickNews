<template>
    <div>
        <h1>快訊列表</h1>
        <el-table :data="items">
            <el-table-column prop="_id" label="ID" width="230"></el-table-column>
            <el-table-column prop="title" label="標題"></el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="$router.push(`/kx/edit/${scope.row._id}`)">编辑
                    </el-button>
                    <el-button type="text" size="small" @click="remove(scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                    layout="prev, pager, next"
                    @current-change="current_change"
                    :total="total"
                    :page-size="pageSize"
            >
            </el-pagination>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'kxList',
        data() {
            return {
                items: [],
                total: 10,
                currentPage: 1,
                pageSize: 10
            }
        },
        components: {},
        methods: {
            async fetch() {
                let total = await this.$http.get('kxCount')
                this.total = total.data.total
                // eslint-disable-next-line no-console
                console.log(this.total)

                let res = await this.$http.get(`kx?page=${this.currentPage}`)
                this.items = res.data
            },
            async remove(row) {
                await this.$http.delete(`kx/${row._id}`)
                this.$message({
                    type: 'success',
                    message: '刪除成功'
                })
                this.fetch()
            },
            current_change(currentPage) {
                // eslint-disable-next-line no-console
                this.currentPage = currentPage
                this.fetch()
            }
        },
        created() {
            this.fetch()
        }
    }
</script>