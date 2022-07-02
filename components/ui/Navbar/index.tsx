import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AuthContext from '../../../context/authContext/authContext';
import { Avatar, TextField } from '@mui/material';
import SearchInput from '../SearchInput';

export default function Navbar() {
    const router = useRouter();
    const authCtx = useContext(AuthContext);

    const [search, setSearch] = useState('');

    const handleSearchInputChange = (e: any) => {
        setSearch(e.target.value);
        router.push(`/search?term=${e.target.value}`);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => router.push('/')}
                    >
                        REII414 E-STORE
                    </Typography>

                    <SearchInput
                        value={search}
                        onChange={handleSearchInputChange}
                    />

                    {authCtx.isLoggedIn ? (
                        <>
                            <Button
                                color="inherit"
                                onClick={() => router.push('/advert/new')}
                            >
                                Create Advert
                            </Button>

                            <Button
                                color="inherit"
                                onClick={() => authCtx.logout()}
                            >
                                Logout
                            </Button>

                            <Button
                                color="inherit"
                                onClick={() => router.push('/profile')}
                            >
                                <Avatar>{authCtx.user?.username[0]}</Avatar>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                color="inherit"
                                onClick={() => router.push('/auth/login')}
                            >
                                Login
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => router.push('/auth/register')}
                            >
                                Register
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
