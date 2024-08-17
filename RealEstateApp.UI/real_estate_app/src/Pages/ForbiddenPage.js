import { Box, Button, Container, Typography } from "@mui/material";
import CustomToolBar from "../CustomComponents/CustomToolBar"
import { Link } from "react-router-dom";

const ForbiddenPage = () => {
    return (<Box>
        <CustomToolBar />
        <Container>
            <Typography variant="h1" my={5}>
                Page is Forbidden.
            </Typography>
            <Typography variant="h3" mb={3}>
                This page is only available to administrators.
            </Typography>
            <Link to="/">
                <Typography fontSize={18} sx={{ display: "inline" }}>
                    Return Home
                </Typography>
            </Link>
        </Container>
    </Box>
    )
}

export default ForbiddenPage;