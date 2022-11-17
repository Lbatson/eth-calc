import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Head from 'next/head';
import Calculator from '../components/Calculator';
import styles from '../styles/Home.module.css'

const darkTheme = createTheme({
  palette: {
    background: {
      default: 'rgb(31 41 55)'
    },
    mode: 'dark',
    primary: {
      main: 'rgb(165 181 251)'
    }
  },
});

export default function Main() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Head>
        <title>Eth Calc</title>
        <meta name="description" content="React calculator with Ethereum unit conversions" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond&display=swap" rel="stylesheet"></link>
      </Head>
      <Container maxWidth="xs" className={styles.main}>
        <Grid container justifyContent="center" height="100%">
          <Grid className={styles.fade} alignSelf="end">
            <img className={styles.image} height="100px" src="https://ethereum.org/static/4f10d2777b2d14759feb01c65b2765f7/69ce7/eth-glyph-colored.webp"/>
            <h1 className={styles.title}>Ethereum Calculator</h1>
          </Grid>
          <Grid>
            <Calculator />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}
