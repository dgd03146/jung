import {
	DeleteObjectCommand,
	PutObjectCommand,
	S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

/**
 * Cloudflare R2 클라이언트
 * R2는 S3 호환 API를 사용하므로 AWS SDK로 연결 가능
 */
const R2 = new S3Client({
	region: 'auto',
	endpoint: process.env.R2_ENDPOINT,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID ?? '',
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
	},
});

const BUCKET = process.env.R2_BUCKET ?? 'jung-images';

// CORS 허용 도메인
const ALLOWED_ORIGINS = [
	'https://jung-admin.vercel.app',
	'https://www.geojung.com',
	'http://localhost:5173', // Admin 로컬 개발
	'http://localhost:3000', // Web 로컬 개발
];

const getCorsHeaders = (origin: string | null): Record<string, string> => {
	const allowedOrigin =
		origin && ALLOWED_ORIGINS.includes(origin)
			? origin
			: (ALLOWED_ORIGINS[0] ?? '*');
	return {
		'Access-Control-Allow-Origin': allowedOrigin,
		'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
	};
};

/**
 * OPTIONS - CORS preflight
 */
export async function OPTIONS(request: Request) {
	const origin = request.headers.get('origin');
	return new Response(null, {
		status: 204,
		headers: getCorsHeaders(origin),
	});
}

/**
 * POST /api/upload
 *
 * Presigned URL을 생성해서 반환
 *
 * 왜 Presigned URL이 필요한가?
 * - 클라이언트(Admin)가 직접 R2에 업로드하려면 API Key가 필요함
 * - 하지만 API Key를 클라이언트에 노출하면 보안 위험!
 * - 그래서 서버가 "1시간 동안만 유효한 업로드 URL"을 생성해서 전달
 * - 클라이언트는 이 URL로 직접 R2에 업로드 (서버 거치지 않음 = 빠름)
 */
export async function POST(request: Request) {
	const origin = request.headers.get('origin');
	const corsHeaders = getCorsHeaders(origin);

	try {
		const { filename, contentType, folder } = await request.json();

		// 고유한 파일명 생성 (UUID + 원본 확장자)
		const ext = filename.split('.').pop();
		const key = `${folder}/${crypto.randomUUID()}.${ext}`;

		// S3 PutObject 명령 생성
		const command = new PutObjectCommand({
			Bucket: BUCKET,
			Key: key,
			ContentType: contentType,
		});

		// 1시간 동안 유효한 Presigned URL 생성
		const signedUrl = await getSignedUrl(R2, command, { expiresIn: 3600 });

		return Response.json(
			{
				signedUrl, // 클라이언트가 이 URL로 PUT 요청
				key, // DB에 저장할 파일 경로
			},
			{ headers: corsHeaders },
		);
	} catch (error) {
		console.error('Upload URL generation failed:', error);
		return Response.json(
			{ error: 'Failed to generate upload URL' },
			{ status: 500, headers: corsHeaders },
		);
	}
}

/**
 * DELETE /api/upload
 *
 * R2에서 파일 삭제
 */
export async function DELETE(request: Request) {
	const origin = request.headers.get('origin');
	const corsHeaders = getCorsHeaders(origin);

	try {
		const { key } = await request.json();

		const command = new DeleteObjectCommand({
			Bucket: BUCKET,
			Key: key,
		});

		await R2.send(command);

		return Response.json({ success: true }, { headers: corsHeaders });
	} catch (error) {
		console.error('Delete failed:', error);
		return Response.json(
			{ error: 'Failed to delete file' },
			{ status: 500, headers: corsHeaders },
		);
	}
}
