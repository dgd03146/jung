import { useAuth } from '@/fsd/features/auth/api/useAuth';
import {
	Box,
	Button,
	Container,
	Flex,
	Input,
	Typography,
	useToast,
} from '@jung/design-system';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import * as styles from './LoginPage.css';

interface FormErrors {
	email?: string;
	password?: string;
}

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { login } = useAuth();
	const navigate = useNavigate();
	const showToast = useToast();
	const [errors, setErrors] = useState<FormErrors>({});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsLoading(true);

		try {
			await login(email, password);
			showToast('Login Success!');
			navigate({ to: '/' });
		} catch (err) {
			if (err instanceof Error) {
				showToast(err.message, 'error');
			} else {
				showToast('Login Failed!', 'error');
			}
		} finally {
			setIsLoading(false);
		}
	};

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};

		if (!email) {
			newErrors.email = 'Email is required';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
			newErrors.email = 'Please enter a valid email address';
		}

		if (!password) {
			newErrors.password = 'Password is required';
		} else if (password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	return (
		<Container>
			<Flex
				direction='column'
				align='center'
				justify='center'
				minHeight='screenDvh'
				background='white100'
			>
				<Box className={styles.card}>
					<Flex direction='column' align='center' gap='6'>
						<Box marginBottom='4' textAlign='center'>
							<Typography.Heading
								level={2}
								color='primary'
								textAlign='center'
								marginBottom='4'
							>
								JUNG'S ADMIN
							</Typography.Heading>
							<Typography.Text level={2} color='black100' fontWeight='medium'>
								Sign in with your admin account
							</Typography.Text>
						</Box>

						<Box as='form' onSubmit={handleSubmit} width='full'>
							<Flex direction='column' gap='3'>
								<Box className={styles.fieldContainer}>
									<Typography.Text
										level={2}
										color='black100'
										fontWeight='semibold'
									>
										Email
									</Typography.Text>
									<Input
										autoComplete='email'
										borderRadius='sm'
										type='email'
										value={email}
										onChange={(e) => {
											setEmail(e.target.value);
											if (errors.email)
												setErrors((prev) => ({ ...prev, email: undefined }));
										}}
										placeholder='admin@example.com'
										required
										aria-invalid={!!errors.email}
										aria-describedby={errors.email ? 'email-error' : undefined}
									/>
									{errors.email ? (
										<Typography.SubText
											level={2}
											color='error'
											minHeight='5'
											role='alert'
											id='email-error'
										>
											{errors.email}
										</Typography.SubText>
									) : (
										<Typography.SubText
											level={2}
											color='primary400'
											minHeight='5'
										>
											테스트 계정: test@1111.com
										</Typography.SubText>
									)}
								</Box>

								<Box className={styles.fieldContainer}>
									<Typography.Text
										level={2}
										color='black100'
										fontWeight='semibold'
									>
										Password
									</Typography.Text>
									<Input
										borderRadius='sm'
										type='password'
										autoComplete='current-password'
										value={password}
										onChange={(e) => {
											setPassword(e.target.value);
											if (errors.password)
												setErrors((prev) => ({ ...prev, password: undefined }));
										}}
										placeholder='••••••••'
										required
										aria-invalid={!!errors.password}
										aria-describedby={
											errors.password ? 'password-error' : undefined
										}
									/>
									{errors.password ? (
										<Typography.SubText
											level={2}
											color='error'
											minHeight='5'
											role='alert'
											id='password-error'
										>
											{errors.password}
										</Typography.SubText>
									) : (
										<Typography.SubText
											level={2}
											color='primary400'
											minHeight='5'
										>
											테스트 비밀번호: test1111
										</Typography.SubText>
									)}
								</Box>

								<Button
									type='submit'
									disabled={isLoading}
									size='lg'
									variant='primary'
									fontWeight='medium'
									borderRadius='sm'
									loading={isLoading}
								>
									{isLoading ? 'Signing in...' : 'Sign in'}
								</Button>
							</Flex>
						</Box>
					</Flex>
				</Box>
			</Flex>
		</Container>
	);
}
