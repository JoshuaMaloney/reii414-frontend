import {
    Avatar,
    Button,
    Grid,
    IconButton,
    Paper,
    Typography,
} from '@mui/material';
import React, { useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AuthContext from '../../../context/authContext/authContext';

interface Props {
    data: any;
    handleDelete: () => void;
}

const CommentCard = (props: Props) => {
    const authCtx = useContext(AuthContext);

    return (
        <Paper
            elevation={0}
            sx={{
                padding: '1rem',
                marginBottom: '1rem',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Grid sx={{ flex: 1 }} container>
                <Grid item xs={1}>
                    <Avatar>
                        {props.data.attributes.creator.data.attributes.username[0].toUpperCase()}
                    </Avatar>
                </Grid>
                <Grid item xs={11}>
                    <Typography variant="body2">
                        {props.data.attributes.creator.data.attributes.username}
                    </Typography>
                    <Typography variant="body1">
                        {props.data.attributes.body}
                    </Typography>
                </Grid>
            </Grid>
            {props.data.attributes.creator.data.id === authCtx.user?.id && (
                <IconButton aria-label="delete" onClick={props.handleDelete}>
                    <DeleteIcon />
                </IconButton>
            )}
        </Paper>
    );
};

export default CommentCard;
