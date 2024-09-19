import {
    LogoDev as LogoDevIcon,
    AccountCircle as AccountCircleIcon,
    Home as HomeIcon,
    GitHub as GitHubIcon,
} from '@mui/icons-material';

import './Footer.css';

export default function Footer() {
    return (
        <footer className='footer-block'>
            <section>
                <LogoDevIcon sx={{ fontSize: '64px' }} />
            </section>
            <section>
                <address>
                    <section className='address-style'>
                        <div><AccountCircleIcon /></div>
                        <div>Taras Kaminskyi</div>
                    </section>
                    <section className='address-style'>
                        <div><HomeIcon /></div>
                        <div>Lviv, Ukraine</div>
                    </section>
                    <section className='address-style'>
                        <a href='https://github.com/taras55555'>
                            <span><GitHubIcon /></span>
                            <span>https://github.com/taras55555</span>
                        </a>
                    </section>
                </address>
            </section>


        </footer>
    )
}