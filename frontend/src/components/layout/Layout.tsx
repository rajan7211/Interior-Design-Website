import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, showFooter = true }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#181716] overflow-x-hidden selection:bg-[#5D6853] selection:text-white">
      <ScrollToTop />
      <Navbar />
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className={`flex-1 w-full flex flex-col overflow-x-hidden ${isHome ? '' : 'pt-20 sm:pt-24'}`}
      >
        {children}
      </motion.main>
      {showFooter && <Footer />}
    </div>
  );
};
