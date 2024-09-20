import {
    LogoDev as LogoDevIcon,
    LinkedIn as LinkedInIcon,
    Home as HomeIcon,
    GitHub as GitHubIcon,
    OpenInNew as OpenInNewIcon,
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
                        <a href='https://www.linkedin.com/in/taras-kaminskyi-4a1994229' target='_blank'>
                            <span className='address-line'><LinkedInIcon /></span>
                            <span className='address-line'>Taras Kaminskyi <OpenInNewIcon /></span>
                        </a>
                    </section>
                    <section className='address-style'>
                        <div className='address-line'><HomeIcon /></div>
                        <div className='address-line'>Lviv, Ukraine</div>
                    </section>
                    <section className='address-style'>
                        <a href='https://github.com/taras55555' target='_blank'>
                            <span className='address-line'><GitHubIcon /></span>
                            <span className='address-line'>GitHub <OpenInNewIcon /></span>
                        </a>
                    </section>
                </address>
            </section>


        </footer>
    )
}