<template>
    <div>
        <h1>{{id ? '編輯' : '創建'}}快訊</h1>
        <el-form label-width="120px" @submit.native.prevent="save" :rules="rules">
            <el-form-item label="内容">
                <el-input placeholder="請輸入内容" v-model="model.title" type="textarea"
                          :rows="3" maxlength="150"
                          show-word-limit></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'kxAdd',
        props: {
            id: {}
        },
        data() {
            return {
                model: {},
                rules: {
                    title: [
                        {required: true, message: "内容不能为空", trigger: "blur"},
                        {min: 10, max: 150, message: "长度在 10 到 150 个字符", trigger: "blur"}
                    ]
                }
            }
        },
        components: {},
        methods: {
            async save() {
                if (this.id) {
                    // eslint-disable-next-line no-console
                    console.log('a')
                    await this.$http.put(`kx/${this.id}`, this.model)
                } else {
                    // eslint-disable-next-line no-console
                    // id 20191103164043467100
                    this.model.id = this.generIdDate()
                    // time 16:40:43
                    this.model.time = this.generTime()
                    await this.$http.post('kx', this.model)
                }
                this.$router.push('/kx/list')
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
            },
            async fetch() {
                const res = await this.$http.get(`kx/${this.id}`)
                this.model = res.data
            },
            generIdDate() {
                let tmp = this.timest()
                const date = new Date(tmp * 1000)
                let Y = date.getFullYear() + ''
                let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '';
                let D = date.getDate()
                if (D >= '0' && D <= '9') {
                    D = '0' + D
                }
                return Y + M + D + tmp + Math.floor(Math.random() * 90) + 10
            },
            generTime() {
                return this.timestampToTime(this.timest())
            },
            timestampToTime(timestamp) {
                const date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                // var Y = date.getFullYear() + '-';
                // var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                // var D = date.getDate() + ' ';
                let h = date.getHours() + ':';
                let m = date.getMinutes();
                let s = date.getSeconds();

                if (m >= '0' && m <= '9') {
                    // eslint-disable-next-line no-console
                    console.log(m)
                    m = '0' + m
                }
                m = m + ':'

                return h + m + s;
            },
            timest() {
                let tmp = Date.parse(new Date()).toString();
                tmp = tmp.substr(0, 10);
                return tmp;
            }
        },
        created() {
            this.id && this.fetch()
        }
    }
</script>