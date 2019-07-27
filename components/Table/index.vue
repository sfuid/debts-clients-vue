<template>
  <Table
    :dataSource="dataSource"
    :columns="columns"
    :rowKey="_ => _.Id_person"
    :pagination="pagination"
    :loading="loading"
    class="table"
    bordered
  >
    <template slot="FIO" slot-scope="text, record">
      <EditableCell :text="text" @change="onCellChange(record.key, 'FIO', $event)" />
    </template>
  </Table>
</template>

<script>
import axios from "axios";
import { Table } from "ant-design-vue";
import EditableCell from "~/components/EditableCell";
import "./assets/style.less";

export default {
  components: {
    Table,
    EditableCell
  },
  mounted() {
    this.fetch();
  },
  data() {
    return {
      dataSource: [],
      pagination: {},
      loading: true,
      columns: [
        {
          title: "ФИО",
          dataIndex: "FIO",
          width: "40%",
          sorter: true,
          scopedSlots: { customRender: "FIO" }
        },
        {
          title: "age",
          dataIndex: "age"
        },
        {
          title: "address",
          dataIndex: "address"
        }
      ]
    };
  },
  methods: {
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.dataSource = dataSource;
      }
    },
    fetch(params = {}) {
      axios.get("https://debts-nodejs.herokuapp.com/persons").then(response => {
        const pagination = { ...this.pagination };
        this.dataSource = response.data;
        pagination.total = response.data.length;
        this.loading = false;
      });
    }
  }
};
</script>
