import React, { useEffect, useState } from 'react'
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const columns = [
  {
    field: "id",
    headerName: " ID",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    field: "shift_type",
    headerName: "shift_type",
    minWidth: 50,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
      field: "date",
      headerName: "Date",
      minWidth: 50,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      field: "start_time",
      headerName: "Start_Time",
      minWidth: 50,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      field: "end_time",
      headerName: "End_Time",
      minWidth: 50,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      field: "doctors",
      headerName: "Doctors",
      minWidth: 50,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 200,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
]
const rows = [
    {id:1,shift_type:'evening',date:'11/11/2020',start_time:'12',end_time:'15',doctors:['sara','khaled','rose']},
    {id:2,shift_type:'evening',date:'12/11/2020',start_time:'12',end_time:'15',doctors:['sara','khaled','rose']},
    {id:3,shift_type:'evening',date:'13/11/2020',start_time:'12',end_time:'15',doctors:['sara','khaled','rose']},
    {id:4,shift_type:'evening',date:'14/11/2020',start_time:'12',end_time:'15',doctors:['sara','khaled','rose']},
    {id:5,shift_type:'evening',date:'11/12/2020',start_time:'12',end_time:'15',doctors:['sara','khaled','rose']},
    {id:6,shift_type:'evening',date:'12/12/2020',start_time:'12',end_time:'15',doctors:['sara','khaled','rose']},
    {id:7,shift_type:'evening',date:'13/12/2020',start_time:'12',end_time:'15',doctors:['sara','khaled','rose']},
    {id:8,shift_type:'evening',date:'14/12/2020',start_time:'12',end_time:'15',doctors:['sara','khaled','rose']}
]
export default function SchedulesList() {
    const[month,setMonth]=useState('');
    const [schedule, setSchedule] = useState([{}]);
    useEffect(()=>{
      setMonth(localStorage.getItem('month'))
        console.log(rows.filter(el=>el.date.split("/")[1]===month))
    setSchedule(rows.filter(el=>el.date.split("/")[1]===month))
    },[month])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const route = useNavigate();
    const handleChangePage = (_event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    //handle with delete
    //delete
    const [indexDelete, setIndexDelete] = useState(0);
    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = (index) => {
      setOpenDelete(true);
      setIndexDelete(index);
      console.log(index);
    };
    const handleCloseDelete = () => setOpenDelete(false);
    function handleDelete(row) {
      handleCloseDelete();
    }
    //handle with update
    const handleUpdate = (index) => {
      route(`/updateshift/${index}`);
    };
  return (
    <>
    <Box>
        <TextField
          id="outlined-select-currency"
          select
          label="please select your month"
          onChange={(e)=>{setMonth(e.target.value)
            localStorage.setItem('month',e.target.value)

          }}
          value={month}
          name="month"
          sx={{ width: "250px" }}
        >
          <MenuItem value="1">Junuary</MenuItem>
          <MenuItem value="2">February</MenuItem>
          <MenuItem value="3">March</MenuItem>
          <MenuItem value="4">April</MenuItem>
          <MenuItem value="5">May</MenuItem>
          <MenuItem value="6">June</MenuItem>
          <MenuItem value="7">July</MenuItem>
          <MenuItem value="8">August</MenuItem>
          <MenuItem value="9">September</MenuItem>
          <MenuItem value="10">October</MenuItem>
          <MenuItem value="11">November</MenuItem>
          <MenuItem value="12">December</MenuItem>
        </TextField>
    </Box>
    {schedule.length>0? <Container>
    <Paper
      sx={{
        width: "100%",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
        overflowX: "auto",
      }}
    >
      <Table aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{
                  top: 57,
                  minWidth: column.minWidth,
                  fontWeight: "bold",
                  fontSize: "large",
                }}
              >
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {schedule.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.shift_type}</TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">{row.start_time}</TableCell>
                  <TableCell align="center">{row.end_time}</TableCell>
                  <TableCell align="center">{row.doctors}</TableCell>
                  <TableCell align="center">
                    <Button
                      title="Delete Patient"
                      onClick={() => handleOpenDelete(row.id)}
                    >
                      <DeleteIcon sx={{ color: "#07E4DB" }} />
                    </Button>
                    <Modal
                      open={openDelete}
                      onClose={handleCloseDelete}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box
                        sx={{
                          margin: "100px auto",
                          p: 3,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 3,
                          boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
                          borderRadius: 8,
                          backgroundColor: "rgba(255,255,255,0.9)",
                          border: "1px solid #00ACB1",
                          height: "200px",
                          maxWidth: "550px",
                        }}
                      >
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Are You Sure You Won't To Delete This rows??
                        </Typography>
                        <Typography
                          id="modal-modal-description"
                          sx={{ mt: 2 }}
                        >
                          <Button
                            type="submit"
                            variant="contained"
                            sx={{ background: "#00ACB1" }}
                            onClick={() => handleDelete(row)}
                          >
                            Yes
                          </Button>
                          <Button
                            type="submit"
                            variant="outlined"
                            sx={{ color: "#00ACB1", ml: 1 }}
                            onClick={handleCloseDelete}
                          >
                            No
                          </Button>
                        </Typography>
                      </Box>
                    </Modal>
                    <Button
                      title="update Patient"
                      onClick={() => handleUpdate(row.id)}
                    >
                      <EditIcon sx={{ color: "#07E4DB" }} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  </Container>:""}
    </>
  )
}
