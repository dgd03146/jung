'use client';

import {
  AnimatedLine,
  mountAnim,
  rotateX,
  textOpacity,
  useInViewAnimation,
} from '@/fsd/shared';
import { Stack, Typography } from '@jung/design-system';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import * as styles from './HomePage.css';

const HomePage = () => {
  const spanRef = useRef<HTMLSpanElement>(null);

  const { controls } = useInViewAnimation({
    once: false,
    repeatDelay: 10000,
    ref: spanRef,
  });

  const textArray = ['hello!', `i'm geojung.`];

  return (
    <Stack space="0" align="left" justifyContent="center">
      <Typography.Heading {...styles.heading}>
        <motion.span
          ref={spanRef}
          initial="hidden"
          animate={controls}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {},
          }}
          aria-hidden
        >
          {textArray.map((line, lineIndex) => (
            <AnimatedLine
              key={`${line}-${lineIndex}`}
              line={line}
              animation={textOpacity}
            />
          ))}
        </motion.span>
      </Typography.Heading>
      <motion.div variants={rotateX} {...mountAnim}>
        <Typography.Text {...styles.subtitle}>
          all I can do is do our best to relish this remarkable ride.
        </Typography.Text>
      </motion.div>
    </Stack>
  );
};

export default HomePage;
