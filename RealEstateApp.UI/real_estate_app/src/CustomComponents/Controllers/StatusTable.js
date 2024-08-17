import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { DeleteStatus, GetAllStatuses, UpdateStatus } from '../../API/ParameterService';

function createData(name, Id) {
    return { name, Id };
}


export default function StatusTable() {

    const [rows, setRows] = React.useState([]);

    async function fetchData() {
        try {
            const statusData = await GetAllStatuses();

            const mappedRows = statusData.map(st =>
                createData(st.name, st.id)
            );

            setRows(mappedRows);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = async (id, currentName) => {
        const newName = prompt("Enter the new name:", currentName);

        if (newName) {
            try {
                await UpdateStatus({ id, name: newName });
                fetchData();
            } catch (error) {
                console.error("Error updating status:", error);
            }
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this status?")) {
            try {
                await DeleteStatus(id);
                fetchData();
            } catch (error) {
                console.error("Error deleting status:", error);
            }
        }
    };

    return (
        <TableContainer component={Paper} sx={{ mb: 3, width: "95%" }}>
            <Table aria-label="Status table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Id</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="right">Status</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.Id}
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">
                                <Button
                                    sx={{ mr: 1 }}
                                    disableRipple
                                    variant="outlined"
                                    color="warning"
                                    onClick={() => handleEdit(row.Id, row.name, row.TlVal)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    disableRipple
                                    variant="outlined"
                                    color="error"
                                    onClick={() => handleDelete(row.Id)}
                                >Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
