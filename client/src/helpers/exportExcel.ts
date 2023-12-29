import * as XLSX from 'xlsx';

export const exportExcel = ({
  data,
  fileName,
  sheetName,
}: {
  data: any;
  fileName: string;
  sheetName?: string;
}) => {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Convert the data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
  // Convert the data to a worksheet
//   const worksheet = XLSX.utils.json_to_sheet(data, {
//     header: Object.keys(data[0]), // Specify header columns
//     skipHeader: true, // Skip default header row
//   });

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    sheetName || 'Sheet1',
    true
  );

  // Save the workbook to a file
  XLSX.writeFile(workbook, `${fileName || 'exported_data'}.xlsx`);
};
