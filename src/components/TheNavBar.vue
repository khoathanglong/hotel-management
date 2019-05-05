<template>
  <el-menu
    :default-active="$route.fullPath"
    id="nav-bar"
    mode="horizontal"
    router
  >
    <!-- display submenu in xs screen -->
    <el-submenu class="hidden-sm-and-up menu">
      <span slot="title">
        <i class="el-icon-menu"></i>
        Menu
      </span>
      <el-menu-item index="/">
        <span slot="title">Danh sách phòng</span>
      </el-menu-item>
      <el-menu-item index="/room-service">
        <span slot="title">Dịch vụ phòng</span>
      </el-menu-item>
      <el-menu-item index="/revenue">
        <span slot="title">Doanh thu</span>
      </el-menu-item>
    </el-submenu>
    <!--  -->

    <!-- display full menu in small screen and up -->
    <el-menu-item index="/" class="hidden-xs-only">
      <span slot="title">Danh sách phòng</span>
    </el-menu-item>
    <el-menu-item index="/room-service" class="hidden-xs-only">
      <span slot="title">Dịch vụ phòng</span>
    </el-menu-item>
    <el-menu-item index="/revenue" class="hidden-xs-only">
      <!-- <i class="el-icon-star-on"></i> -->
      <span slot="title">Doanh thu</span>
    </el-menu-item>
    <!--  -->

    <el-submenu index="/account" id="float-right">
      <span slot="title">
        {{ userName }}
        <br />
        <small>{{ userRole }}</small>
      </span>
      <el-menu-item index="/account">Tài khoản cá nhân</el-menu-item>
      <el-menu-item index="/account">Đăng xuất</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  computed: {
    userName() {
      return "John Doe";
    },
    userRole() {
      return "Admin";
    }
  }
};
</script>

<style lang="scss">
#nav-bar {
  #float-right {
    float: right;

    .el-submenu__title {
      line-height: 20px;
      padding-top: 7px;

      span {
        display: inline-block;
        text-align: right;
      }
    }
  }

  .menu {
    .el-submenu__icon-arrow {
      display: none;
    }
  }
}
</style>
