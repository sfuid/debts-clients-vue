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
      <EditableCell :text="text" @change="updatePerson(record.id_person, $event)" />
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
    this.getDebts();
  },
  data() {
    return {
      data: [],
      loading: false,
      pagination: {
        total: 0,
        current: 1,
        pageSize: 3,
        onChange: page => {
          this.paginationChangeHandler(page);
        }
      },
      columns: [
        {
          title: "#",
          customRender: (text, record, index) => {
            const pag = this.pagination;
            const start = pag.current * pag.pageSize - pag.pageSize;
            return start + index + 1;
          }
        },
        {
          title: "ФИО",
          dataIndex: "fio",
          sorter: (a, b) => a.fio > b.fio,
          width: "85%",
          scopedSlots: { customRender: "fio" }
        },
        {
          title: "Сумма",
          dataIndex: "sum",
          width: "10%"
        }
      ],
      locale: {
        emptyText: "Нет данных"
      },
      host: this.$store.state.host
    };
  },
  methods: {
    paginationChangeHandler(page) {
      this.pagination.current = page;
      this.getDebts();
    },
    getDebts() {
      this.loading = true;
      const pag = this.pagination;
      const offset = pag.current * pag.pageSize - pag.pageSize;

      axios
        .get(`${this.host}/debts?limit=${pag.pageSize}&offset=${offset}`)
        .then(response => {
          this.pagination.total = response.data.count;
          this.data = response.data.rows;
          this.loading = false;
        });
    },
    updatePerson(id_person, fio) {
      this.loading = true;

      axios
        .put(`${this.host}/person/`, {
          id_person,
          fio
        })
        .then(response => {
          this.loading = false;
        });
    }
  }
};
</script>
