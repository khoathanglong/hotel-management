<template>
  <el-menu default-active="1" id="nav-bar" mode="horizontal">
    <!-- display submenu in xs screen -->
    <el-submenu index="1" class="hidden-sm-and-up menu">
      <span slot="title">
        <i class="el-icon-menu"></i>
        Menu
      </span>
      <el-menu-item index="1" @click="goTo('/')">
        <span slot="title">Danh sách phòng</span>
      </el-menu-item>
      <el-menu-item index="2" @click="goTo('/room-service')">
        <span slot="title">Dịch vụ phòng</span>
      </el-menu-item>
      <el-menu-item index="3" @click="goTo('/revenue')">
        <span slot="title">Doanh thu</span>
      </el-menu-item>
    </el-submenu>
    <!--  -->

    <!-- display full menu in small screen and up -->
    <el-menu-item index="1" class="hidden-xs-only" @click="goTo('/')">
      <span slot="title">Danh sách phòng</span>
    </el-menu-item>
    <el-menu-item
      index="2"
      class="hidden-xs-only"
      @click="goTo('/room-service')"
    >
      <span slot="title">Dịch vụ phòng</span>
    </el-menu-item>
    <el-menu-item index="3" class="hidden-xs-only" @click="goTo('/revenue')">
      <!-- <i class="el-icon-star-on"></i> -->
      <span slot="title">Doanh thu</span>
    </el-menu-item>
    <!--  -->

    <el-submenu index="4" id="float-right">
      <span slot="title">
        {{ userName }}
        <br />
        <small>{{ userRole }}</small>
      </span>
      <el-menu-item index="5" @click="goTo('/account')"
        >Tài khoản cá nhân</el-menu-item
      >
      <el-menu-item index="6" @click="logout">Đăng xuất</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { auth } from "@/firebase";
export default {
  computed: {
    userName() {
      return this.$store.state.user.email;
    },
    userRole() {
      return this.$store.state.user.role;
    }
  },
  methods: {
    logout() {
      auth()
        .signOut()
        .then(() => {
          this.$store.commit("setUserInfo", { email: "", role: "" });
          this.$router.replace("/sign-in");
        })
        .catch(error => {
          console.log(error);
        });
    },
    goTo(route) {
      this.$router.push(route);
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
