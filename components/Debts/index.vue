<template>
  <Table
    :rowKey="_ => _.id_person"
    :pagination="pagination"
    :loading="loading"
    :dataSource="data"
    :columns="columns"
    :locale="locale"
    class="table"
    bordered
  >
    <template slot="fio" slot-scope="text, record">
      <EditableCell :text="text" @change="api.updatePerson(record.id_person, $event)" />
    </template>
  </Table>
</template>

<script>
import Api from './api.js';
import { columns } from './columns.js'
import { Table } from "ant-design-vue";
import EditableCell from "~/components/EditableCell";
import "./assets/style.less";

export default {
  components: {
    Table,
    EditableCell
  },
  mounted() {
    this.api.getDebts();
  },
  data() {
    return {
      data: [],
      api: new Api(this),
      host: this.$store.state.host,
      columns: columns(this),
      loading: false,
      pagination: {
        total: 0,
        current: 1,
        pageSize: 3,
        onChange: page => {
          this.paginationChangeHandler(page);
        }
      },
      locale: {
        emptyText: "Нет данных"
      }
    };
  },
  methods: {
    paginationChangeHandler(page) {
      this.pagination.current = page;
      this.api.getDebts();
    }
  }
};
</script>
