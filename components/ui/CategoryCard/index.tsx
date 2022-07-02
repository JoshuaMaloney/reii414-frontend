import { Paper, Typography } from '@mui/material';
import React from 'react';

interface Props {
    title: string;
    onClick: () => void;
}

const CategoryCard = (props: Props) => {
    return (
        <Paper
            sx={{
                paddingX: '1rem',
                borderRadius: 1,
                height: '120px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
            }}
            onClick={props.onClick}
        >
            <Typography variant="h6">{props.title}</Typography>
        </Paper>
    );
};

export default CategoryCard;
