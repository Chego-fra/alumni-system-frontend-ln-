import { Nunito } from 'next/font/google';
import '@/app/global.css';
import DynamicBackground from '@/components/backgroundComponent/DynamicBackground';

const nunitoFont = Nunito({
    subsets: ['latin'],
    display: 'swap',
});

const RootLayout = ({ children }) => {
    return (
        <html lang="en" className={nunitoFont.className}>
            <body className="antialiased">
                <DynamicBackground/>
                {children}
                </body>
        </html>
    );
};

export const metadata = {
    title: 'Laravel',
};

export default RootLayout;
