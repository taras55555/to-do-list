import Button from '@mui/material/Button';

export default function CustomizedButton({ onClick, title, disabled }) {
    return (
        <Button variant="contained" color="ochre" disabled={disabled} onClick={onClick}>
            {title}
        </Button>
    )
}