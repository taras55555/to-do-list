import Button from '@mui/material/Button';

export default function CustomizedButton({ onClick, title }) {
    return (
        <Button variant="contained" color="ochre" onClick={onClick}>
            {title}
        </Button>
    )
}