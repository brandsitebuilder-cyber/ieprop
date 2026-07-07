import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Property {
  id: number
  slug: string
  title: string
  type: 'sale' | 'rent'
  price: number
  bedrooms: number
  bathrooms: number
  parking: number
  floor_size: number | null
  erf_size: number | null
  location: string
  description: string | null
  features: string[]
  status: string
  agent_id: number | null
  is_featured: boolean
  created_at: string
  images?: PropertyImage[]
  agent?: Agent
}

export interface PropertyImage {
  id: number
  property_id: number
  url: string
  is_primary: boolean
  sort_order: number
}

export interface Agent {
  id: number
  name: string
  email: string | null
  phone: string | null
  whatsapp: string | null
  photo_url: string | null
  bio: string | null
  position: string | null
}
