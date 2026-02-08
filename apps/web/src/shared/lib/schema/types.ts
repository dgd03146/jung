// JSON-LD Schema Types for SEO
// Updated: 2026-02 - Applied GEO/AEO best practices for AI search optimization

export type WithContext<T> = T & {
	'@context': 'https://schema.org';
};

/**
 * 자격/인증 정보 타입 (2026년 E-E-A-T 강화)
 * AI 검색 엔진이 저자의 전문성을 평가하는 데 사용
 */
export type EducationalOccupationalCredential = {
	'@type': 'EducationalOccupationalCredential';
	name: string;
	credentialCategory?: string;
	issuedBy?: Organization | string;
	dateCreated?: string;
};

/**
 * 직업 정보 타입 (2026년 E-E-A-T 강화)
 * 저자의 경험과 전문성 증명
 */
export type Occupation = {
	'@type': 'Occupation';
	name: string;
	occupationalCategory?: string;
	experienceRequirements?: string;
	skills?: readonly string[] | string[];
	responsibilities?: string;
};

/**
 * Person 타입 - 2026년 GEO/AEO 베스트 프랙티스 적용
 *
 * 핵심 변화:
 * - hasCredential: 자격/인증 정보 추가
 * - hasOccupation: 경력 정보 추가
 * - AI 검색 엔진이 E-E-A-T를 평가할 때 사용
 */
export type Person = {
	'@type': 'Person';
	name: string;
	url?: string;
	image?: string;
	sameAs?: string[];
	// E-E-A-T 최적화 필드 (2026년 강화)
	jobTitle?: string;
	description?: string;
	knowsAbout?: string[] | readonly string[];
	alumniOf?: string | Organization;
	workLocation?: {
		'@type': 'Place';
		name: string;
		addressCountry?: string;
		address?: {
			'@type': 'PostalAddress';
			addressCountry: string;
			addressLocality?: string;
		};
	};
	// 2026년 추가: 자격/인증 정보
	hasCredential?:
		| EducationalOccupationalCredential
		| EducationalOccupationalCredential[]
		| readonly EducationalOccupationalCredential[];
	// 2026년 추가: 경력 정보
	hasOccupation?: Occupation;
	// 2026년 추가: 수상 경력
	award?: string[];
};

export type Organization = {
	'@type': 'Organization';
	name: string;
	url?: string;
	logo?: string;
};

export type ImageObject = {
	'@type': 'ImageObject';
	url: string;
	width?: number;
	height?: number;
	caption?: string;
	description?: string;
	name?: string;
	datePublished?: string;
};

export type WebSite = {
	'@type': 'WebSite';
	name: string;
	url: string;
	description?: string;
	author?: Person;
	inLanguage?: string | string[];
	potentialAction?: SearchAction;
};

export type SearchAction = {
	'@type': 'SearchAction';
	target: {
		'@type': 'EntryPoint';
		urlTemplate: string;
	};
	'query-input': string;
};

export type Article = {
	'@type': 'Article' | 'BlogPosting' | 'TechArticle';
	headline: string;
	description?: string;
	image?: string | ImageObject | ImageObject[];
	author: Person | Person[];
	publisher?: Organization;
	datePublished: string;
	dateModified?: string;
	mainEntityOfPage?: {
		'@type': 'WebPage';
		'@id': string;
	};
	keywords?: string[];
	articleSection?: string;
	wordCount?: number;
	timeRequired?: string;
	inLanguage?: string;
};

export type BreadcrumbItem = {
	'@type': 'ListItem';
	position: number;
	name: string;
	item?: string;
};

export type BreadcrumbList = {
	'@type': 'BreadcrumbList';
	itemListElement: BreadcrumbItem[];
};

export type Place = {
	'@type': 'Place';
	name: string;
	description?: string;
	image?: string | ImageObject[];
	address?: {
		'@type': 'PostalAddress';
		addressCountry?: string;
		addressLocality?: string;
		addressRegion?: string;
		streetAddress?: string;
	};
	geo?: {
		'@type': 'GeoCoordinates';
		latitude: number;
		longitude: number;
	};
};

export type FAQPage = {
	'@type': 'FAQPage';
	mainEntity: Question[];
};

/**
 * Question 타입 - 2026년 AEO 베스트 프랙티스 적용
 * acceptedAnswer에 저자 정보와 날짜 추가하여 AI 인용 가능성 향상
 */
export type Question = {
	'@type': 'Question';
	name: string;
	acceptedAnswer: {
		'@type': 'Answer';
		text: string;
		// 2026년 추가: 답변 출처 정보 (AI 인용 시 신뢰성 향상)
		author?: Person;
		dateCreated?: string;
		url?: string;
	};
};

// HowTo 스키마 타입 (튜토리얼/가이드 콘텐츠용)
export type HowToStep = {
	'@type': 'HowToStep';
	position: number;
	name: string;
	text: string;
	image?: string;
	url?: string;
};

/**
 * HowTo 타입 - 2026년 AEO 베스트 프랙티스 적용
 * AI 검색 엔진이 단계별 가이드를 더 잘 이해하도록 확장
 */
export type HowTo = {
	'@type': 'HowTo';
	name: string;
	description?: string;
	image?: string;
	totalTime?: string; // ISO 8601 duration (e.g., "PT30M")
	estimatedCost?: {
		'@type': 'MonetaryAmount';
		currency: string;
		value: string;
	};
	step: HowToStep[];
	tool?: string[] | HowToTool[];
	supply?: string[] | HowToSupply[];
	// 2026년 추가: 저자 정보 (E-E-A-T 강화)
	author?: Person;
	// 2026년 추가: 발행일 (최신성 평가)
	datePublished?: string;
	dateModified?: string;
	// 2026년 추가: 난이도/대상 (AI가 적절한 답변 선택 시 참고)
	educationalLevel?: 'Beginner' | 'Intermediate' | 'Advanced';
};

/**
 * HowToTool 타입 (2026년 추가)
 * 구조화된 도구 정보
 */
export type HowToTool = {
	'@type': 'HowToTool';
	name: string;
	url?: string;
};

/**
 * HowToSupply 타입 (2026년 추가)
 * 구조화된 재료/필수품 정보
 */
export type HowToSupply = {
	'@type': 'HowToSupply';
	name: string;
	url?: string;
};

// SpeakableSpecification 타입 (음성 검색 최적화)
export type SpeakableSpecification = {
	'@type': 'SpeakableSpecification';
	cssSelector?: string[];
	xpath?: string[];
};

// Article에 Speakable 추가를 위한 확장 타입
export type ArticleWithSpeakable = Article & {
	speakable?: SpeakableSpecification;
};

// PostalAddress 타입 (GEO 최적화)
export type PostalAddress = {
	'@type': 'PostalAddress';
	addressCountry: string;
	addressLocality?: string;
	addressRegion?: string;
	postalCode?: string;
	streetAddress?: string;
};

// Organization 확장 타입 (GEO 최적화)
export type OrganizationWithGeo = Organization & {
	address?: PostalAddress;
	areaServed?: string | string[];
	foundingDate?: string;
	founder?: Person;
	contactPoint?: {
		'@type': 'ContactPoint';
		contactType: string;
		url?: string;
		email?: string;
	};
};
