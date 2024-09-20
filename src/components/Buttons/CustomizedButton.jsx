import Button from '@mui/material/Button';

export default function CustomizedButton({ onClick, title, disabled, width }) {
    return (
        <Button variant="contained" color="ochre" disabled={disabled} onClick={onClick} style={{ width: width || 'auto' }}>
            {title}
        </Button>
    )
}