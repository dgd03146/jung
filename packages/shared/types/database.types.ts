export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	// Allows to automatically instantiate createClient with right options
	// instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
	__InternalSupabase: {
		PostgrestVersion: '12.2.3 (519615d)';
	};
	public: {
		Tables: {
			articles: {
				Row: {
					category: string;
					created_at: string | null;
					id: string;
					my_thoughts: string | null;
					original_url: string;
					published_at: string | null;
					summary: string;
					title: string;
					updated_at: string | null;
				};
				Insert: {
					category: string;
					created_at?: string | null;
					id?: string;
					my_thoughts?: string | null;
					original_url: string;
					published_at?: string | null;
					summary: string;
					title: string;
					updated_at?: string | null;
				};
				Update: {
					category?: string;
					created_at?: string | null;
					id?: string;
					my_thoughts?: string | null;
					original_url?: string;
					published_at?: string | null;
					summary?: string;
					title?: string;
					updated_at?: string | null;
				};
				Relationships: [];
			};
			categories: {
				Row: {
					color: string | null;
					created_at: string | null;
					description: string | null;
					id: string;
					name: string;
					parent_id: string | null;
					type: string;
				};
				Insert: {
					color?: string | null;
					created_at?: string | null;
					description?: string | null;
					id?: string;
					name: string;
					parent_id?: string | null;
					type: string;
				};
				Update: {
					color?: string | null;
					created_at?: string | null;
					description?: string | null;
					id?: string;
					name?: string;
					parent_id?: string | null;
					type?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'categories_parent_id_fkey';
						columns: ['parent_id'];
						isOneToOne: false;
						referencedRelation: 'categories';
						referencedColumns: ['id'];
					},
				];
			};
			collection_photos: {
				Row: {
					collection_id: string;
					created_at: string;
					photo_id: number;
				};
				Insert: {
					collection_id: string;
					created_at?: string;
					photo_id: number;
				};
				Update: {
					collection_id?: string;
					created_at?: string;
					photo_id?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'collection_photos_collection_id_fkey';
						columns: ['collection_id'];
						isOneToOne: false;
						referencedRelation: 'collections';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'collection_photos_photo_id_fkey';
						columns: ['photo_id'];
						isOneToOne: false;
						referencedRelation: 'photos';
						referencedColumns: ['id'];
					},
				];
			};
			collections: {
				Row: {
					cover_image: string;
					created_at: string | null;
					description: string | null;
					id: string;
					photo_count: number | null;
					title: string;
				};
				Insert: {
					cover_image: string;
					created_at?: string | null;
					description?: string | null;
					id?: string;
					photo_count?: number | null;
					title: string;
				};
				Update: {
					cover_image?: string;
					created_at?: string | null;
					description?: string | null;
					id?: string;
					photo_count?: number | null;
					title?: string;
				};
				Relationships: [];
			};
			guestbook: {
				Row: {
					anonymous_id: string | null;
					author_avatar: string;
					author_id: string | null;
					author_name: string;
					background_color: string | null;
					content: string;
					created_at: string;
					emoji: string | null;
					id: string;
					is_anonymous: boolean | null;
				};
				Insert: {
					anonymous_id?: string | null;
					author_avatar: string;
					author_id?: string | null;
					author_name: string;
					background_color?: string | null;
					content: string;
					created_at?: string;
					emoji?: string | null;
					id?: string;
					is_anonymous?: boolean | null;
				};
				Update: {
					anonymous_id?: string | null;
					author_avatar?: string;
					author_id?: string | null;
					author_name?: string;
					background_color?: string | null;
					content?: string;
					created_at?: string;
					emoji?: string | null;
					id?: string;
					is_anonymous?: boolean | null;
				};
				Relationships: [];
			};
			photos: {
				Row: {
					alt: string;
					created_at: string | null;
					description: string | null;
					description_en: string | null;
					embedding: string | null;
					height: number;
					id: number;
					image_url: string;
					liked_by: string[];
					likes: number | null;
					tags: string[] | null;
					tags_en: string[] | null;
					title: string;
					title_en: string | null;
					updated_at: string;
					views: number | null;
					width: number;
				};
				Insert: {
					alt: string;
					created_at?: string | null;
					description?: string | null;
					description_en?: string | null;
					embedding?: string | null;
					height: number;
					id?: number;
					image_url: string;
					liked_by?: string[];
					likes?: number | null;
					tags?: string[] | null;
					tags_en?: string[] | null;
					title: string;
					title_en?: string | null;
					updated_at: string;
					views?: number | null;
					width: number;
				};
				Update: {
					alt?: string;
					created_at?: string | null;
					description?: string | null;
					description_en?: string | null;
					embedding?: string | null;
					height?: number;
					id?: number;
					image_url?: string;
					liked_by?: string[];
					likes?: number | null;
					tags?: string[] | null;
					tags_en?: string[] | null;
					title?: string;
					title_en?: string | null;
					updated_at?: string;
					views?: number | null;
					width?: number;
				};
				Relationships: [];
			};
			places: {
				Row: {
					address: string;
					address_en: string | null;
					category_id: string | null;
					coordinates: Json;
					created_at: string;
					description: string;
					description_en: string | null;
					embedding: string | null;
					id: string;
					liked_by: string[] | null;
					likes: number | null;
					photos: Json;
					tags: string[] | null;
					tags_en: string[] | null;
					tips: string[] | null;
					tips_en: string[] | null;
					title: string;
					title_en: string | null;
					updated_at: string;
				};
				Insert: {
					address: string;
					address_en?: string | null;
					category_id?: string | null;
					coordinates: Json;
					created_at?: string;
					description: string;
					description_en?: string | null;
					embedding?: string | null;
					id?: string;
					liked_by?: string[] | null;
					likes?: number | null;
					photos: Json;
					tags?: string[] | null;
					tags_en?: string[] | null;
					tips?: string[] | null;
					tips_en?: string[] | null;
					title: string;
					title_en?: string | null;
					updated_at?: string;
				};
				Update: {
					address?: string;
					address_en?: string | null;
					category_id?: string | null;
					coordinates?: Json;
					created_at?: string;
					description?: string;
					description_en?: string | null;
					embedding?: string | null;
					id?: string;
					liked_by?: string[] | null;
					likes?: number | null;
					photos?: Json;
					tags?: string[] | null;
					tags_en?: string[] | null;
					tips?: string[] | null;
					tips_en?: string[] | null;
					title?: string;
					title_en?: string | null;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'spots_category_id_fkey';
						columns: ['category_id'];
						isOneToOne: false;
						referencedRelation: 'categories';
						referencedColumns: ['id'];
					},
				];
			};
			post_comments: {
				Row: {
					anonymous_id: string | null;
					anonymous_name: string | null;
					content: string;
					created_at: string | null;
					id: string;
					liked_by: string[] | null;
					likes: number | null;
					parent_id: string | null;
					password_hash: string | null;
					post_id: number;
					updated_at: string | null;
					user_id: string | null;
				};
				Insert: {
					anonymous_id?: string | null;
					anonymous_name?: string | null;
					content: string;
					created_at?: string | null;
					id?: string;
					liked_by?: string[] | null;
					likes?: number | null;
					parent_id?: string | null;
					password_hash?: string | null;
					post_id: number;
					updated_at?: string | null;
					user_id?: string | null;
				};
				Update: {
					anonymous_id?: string | null;
					anonymous_name?: string | null;
					content?: string;
					created_at?: string | null;
					id?: string;
					liked_by?: string[] | null;
					likes?: number | null;
					parent_id?: string | null;
					password_hash?: string | null;
					post_id?: number;
					updated_at?: string | null;
					user_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'post_comments_parent_id_fkey';
						columns: ['parent_id'];
						isOneToOne: false;
						referencedRelation: 'post_comments';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'post_comments_post_id_fkey';
						columns: ['post_id'];
						isOneToOne: false;
						referencedRelation: 'posts';
						referencedColumns: ['id'];
					},
				];
			};
			posts: {
				Row: {
					category_id: string | null;
					content: Json | null;
					content_en: Json | null;
					content_ko: Json | null;
					date: string | null;
					description: string | null;
					description_en: string | null;
					description_ko: string | null;
					embedding: string | null;
					id: number;
					imagesrc: string | null;
					liked_by: string[] | null;
					likes: number | null;
					tags: string[] | null;
					tags_en: string[] | null;
					title: string | null;
					title_en: string | null;
					title_ko: string | null;
					updated_at: string | null;
					views: number | null;
				};
				Insert: {
					category_id?: string | null;
					content?: Json | null;
					content_en?: Json | null;
					content_ko?: Json | null;
					date?: string | null;
					description?: string | null;
					description_en?: string | null;
					description_ko?: string | null;
					embedding?: string | null;
					id?: never;
					imagesrc?: string | null;
					liked_by?: string[] | null;
					likes?: number | null;
					tags?: string[] | null;
					tags_en?: string[] | null;
					title?: string | null;
					title_en?: string | null;
					title_ko?: string | null;
					updated_at?: string | null;
					views?: number | null;
				};
				Update: {
					category_id?: string | null;
					content?: Json | null;
					content_en?: Json | null;
					content_ko?: Json | null;
					date?: string | null;
					description?: string | null;
					description_en?: string | null;
					description_ko?: string | null;
					embedding?: string | null;
					id?: never;
					imagesrc?: string | null;
					liked_by?: string[] | null;
					likes?: number | null;
					tags?: string[] | null;
					tags_en?: string[] | null;
					title?: string | null;
					title_en?: string | null;
					title_ko?: string | null;
					updated_at?: string | null;
					views?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: 'posts_category_id_fkey';
						columns: ['category_id'];
						isOneToOne: false;
						referencedRelation: 'categories';
						referencedColumns: ['id'];
					},
				];
			};
			profiles: {
				Row: {
					email: string | null;
					id: string;
					role: string | null;
					updated_at: string | null;
				};
				Insert: {
					email?: string | null;
					id: string;
					role?: string | null;
					updated_at?: string | null;
				};
				Update: {
					email?: string | null;
					id?: string;
					role?: string | null;
					updated_at?: string | null;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			is_admin: { Args: never; Returns: boolean };
			is_demo_admin: { Args: never; Returns: boolean };
			match_all_content: {
				Args: {
					match_count?: number;
					match_threshold?: number;
					query_embedding: string;
				};
				Returns: {
					content_id: string;
					content_type: string;
					description: string;
					similarity: number;
					title: string;
				}[];
			};
			match_photos: {
				Args: {
					match_count?: number;
					match_threshold?: number;
					query_embedding: string;
				};
				Returns: {
					description: string;
					id: number;
					similarity: number;
					tags: string[];
				}[];
			};
			match_places: {
				Args: {
					match_count?: number;
					match_threshold?: number;
					query_embedding: string;
				};
				Returns: {
					address: string;
					description: string;
					id: string;
					similarity: number;
					title: string;
				}[];
			};
			match_posts: {
				Args: {
					match_count?: number;
					match_threshold?: number;
					query_embedding: string;
				};
				Returns: {
					description_ko: string;
					id: number;
					similarity: number;
					title_en: string;
					title_ko: string;
				}[];
			};
			update_post_embedding: {
				Args: { new_embedding: string; post_id: number };
				Returns: undefined;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
	keyof Database,
	'public'
>];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
				DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
			DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
				DefaultSchema['Views'])
		? (DefaultSchema['Tables'] &
				DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema['Tables']
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
		? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema['Tables']
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
		? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends
		| keyof DefaultSchema['Enums']
		| { schema: keyof DatabaseWithoutInternals },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
		: never = never,
> = DefaultSchemaEnumNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
		? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema['CompositeTypes']
		| { schema: keyof DatabaseWithoutInternals },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
		: never = never,
> = PublicCompositeTypeNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
		? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
		: never;

export const Constants = {
	public: {
		Enums: {},
	},
} as const;
