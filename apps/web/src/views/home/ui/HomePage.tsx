'use client';

import { PRIMARY_NAV_LIST } from '@/fsd/app';
import { mountAnim, rotateX } from '@/fsd/shared';
import { Flex, Stack, Typography } from '@jung/design-system';
import { motion } from 'framer-motion';
import Link from 'next/link';
// import { useRef } from 'react';
import * as styles from './HomePage.css';

const HomePage = () => {
	// const spanRef = useRef<HTMLSpanElement>(null);

	// const { controls } = useInViewAnimation({
	//   once: true,
	//   // repeatDelay: 10000,
	//   ref: spanRef,
	// });

	// const textArray = ['GeoJung'];

	return (
		<Stack
			space='0'
			align='center'
			justifyContent='center'
			className={styles.container}
		>
			<motion.div variants={rotateX} {...mountAnim}>
				<Typography.Heading {...styles.heading}>
					GeoJung
					{/* <motion.span
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
          // FIXME: 애니메이션 사용하려면 성능 최적화
        </motion.span> */}
				</Typography.Heading>
			</motion.div>
			<Flex columnGap='6'>
				{PRIMARY_NAV_LIST.map((it) => (
					<motion.div variants={rotateX} {...mountAnim} key={it.id}>
						<Link href={it.path}>
							<Typography.Heading
								level={4}
								color={{
									base: 'primary',
									hover: 'primary200',
								}}
							>
								{/* all I can do is do our best to relish this remarkable ride. */}
								{it.label}
							</Typography.Heading>
						</Link>
					</motion.div>
				))}
			</Flex>
		</Stack>
	);
};

export default HomePage;
