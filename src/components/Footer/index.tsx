import React from 'react';
import cl from './footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={cl.footer}>
      <div className={`wrapper ${cl.footer__wrapper}`}>
        <a
          href="https://github.com/arteemm"
          className={`link ${cl.footer__link}`}
          target="_blank"
          rel="noreferrer"
        >
          github: arteemm
        </a>
      </div>
    </footer>
  );
};

export default Footer;
