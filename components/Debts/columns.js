export const columns = self => [
  {
    title: '#',
    customRender: (text, record, index) => {
      const pag = self.pagination;
      const start = pag.current * pag.pageSize - pag.pageSize;
      return start + index + 1;
    }
  },
  {
    title: 'ФИО',
    dataIndex: 'fio',
    sorter: (a, b) => a.fio > b.fio,
    width: '85%',
    scopedSlots: { customRender: 'fio' }
  },
  {
    title: 'Сумма',
    dataIndex: 'sum',
    width: '10%'
  }
];
