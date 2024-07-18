// 이 레이어에는 특정 비즈니스 로직에 종속되지 않은 재사용 가능한 컴포넌트와 유틸리티가 포함되어 있습니다. 여기에는 UI 키트, axios 설정, 애플리케이션 설정, 비즈니스 로직에 묶이지 않은 헬퍼 등이 포함됩니다.

export { NavigationLinks, LanguageSwitcher } from '@/fsd/shared/ui';
export { DictionaryContext, useDictionary } from './lib';
export { type DictionaryType, getDictionary } from './config';
