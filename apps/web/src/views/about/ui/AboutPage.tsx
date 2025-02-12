import { Flex, Stack, Typography } from '@jung/design-system';
import * as content from '../config/content';
import * as styles from './AboutPage.css';
import { ConnectButton } from './ConnectButton';

const AboutPage = () => {
	return (
		<div className={styles.pageContainer}>
			<div className={styles.contentWrapper}>
				<div className={styles.contentGrid}>
					<section className={styles.introCard}>
						<div className={styles.iconWrapper}>
							<span role='img' aria-label='wave'>
								👋
							</span>
						</div>
						<Typography.Heading level={3} className={styles.cardTitle}>
							Who I Am
						</Typography.Heading>
						<Stack gap='2'>
							{content.WHO_I_AM.map((content, index) => (
								<Typography.Text key={index} level={3} color='black100'>
									{content}
								</Typography.Text>
							))}
						</Stack>
					</section>

					<section className={styles.highlightCard}>
						<div className={styles.loveIcon}>
							<span role='img' aria-label='heart'>
								💙
							</span>
						</div>
						<Typography.Heading level={3} className={styles.highlightTitle}>
							What I Love
						</Typography.Heading>
						<Stack gap='2'>
							{content.WHAT_I_LOVE.map((content, index) => (
								<Typography.Text key={index} level={3} color='white'>
									{content}
								</Typography.Text>
							))}
						</Stack>
					</section>

					<section className={styles.storyCard}>
						<div className={styles.iconWrapper}>
							<span role='img' aria-label='sparkles'>
								✨
							</span>
						</div>
						<Typography.Heading level={3} className={styles.cardTitle}>
							This Space
						</Typography.Heading>
						<Stack gap='2'>
							{content.THIS_SPACE.map((content, index) => (
								<Typography.Text key={index} level={3} color='black100'>
									{content}
								</Typography.Text>
							))}
						</Stack>
					</section>

					<section className={styles.visionCard}>
						<div className={styles.iconWrapper}>
							<span role='img' aria-label='rocket'>
								🚀
							</span>
						</div>
						<Typography.Heading level={3} className={styles.cardTitle}>
							My Vision
						</Typography.Heading>
						<Stack gap='2'>
							{content.MY_VISION.map((content, index) => (
								<Typography.Text key={index} level={3} color='black100'>
									{content}
								</Typography.Text>
							))}
						</Stack>
					</section>
				</div>

				<Flex justify='center' marginTop='10'>
					<ConnectButton />
				</Flex>
			</div>
		</div>
	);
};

export default AboutPage;
