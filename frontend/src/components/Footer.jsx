import React from 'react';

function Footer() {
    return (
        <footer className='py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800'>
            <div className='flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row'>
                <p className='text-center text-sm leading-loose text-gray-400 md:text-left'>
                    Built by{' '}
                    <a
                        href="https://your-portfolio-link.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white"
                    >
                        Zeke
                    </a>
                    . &copy; 2025
                </p>
            </div>
        </footer>
    );
}

export default Footer;
