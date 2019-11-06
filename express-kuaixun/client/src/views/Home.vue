<template>
    <el-container style="height: 100vh;">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-openeds="['1', '3']" router>
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>内容管理</template>
                    <el-menu-item-group>
                        <template slot="title">快訊</template>
                        <el-menu-item index="/kx/list">快訊列表</el-menu-item>
                        <el-menu-item index="/kx/add">添加快訊</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>

            </el-menu>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown @command="handleCommand">
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>{{user.name}}</span>
            </el-header>

            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: 'home',
        data() {
            const item = {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            };
            return {
                tableData: Array(20).fill(item)
            }
        },
        components: {},
        methods: {
            handleCommand(command) {
                if (command == 'logout') {
                    this.logout()
                }
            },
            logout() {
                localStorage.removeItem('eleToken')
                this.$store.dispatch('clearCurrentState')
                this.$router.push('/login')
            }
        },
        computed: {
            user() {
                return this.$store.getters.user
            }
        }

    }
</script>

<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>