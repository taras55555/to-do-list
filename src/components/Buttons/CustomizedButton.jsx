import Button from '@mui/material/Button';

export default function CustomizedButton({onClick, title}) {
    return  (
        <Button variant="contained" onClick={onClick}>{title}</Button>
    )
}