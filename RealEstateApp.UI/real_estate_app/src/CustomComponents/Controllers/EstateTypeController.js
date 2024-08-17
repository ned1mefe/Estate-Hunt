import { Paper, Table, Typography } from "@mui/material";
import TypeTable from "./TypeTable";

export default function EstateTypeController() {
    return (
        <Paper
            elevation={5}
            sx={{
                minHeight: 350,
                width: '90%',
                display: 'flex',
                pt: 2,
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: "primary.main",
                borderRadius: 7,
                mb: 2,
            }}>
            <Typography variant="h3" sx={{ mb: 0.5 }}>
                Estate Type
            </Typography>
            <TypeTable />
        </Paper>
    )
}