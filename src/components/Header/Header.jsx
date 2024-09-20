import './Header.css';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

export default function Header() {
    return (
        <header className='header-block'>
            <section className='main-logo-section'>
                <a href='/'>
                    <span aria-label="Website Logo"><TaskAltIcon sx={{ fontSize: '64px' }} /></span>
                    <span>LOGO</span>
                </a>
            </section>
            <section><h1>To-Do List</h1></section>
        </header>
    )
}