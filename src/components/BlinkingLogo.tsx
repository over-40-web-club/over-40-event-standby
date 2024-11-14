import { useState, useEffect } from 'react';
import over40Logo from '../assets/logo.svg';

export const BlinkingLogo = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const blinkTimer = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 5000);
    return () => clearInterval(blinkTimer);
  }, []);

  return (
    <div className='mb-8 transition-all duration-500'>
      <a
        href='https://over40web.club/'
        target='_blank'
        className={`
          block transform transition-all duration-500
          ${isVisible ? 'opacity-100' : 'opacity-60'}
        `}
      >
        <img
          src={over40Logo}
          className='logo w-20 h-20'
          alt='Over 40 Web Club logo'
        />
      </a>
    </div>
  );
};
