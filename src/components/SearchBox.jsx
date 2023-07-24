import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width:70 },
  { field: 'question_title', headerName: 'Question title', width: 400 },
  { field: 'question_level', headerName: 'Question level', width: 200 },
  { field: 'Technology', headerName: 'Technology', width: 170 },
  {
    field: 'question_type',
    headerName: 'Question type',
    width: 170,
  },
];



export default function SearchBox({row,searchboxdata,selectedRow}) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={row}
        columns={columns}
        initialState={{
          pagination:{
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onCellClick={(item)=>searchboxdata(item)}
        onRowSelectionModelChange={(arr)=>selectedRow(arr)}
      />
    </div>
  );
}


