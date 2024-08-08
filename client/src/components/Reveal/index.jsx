import { motion, useAnimation, useInView } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

function Reveal({ children }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true });

    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start('visible')
        }
    }, [isInView])

    return ( 
        <div ref={ref} style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.7, ease: 'easeInOut', delay: 0.25 }}
                initial='hidden'
                animate={mainControls}
                className='reveal'
            >{children}</motion.div>
        </div>
    );
}

export default Reveal;