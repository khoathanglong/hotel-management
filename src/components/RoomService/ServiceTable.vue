<template>
  <el-table :data="services">
    <el-table-column label="#" align="center">
      <template slot-scope="scope">
        {{ scope.$index + 1 }}
      </template>
    </el-table-column>
    <el-table-column prop="name" label="Tên dịch vụ" />
    <el-table-column prop="unit" label="Đơn vị" align="right" />
    <el-table-column prop="unitPrice" label="Đơn giá" align="right" />
    <el-table-column label="Đang áp dụng" align="center">
      <template slot-scope="scope">
        <el-switch :value="services[scope.$index].isActive" disabled>
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="Sửa/Xóa"
      align="center"
      class-name="icons"
      v-if="userIsAdmin"
    >
      <template slot-scope="scope">
        <i class="el-icon-edit" @click="$emit('EditService', scope.$index)"></i>
        <i
          class="el-icon-delete"
          @click="$emit('DeleteService', scope.$index)"
        ></i>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    services: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    userIsAdmin() {
      return this.$store.state.user.role === "admin";
    }
  }
};
</script>

<style></style>
