'use client';

import { Card, Flex } from '@jung/design-system';

import Image from 'next/image';

const item = {
	title: '이건 타이틀이야 타이틀',
	description: '이건 디스크립션이야',
	date: new Date(),
	tags: ['tag1', 'tag2', 'tag3', 'tag4'],
};

const CardExampleComponent = () => {
	return (
		<>
			<Flex>
				<Card item={item} rounded>
					{/* <Card.Media> */}
					<Image
						src='https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
						alt='Picture of the author'
						width={282}
						height={260}
						style={{ borderRadius: '16px' }}
					/>
					{/* </Card.Media> */}
					<Card.Content>
						<Card.Body>
							<Card.Title />
							<Card.Description />
						</Card.Body>
						<Card.Footer>
							<Card.Date />
							<Card.Tags />
						</Card.Footer>
					</Card.Content>
				</Card>
				<Card item={item} rounded>
					{/* <Card.Media> */}
					<Image
						src='https://images.unsplash.com/photo-1529655683826-aba9b3e77383?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
						alt='Picture of the author'
						width={282}
						height={260}
						style={{ borderRadius: '16px' }}
					/>
					{/* </Card.Media> */}
					<Card.Content>
						<Card.Body>
							<Card.Title />
							<Card.Description />
						</Card.Body>
						<Card.Footer>
							<Card.Date />
							<Card.Tags />
						</Card.Footer>
					</Card.Content>
				</Card>
			</Flex>
		</>
	);
};

export default CardExampleComponent;
