import {
    Box,
    Button,
    Container,
    Grid,
    Paper,
    Toolbar,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import CategoryCard from '../components/ui/CategoryCard';
import ProductCard from '../components/ui/ProductCard';

interface Props {
    products: any[];
}

const Home = (props: Props) => {
    const router = useRouter();

    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h3" sx={{ marginBottom: '1.5rem' }}>
                    Categories
                </Typography>
                <Button variant="outlined">See More</Button>
            </Box>

            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <CategoryCard
                            title="Sport and Training"
                            onClick={() =>
                                router.push('/category/sport training')
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <CategoryCard
                            title="Computer and Electronics"
                            onClick={() =>
                                router.push(
                                    '/category/computer and electronics'
                                )
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <CategoryCard
                            title="Gaming"
                            onClick={() => router.push('/category/gaming')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <CategoryCard
                            title="Books and course"
                            onClick={() =>
                                router.push('/category/books and courses')
                            }
                        />
                    </Grid>
                </Grid>
            </Box>

            <br />
            <br />
            <br />

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h3" sx={{ marginBottom: '1.5rem' }}>
                    Newest
                </Typography>
                {/* <Button variant="outlined">See More</Button> */}
            </Box>

            <Box>
                <Grid container spacing={2}>
                    {props.products.map((el, idx) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                            <ProductCard data={el} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Home;

export async function getStaticProps() {
    const res = await fetch('http://localhost:1337/api/adverts?populate=*', {
        method: 'GET',
    });

    if (!res.ok) {
        return {
            props: {},
        };
    }

    const productData = await res.json();

    return {
        props: {
            products: productData.data,
        },
    };
}
