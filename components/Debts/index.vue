<template>
  <div class="wrapper">
    <div class="input">
      <InputNumber
        class="Number"
        id="inputNumber"
        placeholder="Введите сумму"
        v-model="sum"
        :min="100"
        :max="1000"
      />
      <Button v-on:click="api.getDebts()">Минимальная сумма</Button>
    </div>

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
  </div>
</template>

<script>
import Api from "./api.js";
import { columns } from "./columns.js";
import { Table, InputNumber, Button, Icon } from "ant-design-vue";
import EditableCell from "~/components/EditableCell";
import "./assets/style.less";

export default {
  components: {
    Table,
    InputNumber,
    EditableCell,
    Button,
    Icon
  },
  mounted() {
    this.api.getDebts();
  },
  data() {
    return {
      data: [],
      api: new Api(this),
      host: this.$store.state.host,
      sum: 100,
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
