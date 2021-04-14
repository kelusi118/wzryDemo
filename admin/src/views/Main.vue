<template>
  <el-container style="height: 100vh;">
    <el-header class="topbar header">
      <span>后台管理系统</span>
      <i class="el-icon-switch-button" @click="$router.push('/login')"></i>
    </el-header>
    <el-container class="content" style="height: 400px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="['1']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-s-help"></i>分类管理</template>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/edit">分类新建</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>资源管理</template>
          <el-menu-item-group>
            <template slot="title">物品</template>
            <el-menu-item index="/items/edit">新建物品</el-menu-item>
            <el-menu-item index="/items/list">物品列表</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <template slot="title">英雄</template>
            <el-menu-item index="/heroes/edit">新建英雄</el-menu-item>
            <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <template slot="title">文章</template>
            <el-menu-item index="/articles/edit">新建文章</el-menu-item>
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <template slot="title">视频</template>
            <el-menu-item index="/videos/edit">新建视频</el-menu-item>
            <el-menu-item index="/videos/list">视频列表</el-menu-item>
          </el-menu-item-group>

        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-s-opportunity"></i>广告位管理</template>
          <el-menu-item-group>
            <template slot="title">广告位</template>
            <el-menu-item index="/ads/edit">新建广告位</el-menu-item>
            <el-menu-item index="/ads/list">广告位列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title"><i class="el-icon-s-custom"></i>人员管理</template>
          <el-menu-item-group>
            <template slot="title">管理</template>
            <el-menu-item index="/admin_users/edit">新建管理员</el-menu-item>
            <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      </el-aside>
      <el-main>
        <!-- <router-view> 默认组件形式，用同一个组件难以区分 
          故用 $route.path 路径区分 -->
        <router-view :key="$route.path"></router-view>
      </el-main> 
    </el-container>

 </el-container>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    }
  };
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .topbar{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    height: 60px;
  } 
  .header{
    display: flex;
    padding: 0 30px;
    justify-content: space-between;
    align-items: center;
  }
  .content{
    margin-top: 60px;
  }
  .el-header{
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    line-height: 20px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    line-height: 20px;
  }
  
</style>