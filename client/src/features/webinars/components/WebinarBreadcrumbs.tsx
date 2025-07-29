import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';

const WebinarBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNames = {
    webinars: 'Вебинары',
    details: 'Детали',
    registration: 'Регистрация',
    manager: 'Управление',
    all: 'Все вебинары',
    upcoming: 'Предстоящие',
    past: 'Прошедшие'
  };

  if (pathnames.length <= 1) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-3 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.ol
          className="flex items-center space-x-2 text-sm"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          <motion.li
            variants={{
              hidden: { opacity: 0, x: -10 },
              visible: { opacity: 1, x: 0 }
            }}
          >
            <Link 
              to="/"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Главная
            </Link>
          </motion.li>
          
          {pathnames.map((pathname, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const displayName = breadcrumbNames[pathname] || pathname;
            
            return (
              <motion.li
                key={pathname}
                className="flex items-center space-x-2"
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <span className="text-gray-400">/</span>
                {isLast ? (
                  <span className="text-gray-700 font-medium">
                    {displayName}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {displayName}
                  </Link>
                )}
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </motion.nav>
  );
};

export default WebinarBreadcrumbs;
