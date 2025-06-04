type ExportFormat = 'csv' | 'excel';

interface ExportOptions {
  filename: string;
  format: ExportFormat;
  columns: Array<{
    key: string;
    label: string;
  }>;
}

export async function exportData<T extends Record<string, any>>(
  data: T[],
  options: ExportOptions
): Promise<void> {
  const { filename, format, columns } = options;

  const headers = columns.map(col => col.label).join(',');
  const rows = data.map(item =>
    columns
      .map(col => {
        const value = item[col.key];
        // Escape commas and quotes in CSV
        return `"${String(value).replace(/"/g, '""')}"`;
      })
      .join(',')
  );

  const csv = `${headers}\n${rows.join('\n')}`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  
  if (format === 'excel') {
    // For Excel, we'll use the CSV format but change the extension
    downloadFile(blob, `${filename}.xlsx`);
  } else {
    downloadFile(blob, `${filename}.csv`);
  }
}

function downloadFile(blob: Blob, filename: string): void {
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}