<template>
  <el-form
    ref="form"
    :model="formData"
    :rules="rules"
    label-width="30%"
    label-position="left"
    class="add-guest-info-form"
  >
    <el-form-item>
      <el-radio-group v-model="adult">
        <el-radio :label="true">Người lớn</el-radio>
        <el-radio :label="false">Trẻ em (dưới 14 tuổi)</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="Họ tên khách" prop="fullName">
      <el-input v-model="formData.fullName"></el-input>
    </el-form-item>

    <el-form-item label="Số phòng" prop="roomNo">
      <el-select v-model="formData.roomNo" placeholder="Chọn số phòng">
        <el-option
          v-for="item in roomOptions"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="CMND/Hộ chiếu">
      <el-input v-model="formData.idNo" :disabled="!formData.adult"></el-input>
    </el-form-item>

    <el-form-item label="Ngày cấp">
      <el-date-picker
        v-model="formData.dateIssued"
        type="date"
        placeholder="dd/mm/yyyy"
        format="dd/MM/yyyy"
        :picker-options="datePickerOptions"
        :disabled="!formData.adult"
      ></el-date-picker>
    </el-form-item>

    <el-form-item label="Nơi cấp">
      <el-input
        v-model="formData.placeIssued"
        :disabled="!formData.adult"
      ></el-input>
    </el-form-item>

    <el-form-item style="text-align: right;">
      <el-button type="primary" @click="triggerSaveForm">LƯU</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => ({
        adult: true,
        fullName: "",
        roomNo: "",
        idNo: "",
        dateIssued: "",
        placeIssued: ""
      })
    },
    roomOptions: {
      type: Array,
      default: () => ["101", "102"]
    }
  },
  data() {
    return {
      datePickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      rules: {
        fullName: [
          { required: true, message: "Vui lòng điền họ tên của khách." }
        ],
        roomNo: [{ required: true, message: "Vui lòng chọn số phòng." }]
      }
    };
  },
  computed: {
    formData() {
      return Object.assign({}, this.form);
    },
    adult: {
      get() {
        return this.formData.adult;
      },
      set(value) {
        if (!value) {
          this.formData.idNo = "";
          this.formData.dateIssued = "";
          this.formData.placeIssued = "";
        }
        this.formData.adult = value;
      }
    }
  },
  methods: {
    triggerSaveForm() {
      this.$refs.form.validate(valid => {
        if (valid) this.$emit("SaveGuestInfo", this.formData);
        else return false;
      });
    }
  }
};
</script>

<style lang="scss">
.add-guest-info-form {
  .el-form-item {
    &__label {
      font-weight: bold;
    }

    &__content {
      .el-select,
      .el-date-editor,
      .el-radio-group {
        width: 100%;
        text-align: left;
      }
    }
  }
}
</style>
