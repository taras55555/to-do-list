import TaskAltIcon from '@mui/icons-material/TaskAlt';
import './Header.css';

export default function Header() {
    return (
        <header className='header-block'>
            <section className='main-logo-section'>
                <p><TaskAltIcon sx={{ fontSize: '64px' }} /></p>
                <p>LOGO</p>
            </section>
            <section><h1>To-Do List</h1></section>


        </header>
    )
}