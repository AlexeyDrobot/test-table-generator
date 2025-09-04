import { useMemo } from 'react';

import { useAppSelector } from '../config/store';
import { makeTableChunks } from '../modules/tables/tables.utils';
import TableEditable from './TableEditable';

function TablesList() {
  const tables = useAppSelector(state => state.tables.data);

  const tablesChunks = useMemo(() => makeTableChunks(tables, 3), [tables]);

  return (
    <div className="space-y-6">
      {tablesChunks.map((tablesChunk, chunkIndex) => (
        <div key={chunkIndex} className="flex gap-4">
          {tablesChunk.map(table => (
            <div key={table.id} className="flex-1">
              <TableEditable table={table} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TablesList;
