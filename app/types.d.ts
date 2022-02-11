export interface Article {
  id: number
  created_at: string
  title: string
  slug: string
  description: string
  content?: string
  is_public: boolean
}
