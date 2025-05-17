// ** import components
import { Typography } from '../typography';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className='py-2.5 bg-primary'>
            <div className='container flex items-center justify-center'>
                <Typography variant='Medium_H7' className='text-primary-foreground text-center'>Copyright © {currentYear} - HR Manager App</Typography>
            </div>
        </footer>
    );
};

export default Footer;