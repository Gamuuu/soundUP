# Product Page Module & Migration Pack

This package contains the complete source code for the "Product Catalog" feature of the SoundUP project, ready to be integrated into a new Next.js application.

## 📦 Contents

### 1. Frontend (`/frontend`)
Contains the Next.js App Router pages and React components responsible for displaying products.

-   **`app/products/page.js`**: The main landing page for products. Displays categories (Speakers, Subwoofers, etc.) in a grid.
-   **`app/products/[category]/page.js`**: Dynamic route for displaying products within a specific category. Includes brand filtering/accordion logic.
-   **`components/CategoryCard.jsx`**: Visual card component for navigating categories.
-   **`components/ProductRow.jsx`**: Detailed row/card component for displaying individual product info (Image, Name, Price, Description).
-   **`components/BrandAccordion.jsx`**: UI component for grouping products by brand.

### 2. Backend (`/backend`)
Contains the API logic.

-   **`api/route.js`**: The API Endpoint (`GET /api/products`).
    -   *Current Status:* Connects to a local SQLite database using `better-sqlite3`.
    -   *Action Required:* Needs to be refactored to query Supabase (PostgreSQL) via REST API.

### 3. Utilities (`/utils`)
-   **`productUtils.js`**: Helper functions for parsing brand names from product strings and handling URL slugs.

---

## 🚀 Integration Guide (Migration to Supabase)

### Step 1: Copy Files
Copy the contents of `frontend`, `backend`, and `utils` into your target Next.js project, respecting the folder structure (e.g., `src/app`, `src/components`).

### Step 2: Install Dependencies
Ensure your new project has the necessary UI libraries used in these components:
```bash
npm install framer-motion lucide-react @supabase/supabase-js
```
*(Note: `lucide-react` is used for icons, `framer-motion` for animations)*

### Step 3: Switch Database Logic (SQLite -> Supabase)

The current code in `backend/api/route.js` uses SQLite. You must replace it with Supabase logic.

**Old Code (SQLite):**
```javascript
import db from '../../../lib/db.js';
// ...
products = db.prepare('SELECT * FROM products').all();
```

**New Code (Supabase):**
1.  Initialize Supabase client in your project.
2.  Update `backend/api/route.js`:

```javascript
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category'); // e.g. "Speaker"

  let query = supabase.from('products').select('*');

  // Filter if category is provided
  if (category) {
    query = query.eq('item_type', category);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
```

### Step 4: Environment Variables
Add your Supabase credentials to `.env.local` in the new project:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Step 5: Database Schema
Ensure your Supabase table `products` has these columns to match the UI:
- `id` (int8)
- `name` (text)
- `price` (float8)
- `description` (text)
- `image` (text) -> URL to the image
- `item_type` (text) -> Important! Used for filtering (Values: "Speaker", "Subwoofer", "Amplifier", "Head Unit")
- `category` (text) -> Sub-category (e.g. "Component Speakers")

---

## 💡 UI Logic Overview

1.  **Fetching:** The frontend (`app/products/page.js`) fetches *all* products once from `/api/products`.
2.  **Filtering:** It then filters this data client-side into 4 main groups based on `item_type`:
    -   Speakers
    -   Subwoofers
    -   Amplifiers
    -   Head Units
3.  **Display:** It passes these groups to `CategoryCard` components.
4.  **Navigation:** Clicking a card goes to `[category]/page.js`, which displays the specific list, grouped further by Brand.
