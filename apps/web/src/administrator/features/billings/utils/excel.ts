import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

const generate_file = (items, file_name, sheet_name) => {
  const ws = XLSX.utils.json_to_sheet(items);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheet_name);
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  // eslint-disable-next-line
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, `${file_name}.xlsx`);
};

const generate_file_v2 = (header, items, file_name, sheet_name) => {
  const ws = XLSX.utils.json_to_sheet(items);
  const wb = XLSX.utils.book_new();
  XLSX.utils.sheet_add_aoa(ws, [[...header]]);

  XLSX.utils.book_append_sheet(wb, ws, sheet_name);
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  // eslint-disable-next-line
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, `${file_name}.xlsx`);
};

export { generate_file, generate_file_v2 };
