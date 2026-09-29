import moment from 'moment';

const get_month = (area) => {
  const ranges = [];
  const original_start = moment(area.created).startOf('day').startOf('month');
  const original_end = moment().endOf('day');

  while (original_start < original_end) {
    const start = original_start.clone().toDate();
    const end = original_start.clone().endOf('month').toDate();
    ranges.push({ start, end, text: original_start.format('MMMM YY') });
    original_start.add(1, 'month');
  }
  return ranges.map((item, index) => ({ value: item, key: index, text: item.text }));
};

export { get_month };
