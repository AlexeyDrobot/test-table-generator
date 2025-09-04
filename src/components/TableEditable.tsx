import { memo, useCallback } from 'react';
import { FaCopy } from 'react-icons/fa6';

import { useAppDispatch } from '../config/store';
import { duplicateTable, updateCell } from '../modules/tables/tables.reducer';
import type { Table } from '../modules/tables/tables.types';

type Props = {
  table: Table;
};

const TableEditable = memo(({ table }: Props) => {
  const dispatch = useAppDispatch();

  const handleCellChange = useCallback(
    (rowId: string, field: string, value: string) => {
      dispatch(updateCell({ tableId: table.id, rowId, field, value }));
    },
    [dispatch, table.id]
  );

  const handleDuplicateTable = useCallback(() => {
    dispatch(duplicateTable(table.id));
  }, [dispatch, table.id]);

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-blue-800">
          {table.header.map((header, index) => (
            <th
              key={header.id}
              className="border border-blue-800 p-2 font-normal text-left text-xs text-gray-200"
            >
              <div className="flex items-center justify-between">
                <span>{header.label}</span>
                {index === table.header.length - 1 && (
                  <button
                    onClick={handleDuplicateTable}
                    className="flex items-center gap-1 bg-blue-800 text-white px-2 py-1 text-xs cursor-pointer"
                  >
                    Copy <FaCopy />
                  </button>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.data.map(row => (
          <tr key={row.id}>
            {table.header.map(header => (
              <td key={header.id} className="border border-gray-300">
                <input
                  type="text"
                  value={row[header.id] || ''}
                  onChange={e =>
                    handleCellChange(row.id, header.id, e.target.value)
                  }
                  className="w-full p-2 border-none outline-none focus:bg-blue-100 focus:shadow-[inset_0_0_0_1px_#60a5fa]"
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
});

TableEditable.displayName = 'TableEditable';

export default TableEditable;
