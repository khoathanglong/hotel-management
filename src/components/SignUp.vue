<template>
  <el-card v-loading="loading">
    <div slot="header">
      <h2 style="font-weight: bold; margin: 0">Đăng ký tài khoản</h2>
      <span>Nhân viên mới</span>
    </div>
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="Email" prop="email">
        <el-input type="email" v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="Mật khẩu" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="Nhập lại mật khẩu" prop="rePassword">
        <el-input type="password" v-model="form.rePassword" required></el-input>
      </el-form-item>
      <el-form-item style="text-align: left;">
        <el-button type="primary" @click="signup">Thêm tài khoản</el-button>
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
        password: "",
        rePassword: ""
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
        ],
        rePassword: [
          {
            required: true,
            message: "Vui lòng nhập lại mật khẩu",
            trigger: "change"
          },
          {
            validator: (rule, value, done) => {
              if (value !== this.form.password)
                done(new Error("Mật khẩu xác nhận không khớp"));
              else done();
            },
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    signup() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          const { email, password } = this.form;
          //sigin in A NEW USER in firebase
          auth()
            .createUserWithEmailAndPassword(email, password)
            .then(result => {
              const { uid, email } = result.user;
              console.log(uid, email);
              users.doc(uid).set({
                role: "employee",
                email
              });
              this.$message({
                type: "success",
                message: "Tài khoản tạo thành công"
              });
              this.$router.push("/");
            })
            .catch(err => {
              console.log(err);
              if (err.code.includes("email-already-in-use")) {
                this.$message({
                  type: "error",
                  message:
                    "Người dùng này đã tồn tại trong hệ thống" || err.message
                });
              }
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
