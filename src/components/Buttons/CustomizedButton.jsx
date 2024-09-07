import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        ochre: {
            main: '#ffa500',
            light: '#E9DB5D',
            dark: '#A29415',
            contrastText: '#fff',
        }
    }
})

export default function CustomizedButton({ onClick, title }) {
    return (
        <ThemeProvider theme={theme}>
            <Button variant="contained" color="ochre" onClick={onClick}>{title}</Button>
        </ThemeProvider>
    )
}