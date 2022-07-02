import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import Navbar from '../../ui/Navbar';

interface Props {
    children: ReactNode;
}

const AppLayout = ({ children }: Props) => {
    return (
        <Box>
            <Navbar />

            <Box sx={{ marginY: '2rem' }}>{children}</Box>
        </Box>
    );
};

export default AppLayout;
