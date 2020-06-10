import axios from 'axios';

/**
 * @class
 * @constructor
 * @param ctx - context
 */
export default class Api {
  constructor(ctx) {
    this.ctx = ctx;
  }

  getDebts() {
    const ctx = this.ctx;
    const pag = ctx.pagination;
    const offset = pag.current * pag.pageSize - pag.pageSize;
    ctx.loading = true;

    axios
      .get(`${this.ctx.host}/debts?sum=${ctx.sum}&limit=${pag.pageSize}&offset=${offset}`)
      .then(response => {
        ctx.pagination.total = response.data.count;
        ctx.data = response.data.rows;
        ctx.loading = false;
      });
  }

  updatePerson(id_person, fio) {
    const ctx = this.ctx;
    ctx.loading = true;

    axios
      .put(`${ctx.host}/person/`, { id_person, fio })
      .then(response => {
        ctx.loading = false;
      });
  }
}
