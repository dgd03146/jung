import { Typography } from '@jung/design-system';
import * as styles from './AboutPage.css';
import { ConnectButton } from './ConnectButton';

const AboutPage = () => {
	return (
		<div className={styles.pageContainer}>
			<div className={styles.contentWrapper}>
				<header className={styles.header}>
					<Typography.Heading level={1} className={styles.title}>
						About Me
					</Typography.Heading>
					<Typography.Text className={styles.subtitle}>
						Let's learn about Jung
					</Typography.Text>
				</header>

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
						<Typography.Text className={styles.cardContent}>
							Hi, I'm Jung, a passionate software engineer based in Korea. I
							love sharing my thoughts and experiences through this blog, where
							I explore various topics related to travel, food, and technology.
						</Typography.Text>
					</section>

					<section className={styles.highlightCard}>
						<div className={styles.loveIcon}>
							<span role='img' aria-label='heart'>
								♥️
							</span>
						</div>
						<Typography.Heading level={3} className={styles.highlightTitle}>
							What I Love
						</Typography.Heading>
						<Typography.Text className={styles.highlightContent}>
							I love exploring new places, learning about different cultures,
							and meeting new people. I also enjoy sharing a cold beer and good
							conversations with friends. I have a soft spot for memes, bringing
							ideas to life, and imagining what the future holds.
						</Typography.Text>
					</section>

					<section className={styles.storyCard}>
						<div className={styles.iconWrapper}>
							<span role='img' aria-label='sparkles'>
								✨
							</span>
						</div>
						<Typography.Heading level={3} className={styles.cardTitle}>
							My Journey
						</Typography.Heading>
						<Typography.Text className={styles.cardContent}>
							This website is more than just a portfolio. It’s a blog where I
							share my ideas and experiences, a showcase of my projects, and a
							collection of places that are special to me. It shows the moments
							I’ve enjoyed, the stories I’ve experienced, and how I’ve grown.
							Explore this space and join me!
						</Typography.Text>
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
						<Typography.Text className={styles.cardContent}>
							My vision is to be a happy person who enjoys life and tries new
							things. I want to make the most of every moment, learn from
							different experiences, and inspire others to do the same. Through
							this platform, I hope to share my journey, meet great people, and
							build a community where we can all grow and have fun together!
						</Typography.Text>
					</section>
				</div>

				<div className={styles.ctaContainer}>
					<ConnectButton />
				</div>
			</div>
		</div>
	);
};

export default AboutPage;
