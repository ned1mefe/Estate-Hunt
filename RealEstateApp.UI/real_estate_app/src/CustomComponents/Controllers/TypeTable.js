import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { DeleteEstateType, GetAllEstateTypes, UpdateEstateType } from '../../API/ParameterService';

function createData(name, Id) {
    return { name, Id };
}
export default function TypeTable() {

    const [rows, setRows] = React.useState([]);

    async function fetchData() {
        try {
            const typesData = await GetAllEstateTypes();

            const mappedRows = typesData.map(eType =>
                createData(eType.name, eType.id)
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
                await UpdateEstateType({ id, name: newName });
                fetchData();
            } catch (error) {
                console.error("Error updating estate type:", error);
            }
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this estate type?")) {
            try {
                await DeleteEstateType(id);
                fetchData();
            } catch (error) {
                console.error("Error deleting estate type:", error);
            }
        }
    };


    return (
        <TableContainer component={Paper} sx={{ mb: 3, width: "95%" }}>
            <Table aria-label="Type table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Id</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="right">Type</TableCell>
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
