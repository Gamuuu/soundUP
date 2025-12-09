# Home Page Documentation

**File**: `src/app/page.js`

The Home page acts as a landing page. It is a **Client Component** that orchestrates several sub-components to create a visually engaging introduction to the brand. It does not perform heavy data fetching itself but relies on the embedded components.

---

## 1. Hero Section (`src/components/home/Hero.jsx`)

### UI Details
-   **Layout**: Split screen. Left side for text, Right side for a floating widget.
-   **Animated Text**:
    -   Headline: "Store. The best way to buy the [Word] you love."
    -   **Logic**: The [Word] cycles through `["Products", "Experience", "Instruments", "Gear"]` every 3 seconds.
    -   **Animation**: Uses `framer-motion` (`AnimatePresence`) to slide words up/down with opacity fades.
-   **Floating Widget**:
    -   A glassmorphism card (`backdrop-blur`) containing a `NeonCube` avatar.
    -   **Marquee**: A scrolling text strip saying "Hesitated? See more what we have made."
    -   **Action**: A circular arrow button linking to `/about-us#experiences`.

---

## 2. Categories Section (`src/components/home/Categories.jsx`)

### UI Details
-   **Layout**: A horizontal scrolling strip (`overflow-x-auto`).
-   **Items**: Displays icons for:
    -   In-car monitor
    -   Car audio
    -   Dash cam
    -   Window tint
    -   Damping
    -   Amp
-   **Interaction**: Hovering over an item highlights the icon in the Accent Color and brightens the text.
-   **Tech**: Uses `lucide-react` for icons (Monitor, Speaker, Camera, etc.).

---

## 3. Promotion Section (`src/components/home/Promotion.jsx`)
*(Based on common structure)*
-   **UI**: Typically a full-width or large banner highlighting a specific active campaign.
-   **Logic**: Static display linking to the `/promotion` page.

---

## 4. Popular Section (`src/components/home/Popular.jsx`)
*(Based on common structure)*
-   **UI**: A grid or carousel displaying trending products.
-   **Logic**: Likely fetches a subset of products tagged as 'popular' or displays hardcoded bestsellers.

---

## 5. Gallery Section (`src/components/home/Gallery.jsx`)
-   **UI**: A masonry or grid layout of high-quality installation images.
-   **Purpose**: Social proof and visual portfolio.
