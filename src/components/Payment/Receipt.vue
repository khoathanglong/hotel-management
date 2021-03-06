<template>
  <el-card shadow="never" class="receipt">
    <div slot="header" style="text-align: left;">
      <span style="font-weight: bold;">{{ title }}</span>
      <el-button
        style="float: right; padding: 3px 0"
        type="text"
        icon="el-icon-printer"
        @click="onPrint"
        >In hóa đơn</el-button
      >
    </div>
    <div>
      <el-row>
        <!-- GENERAL RECEIPT INFO -->
        <el-col :xs="24" :sm="12">
          <p>
            No.:
            <span class="bold-text">{{ receiptNo }}</span>
          </p>
          <p>
            Ngày lập:
            <span class="bold-text">
              {{ dateIssued && localCheckinDateTime(dateIssued) }}
            </span>
          </p>
          <p>
            Người lập:
            <span class="bold-text">{{ issuer }}</span>
          </p>
        </el-col>
        <el-col :xs="24" :sm="12">
          <p>
            Khách hàng:
            <span class="bold-text">{{ customer }}</span>
          </p>
          <p>
            Ngày checkin:
            <span class="bold-text">{{
              checkinDateTime && localCheckinDateTime(checkinDateTime)
            }}</span>
          </p>
          <p>
            Nhân viên checkin:
            <span class="bold-text">{{ checkinBy }}</span>
          </p>
        </el-col>
        <!--  -->
      </el-row>
      <!-- RECEIPT TABLE -->
      <el-table
        :data="tableData.items"
        show-summary
        :summary-method="getSummary"
        :header-cell-style="{ backgroundColor: '#66b1ff', color: 'white' }"
        border
        style="margin-top: 20px; width: 100%;"
      >
        <el-table-column prop="content" label="Nội dung"></el-table-column>
        <el-table-column prop="quantity" label="Số lượng" align="right">
          <template slot-scope="scope">
            <span>{{ `${scope.row.quantity} ${scope.row.unit || ""}` }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="unitPrice" label="Đơn giá" align="right">
          <template slot-scope="scope">
            <span>{{
              scope.row.unitPrice && scope.row.unitPrice.toLocaleString()
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="subtotal" label="Thành tiền" align="right">
          <template slot-scope="scope">
            <span>{{
              scope.row.subtotal && scope.row.subtotal.toLocaleString()
            }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!--  -->
    </div>
  </el-card>
</template>

<script>
import moment from "moment";

export default {
  props: {
    title: {
      type: String,
      default: "Chi tiết hóa đơn"
    },
    receiptNo: {
      type: Number,
      default: 123
    },
    dateIssued: {
      type: Number,
      default: () => Date.now()
    },
    issuer: {
      type: String,
      default: "Long Khoa"
    },
    checkinBy: {
      type: String,
      default: "admin"
    },
    customer: {
      type: String,
      default: "John Henry"
    },
    checkinDateTime: {
      type: Number,
      default: () => Date.now() - 24 * 3600 * 1000 // 1 day before current date
    },
    redInvoice: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Object,
      default: () => ({
        items: [
          {
            content: "Phòng 101",
            quantity: 1,
            unit: "Ngày",
            unitPrice: 300000,
            subtotal: 300000
          }
        ],
        sum: {
          type: Number,
          default: 0
        }
      })
    }
  },
  computed: {
    localRedInvoice: {
      get() {
        return this.redInvoice;
      },
      set() {
        this.$emit("ToggleRedInvoice");
      }
    },
    localCheckinDateTime() {
      return dateTime => moment(dateTime).format("DD-MM-YYYY h:mm:ss");
    }
  },
  methods: {
    onPrint() {
      window.print();
    },
    getSummary() {
      let summaries = [];
      summaries[0] = "Tổng hóa đơn";
      summaries[1] = null;
      summaries[2] = null;
      summaries[3] = this.tableData.sum;
      return summaries;
    }
  }
};
</script>

<style lang="scss">
.receipt {
  p {
    text-align: left;
    font-size: 10px;

    .bold-text {
      font-weight: 600;
      font-size: 12px;
    }
  }

  .el-table__footer {
    font-weight: bold;
  }
}
</style>
