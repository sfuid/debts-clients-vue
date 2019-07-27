<template>
  <Table
    :columns="columns"
    :rowKey="render => render.Id_person"
    :dataSource="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
    class="table"
  >
    <template slot="fio" slot-scope="data">
      <EditableCell :text="text" @change="onCellChange(data, 'fio', $event)" />
    </template>
  </Table>
</template>

<script>
import axios from "axios";
import { Table } from "ant-design-vue";
import EditableCell from "~/components/EditableCell/index.vue";
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
      data: [],
      pagination: {},
      loading: false,
      text: String,
      columns: [
        {
          title: "ФИО",
          dataIndex: "fio",
          sorter: true,
          width: "40%",
          scopedSlots: { customRender: "fio" }
        },
        {
          title: "Gender",
          dataIndex: "gender",
          width: "30%"
        },
        {
          title: "Email",
          dataIndex: "email"
        }
      ]
    };
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      });
    },
    fetch(params = {}) {
      this.loading = true;
      axios.get("https://debts-nodejs.herokuapp.com/persons").then(response => {
        const pagination = { ...this.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        // pagination.total = 200;
        this.data = response.data;
        pagination.total = response.data.length;
        this.loading = false;
      });
    }
  }
};
</script>
