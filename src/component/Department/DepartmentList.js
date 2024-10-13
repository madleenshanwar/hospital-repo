import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const columns = [
    { field: 'id', headerName:' ID',minWidth:200,align:'center',    format: (value) => value.toLocaleString('en-US')},
    { field: 'name', headerName: 'Name',minWidth:300,align:'center',    format: (value) => value.toLocaleString('en-US'),},
    { field:'heaDepartment_Name', headerName:'HeadDepartment Name',minWidth:300,align:'center', format: (value) => value.toLocaleString('en-US')},
    { field:'action', headerName:'Action',minWidth:300,align:'center', format: (value) => value.toLocaleString('en-US')}
  ];
  const rows = [
     {id:1,name:'Neurosurgery Department',heaDepartment_Name:""},
     {id:2,name:'Neurosurgery Department',heaDepartment_Name:""},
     {id:3,name:'Neurosurgery Department',heaDepartment_Name:''},
     {id:4,name:'Neurosurgery Department',heaDepartment_Name:''},
     {id:5,name:'Neurosurgery Department',heaDepartment_Name:''},
     {id:6,name:'Neurosurgery Department',heaDepartment_Name:""},
     {id:7,name:'Neurosurgery Department',heaDepartment_Name:''},
     {id:8,name:'Neurosurgery Department',heaDepartment_Name:''},
     {id:9,name:'Neurosurgery Department',heaDepartment_Name:''},
  ];
export default function DepartmentList() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const route=useNavigate();
    const handleChangePage = (_event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    const handleUpdate=(index)=>{
        route(`/updatedepartment/${index}`)
    }
  return (
    <Container>
      <Paper sx={{ width:'100%' ,boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",overflowX:'auto'}}>
      <Table  aria-label="sticky table" >
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ top: 57, minWidth: column.minWidth ,fontWeight: "bold", fontSize: "large" }}
              >
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row,index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                     <TableCell
                      align="center"
                    >
                      {row.id}
                    </TableCell>
                    <TableCell
                      align="center"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                      align="center"
                    >
                      {row.heaDepartment_Name}
                    </TableCell>
                   <TableCell align="center">
                        <Button
                          title="Delete Device"
                          // onClick={() => handleOpenDelete(index)}
                        >
                          <DeleteIcon sx={{color:'#07E4DB'}} />
                        </Button>
                        <Button
                        title="update Device"
                        onClick={() => handleUpdate(index)}
                      >
                        <EditIcon sx={{color:'#07E4DB'}}/>
                      </Button>
                    </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    <TablePagination
      rowsPerPageOptions={[5,10, 25]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </Paper>
    </Container>
  )
}
