export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string;
          content: string;
          tags: string[];
          category: string;
          cover_image: string | null;
          published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description?: string;
          content?: string;
          tags?: string[];
          category?: string;
          cover_image?: string | null;
          published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          description?: string;
          content?: string;
          tags?: string[];
          category?: string;
          cover_image?: string | null;
          published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      page_views: {
        Row: {
          id: string;
          slug: string;
          view_count: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          view_count?: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          view_count?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      increment_view_count: {
        Args: { p_slug: string };
        Returns: number;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Post = Database["public"]["Tables"]["posts"]["Row"];
export type PostInsert = Database["public"]["Tables"]["posts"]["Insert"];
export type PageView = Database["public"]["Tables"]["page_views"]["Row"];
