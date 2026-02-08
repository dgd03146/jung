import { GoogleGenerativeAI } from '@google/generative-ai';

interface ImproveArticleInput {
	title: string;
	summary: string;
	my_thoughts?: string | null;
}

interface ImprovedArticle {
	title: string;
	summary: string;
	my_thoughts: string;
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

export const articleService = {
	/**
	 * AI를 사용하여 아티클 내용 개선
	 */
	async improveArticle(input: ImproveArticleInput): Promise<ImprovedArticle> {
		const prompt = `다음 아티클 정보를 개선해줘.
더 명확하고 간결하게 다듬되, 원래 의도는 유지해줘.
한국어로 작성해줘.

제목: ${input.title}
요약: ${input.summary}
내 생각: ${input.my_thoughts || '(없음)'}

다음 JSON 형식으로만 응답해줘:
{
  "title": "개선된 제목",
  "summary": "개선된 요약 (2-3문장)",
  "my_thoughts": "개선된 내 생각/코멘트"
}`;

		const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
		const result = await model.generateContent(prompt);
		const text = result.response.text();

		// JSON 파싱
		const jsonMatch = text.match(/\{[\s\S]*\}/);
		if (!jsonMatch) {
			throw new Error('AI 응답을 파싱할 수 없습니다');
		}

		const parsed = JSON.parse(jsonMatch[0]) as ImprovedArticle;
		return parsed;
	},
};
