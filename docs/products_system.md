# Products System Documentation

The product system is the core e-commerce engine of SoundUp. It handles browsing, filtering, and displaying the inventory.

## 1. Data Source & API

### API Route (`src/app/api/products/route.js`)
-   **Method**: `GET`
-   **Logic**: Connects to the Supabase database (or mock data source) to retrieve the full list of products.
-   **Response**: JSON array of product objects `{ id, name, price, category, brand, image, ... }`.

---

## 2. Main Catalog Page (`src/app/products/page.js`)

### UI Structure
1.  **Hero Banner**:
    -   **Knockout Text Effect**: The word "PRODUCTS" is rendered transparent with a background image (`/assets/images/about-us.jpg`) clipped to the text (`background-clip: text`).
    -   **Stats**: Displays total product count and "All Items In Stock" status.
2.  **Category Grid**:
    -   Displays 4 distinct cards for the main product types:
        -   Speakers
        -   Subwoofers
        -   Amplifiers
        -   Head Units

### Logic
-   **Data Fetching**:
    -   Uses `useEffect` to fetch from `/api/products` on component mount.
    -   **Client-Side Grouping**: The raw array is filtered into the 4 types before rendering.
-   **Loading State**: Shows a spinner while the fetch is `pending`.

---

## 3. Category Detail Page (`src/app/products/[category]/page.js`)

**Route**: Dynamic (`[category]` corresponds to slugs like `speaker`, `amplifier`).

### UI Structure
1.  **Header**:
    -   Large, gradient text title (e.g., "SPEAKERS").
    -   Breadcrumb-like stats: "Back to Products • [Count] Products • [Count] Brands".
2.  **Brand Filter Toolbar**:
    -   A horizontal list of brand chips (e.g., "Alpine", "Sony", "JBL").
    -   **Active State**: Selected brands turn into the Accent Color.
    -   **Count**: Each chip shows the number of products for that brand (e.g., "Alpine (5)").
    -   **Clear Button**: Appears only when filters are active.
3.  **Product List (Accordions)**:
    -   Instead of a flat grid, products are grouped by Brand.
    -   Uses `BrandAccordion`: A collapsible section for each brand. Expanding it reveals the `ProductRow` or grid for that brand.

### Logic
1.  **Initialization**:
    -   Reads `params.category` from the URL.
    -   Fetches *all* products from API (same as main page).
    -   **Filter**: Keeps only products matching the current category slug.
2.  **Brand Grouping**:
    -   Uses a helper `groupProductsByBrand` to transform the array into an object: `{ "Alpine": [...], "Sony": [...] }`.
    -   Extracts `allBrandNames` from the keys of this object.
3.  **Client-Side Filtering**:
    -   `selectedBrands` state tracks user choices.
    -   The display list is computed: if `selectedBrands` is empty, show all. Otherwise, show only keys in the selection array.
4.  **Error Handling**:
    -   If the category slug doesn't exist in the mapping, shows a "Category Not Found" error.
