<template>
  <el-form
    :model="localFormData"
    :rules="rules"
    ref="service-form"
    label-width="30%"
    label-position="left"
    class="service-form"
  >
    <el-form-item label="Tên dịch vụ" prop="name">
      <el-input v-model="localFormData.name"></el-input>
    </el-form-item>

    <el-form-item label="Đơn vị" prop="unit">
      <el-input v-model.trim="localFormData.unit"></el-input>
    </el-form-item>

    <el-form-item label="Đơn giá" prop="unitPrice">
      <el-input v-model.number="localFormData.unitPrice"></el-input>
    </el-form-item>

    <el-form-item label="Đang áp dụng" prop="isActive">
      <el-switch v-model="localFormData.isActive" />
    </el-form-item>

    <el-form-item style="text-align: right;">
      <el-button type="primary" @click="triggerSaveForm">LƯU</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
const validateUnitPrice = (rule, value, callback) => {
  if (!value || !Number.isInteger(value)) {
    return callback(new Error("Vui lòng điền giá trị thích hợp cho đơn giá."));
  } else {
    callback();
  }
};

export default {
  props: {
    formData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      localFormData: { ...this.formData },
      rules: {
        name: [{ required: true, message: "Vui lòng điền tên dịch vụ." }],
        unit: [{ required: true, message: "Vui lòng điền đơn vị." }],
        unitPrice: [
          {
            validator: validateUnitPrice
          },
          { required: true, message: "Vui lòng điền đơn giá." }
        ]
      }
    };
  },
  methods: {
    triggerSaveForm() {
      const self = this;
      this.$refs["service-form"].validate(valid => {
        if (valid) self.$emit("SaveServiceInfo", this.localFormData);
        else return false;
      });
    }
  },
  watch: {
    formData(value) {
      // reset when adding new service
      if (!value.name) this.$refs["service-form"].resetFields();
      this.localFormData = { ...value };
    }
  }
};
</script>

<style lang="scss">
.service-form {
  .el-form-item {
    &__label {
      font-weight: bold;
    }

    &__content {
      .el-switch {
        width: 100%;
        text-align: left;
      }
    }
  }
}
</style>
