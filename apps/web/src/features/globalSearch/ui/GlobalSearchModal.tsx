'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoSearchOutline } from 'react-icons/io5';
import { useTRPC } from '@/fsd/app';
import { useScrollLock } from '@/fsd/shared';
import { useDebounceValue } from '../lib/useDebounceValue';
import * as styles from './GlobalSearchModal.css';
import { SearchResultItem } from './SearchResultItem';

const DEBOUNCE_DELAY_MS = 300;
const SEARCH_RESULT_LIMIT = 5;
const FOCUS_DELAY_MS = 50;

type Tab = 'all' | 'blog' | 'place' | 'photo';

const TABS: { key: Tab; label: string }[] = [
	{ key: 'all', label: 'All' },
	{ key: 'blog', label: 'Blog' },
	{ key: 'place', label: 'Places' },
	{ key: 'photo', label: 'Photos' },
];

interface ResultItem {
	type: 'blog' | 'place' | 'photo';
	id: string;
	title: string;
	subtitle: string;
	url: string;
}

interface GlobalSearchModalProps {
	isOpen: boolean;
	onClose: () => void;
	onToggle: () => void;
}

export function GlobalSearchModal({
	isOpen,
	onClose,
	onToggle,
}: GlobalSearchModalProps) {
	const [query, setQuery] = useState('');
	const [activeTab, setActiveTab] = useState<Tab>('all');
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [mounted, setMounted] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const selectedRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const trpc = useTRPC();

	const debouncedQuery = useDebounceValue(query, DEBOUNCE_DELAY_MS);

	useScrollLock(isOpen);

	// SSR guard
	useEffect(() => {
		setMounted(true);
	}, []);

	// tRPC query
	const { data, isFetching } = useQuery({
		...trpc.search.global.queryOptions({
			query: debouncedQuery,
			limit: SEARCH_RESULT_LIMIT,
		}),
		enabled: isOpen && debouncedQuery.length > 0,
	});

	// Flatten results for keyboard navigation
	const filteredResults = useMemo((): ResultItem[] => {
		if (!data) return [];

		const items: ResultItem[] = [];

		if (activeTab === 'all' || activeTab === 'blog') {
			for (const b of data.blogs) {
				items.push({
					type: 'blog',
					id: b.id,
					title: b.title,
					subtitle: b.description,
					url: `/blog/${b.id}`,
				});
			}
		}

		if (activeTab === 'all' || activeTab === 'place') {
			for (const p of data.places) {
				items.push({
					type: 'place',
					id: p.id,
					title: p.title,
					subtitle: p.address || p.description,
					url: `/places/${p.id}`,
				});
			}
		}

		if (activeTab === 'all' || activeTab === 'photo') {
			for (const p of data.photos) {
				items.push({
					type: 'photo',
					id: p.id,
					title: p.description || 'Photo',
					subtitle: p.tags?.join(', ') || '',
					url: `/gallery/photo/${p.id}`,
				});
			}
		}

		return items;
	}, [data, activeTab]);

	// Reset selection when search results change
	// biome-ignore lint/correctness/useExhaustiveDependencies: intentionally reset on data change
	useEffect(() => {
		setSelectedIndex(0);
	}, [data]);

	// Navigate to selected result
	const navigateToResult = useCallback(
		(item: ResultItem) => {
			router.push(item.url);
			onClose();
			setQuery('');
		},
		[router, onClose],
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			switch (e.key) {
				case 'ArrowDown': {
					e.preventDefault();
					if (filteredResults.length === 0) return;
					const nextIndex =
						selectedIndex >= filteredResults.length - 1 ? 0 : selectedIndex + 1;
					setSelectedIndex(nextIndex);
					requestAnimationFrame(() =>
						selectedRef.current?.scrollIntoView({ block: 'nearest' }),
					);
					break;
				}
				case 'ArrowUp': {
					e.preventDefault();
					if (filteredResults.length === 0) return;
					const prevIndex =
						selectedIndex <= 0 ? filteredResults.length - 1 : selectedIndex - 1;
					setSelectedIndex(prevIndex);
					requestAnimationFrame(() =>
						selectedRef.current?.scrollIntoView({ block: 'nearest' }),
					);
					break;
				}
				case 'Enter': {
					e.preventDefault();
					const item = filteredResults[selectedIndex];
					if (item) navigateToResult(item);
					break;
				}
				case 'ArrowLeft': {
					if (e.target instanceof HTMLInputElement) break;
					e.preventDefault();
					const curIdx = TABS.findIndex((t) => t.key === activeTab);
					const prevTabIdx = curIdx <= 0 ? TABS.length - 1 : curIdx - 1;
					const prevTab = TABS[prevTabIdx];
					if (prevTab) {
						setActiveTab(prevTab.key);
						setSelectedIndex(0);
					}
					break;
				}
				case 'ArrowRight': {
					if (e.target instanceof HTMLInputElement) break;
					e.preventDefault();
					const currentTabIndex = TABS.findIndex((t) => t.key === activeTab);
					const nextTabIndex = (currentTabIndex + 1) % TABS.length;
					const nextTab = TABS[nextTabIndex];
					if (nextTab) {
						setActiveTab(nextTab.key);
						setSelectedIndex(0);
					}
					break;
				}
			}
		},
		[filteredResults, selectedIndex, navigateToResult, activeTab],
	);

	// CMD+K global shortcut
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault();
				onToggle();
			}
		};
		document.addEventListener('keydown', handler);
		return () => document.removeEventListener('keydown', handler);
	}, [onToggle]);

	// Focus input on open
	useEffect(() => {
		if (isOpen) {
			setQuery('');
			setActiveTab('all');
			setSelectedIndex(0);
			setTimeout(() => inputRef.current?.focus(), FOCUS_DELAY_MS);
		}
	}, [isOpen]);

	// Handle overlay click via ref
	const overlayRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (!isOpen) return;
		const handler = (e: MouseEvent) => {
			if (e.target === overlayRef.current) onClose();
		};
		document.addEventListener('mousedown', handler);
		return () => document.removeEventListener('mousedown', handler);
	}, [isOpen, onClose]);

	// Handle ESC
	useEffect(() => {
		if (!isOpen) return;
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', handler);
		return () => document.removeEventListener('keydown', handler);
	}, [isOpen, onClose]);

	if (!mounted || !isOpen) return null;

	const hasQuery = debouncedQuery.length > 0;
	const hasResults = filteredResults.length > 0;

	return createPortal(
		<div ref={overlayRef} className={styles.overlay}>
			<div
				className={styles.container}
				role='dialog'
				aria-modal='true'
				aria-label='Search'
				onKeyDown={handleKeyDown}
			>
				{/* Search Input */}
				<div className={styles.inputWrapper}>
					<IoSearchOutline className={styles.searchIcon} />
					<input
						ref={inputRef}
						className={styles.input}
						type='text'
						placeholder='Search blog, places, photos...'
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						aria-label='Search query'
					/>
					<span className={styles.shortcutHint}>ESC</span>
				</div>

				{/* Tabs */}
				{hasQuery && (
					<div className={styles.tabs} role='tablist'>
						{TABS.map((t) => (
							<button
								key={t.key}
								className={styles.tab({
									active: activeTab === t.key,
								})}
								onClick={() => setActiveTab(t.key)}
								role='tab'
								aria-selected={activeTab === t.key}
							>
								{t.label}
							</button>
						))}
					</div>
				)}

				{/* Results */}
				<div className={styles.results} role='listbox'>
					{isFetching && hasQuery && (
						<div className={styles.loading}>
							Searching
							<span className={styles.dot}>.</span>
							<span className={styles.dot}>.</span>
							<span className={styles.dot}>.</span>
						</div>
					)}

					{!isFetching && hasQuery && !hasResults && (
						<div className={styles.emptyState}>
							No results found for &quot;{debouncedQuery}&quot;
						</div>
					)}

					{!isFetching &&
						hasResults &&
						filteredResults.map((item, index) => (
							<SearchResultItem
								key={`${item.type}-${item.id}`}
								type={item.type}
								title={item.title}
								subtitle={item.subtitle}
								isSelected={index === selectedIndex}
								onClick={() => navigateToResult(item)}
								itemRef={index === selectedIndex ? selectedRef : undefined}
							/>
						))}

					{!hasQuery && (
						<div className={styles.emptyState}>
							Type to search across all content
						</div>
					)}
				</div>

				{/* Footer */}
				<div className={styles.footer}>
					<div className={styles.footerKeys}>
						<kbd className={styles.kbd}>↑↓</kbd>
						<span>navigate</span>
						<kbd className={styles.kbd}>←→</kbd>
						<span>tab</span>
						<kbd className={styles.kbd}>↵</kbd>
						<span>open</span>
						<kbd className={styles.kbd}>esc</kbd>
						<span>close</span>
					</div>
					<span>Powered by Semantic Search</span>
				</div>
			</div>
		</div>,
		document.body,
	);
}
