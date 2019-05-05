<template>
  <el-card v-loading="loading" class="boxCard">
    <div slot="header">
      <h2 style="font-weight: bold; margin: 0">Đăng nhập</h2>
      <span>Tới hệ thống quản lý</span>
    </div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      @submit.native.prevent="login"
    >
      <el-form-item label="Email" prop="email">
        <el-input type="email" v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="Mật khẩu" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item style="text-align: right;">
        <router-link to="/sign-up" style="color: blue"
          >Đăng ký tài khoản mới</router-link
        >
      </el-form-item>
      <el-form-item style="text-align: left;">
        <el-button type="primary" @click="login">Đăng nhập</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { auth, users } from "@/firebase";

export default {
  data() {
    return {
      loading: false,
      form: {
        email: "",
        password: ""
        // rePassword: ""
      },
      rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "Vui lòng nhập địa chỉ email hợp lệ",
            trigger: "change"
          }
        ],
        password: [
          {
            required: true,
            message: "Vui lòng nhập mật khẩu",
            trigger: "change"
          },
          {
            min: 6,
            password: "Mật khẩu cần ít nhất 6 kí tự",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          const { email, password } = this.form;
          //sigin in firebase
          auth()
            .setPersistence(auth.Auth.Persistence.LOCAL)
            .then(result => {
              console.log(result);
              return auth().signInWithEmailAndPassword(email, password);
            })
            .then(result => {
              console.log(result);
              const { uid } = result.user;
              users
                .doc(uid)
                .get()
                .then(doc => {
                  // set user info for later use
                  this.$store.commit("setUserInfo", doc.data());
                  this.$router.replace("/");
                });
            })
            .catch(err => {
              console.log(err);
              this.$message({
                type: "error",
                message: "Thông tin đăng nhập không chính xác" || err.message
              });
              this.$router.replace("/sign-in");
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.boxCard {
  width: 50%;
  margin: 10vh auto;
}
@media (max-width: 768px) {
  .boxCard {
    width: 96%;
    margin: 0 auto;
  }
}
</style>
