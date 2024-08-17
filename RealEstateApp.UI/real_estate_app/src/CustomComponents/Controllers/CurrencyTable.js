import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { DeleteCurrency, GetAllCurrencies, UpdateCurrency } from '../../API/ParameterService';

function createData(name, Id, TlVal) {
    return { name, Id, TlVal };
}

export default function CurrencyTable() {

    const [rows, setRows] = useState([]);

    async function fetchData() {
        try {
            const currenciesData = await GetAllCurrencies();

            const mappedRows = currenciesData.map(currency =>
                createData(currency.name, currency.id, currency.valueAsTl)
            );

            setRows(mappedRows);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = async (id, currentName, currentValue) => {
        const newName = prompt("Enter the new name:", currentName);
        const newValue = prompt("Enter the new exchange rate value:", currentValue);

        if (newName && newValue) {
            try {
                await UpdateCurrency({ id, name: newName, valueAsTl: newValue });
                fetchData();  // Fetch data again after editing
            } catch (error) {
                console.error("Error updating currency:", error);
            }
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this currency?")) {
            try {
                await DeleteCurrency(id);
                fetchData();
            } catch (error) {
                console.error("Error deleting currency:", error);
            }
        }
    };

    return (
        <TableContainer component={Paper} sx={{ mb: 3, width: "95%" }}>
            <Table aria-label="Currency table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Id</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="right">Currency</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="right">Exchange Rate as TL</TableCell>
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
                            <TableCell align="right">{row.TlVal}</TableCell>
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
