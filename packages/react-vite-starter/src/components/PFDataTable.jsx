export function PFDataTable({ columns, rows, caption, emptyMessage = 'No records available.' }) {
  const columnCount = columns.length || 1;

  return (
    <div className="pf-data-table">
      <table className="pf-data-table__table">
        {caption ? <caption>{caption}</caption> : null}
        <thead className="pf-data-table__columns">
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="pf-data-table__rows">
          {rows.length > 0 ? (
            rows.map((row, index) => (
              <tr key={row.id ?? index}>
                {columns.map((column) => (
                  <td key={column.key}>{row[column.key]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columnCount}>{emptyMessage}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
