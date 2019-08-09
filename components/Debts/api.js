import axios from 'axios';

export default class Api {
  constructor(self) {
    this.self = self;
  }

  getDebts() {
    this.self.loading = true;
    const pag = this.self.pagination;
    const offset = pag.current * pag.pageSize - pag.pageSize;

    axios.get(`${this.self.host}/debts?limit=${pag.pageSize}&offset=${offset}`).then(response => {
      this.self.pagination.total = response.data.count;
      this.self.data = response.data.rows;
      this.self.loading = false;
    });
  }

  updatePerson(id_person, fio) {
    this.self.loading = true;

    axios.put(`${this.host}/person/`, { id_person, fio }).then(response => {
      this.self.loading = false;
    });
  }
}
