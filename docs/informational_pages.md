# Informational Pages Documentation

These pages serve the business content of the site, providing contact info, services, and company background.

---

## 1. Contact Page (`src/app/contact/page.js`)

### UI Details (`ContactHero`)
-   **Layout**: Two-column grid.
-   **Left Column (Info)**:
    -   **Phone**: "081-300-1111" with operating hours.
    -   **Email**: "Nuysoundup@gmail.com".
    -   **Address**: Ratchadaphisek 7, Thonburi, Bangkok.
    -   **Socials**: Icons for Instagram, Facebook, YouTube, and LINE.
-   **Right Column (Map)**:
    -   Embeds a **Google Maps Iframe**.
    -   Styled with rounded corners and a border.

---

## 2. Service Page (`src/app/service/page.js`)

### UI Details (`ServiceGallery`)
-   **Grid**: Displays a 4-column grid of service cards.
-   **Cards**:
    -   **Image**: High-quality photo with a hover zoom effect (`scale-110`).
    -   **Overlay**: Gradient overlay text at the bottom.
    -   **Content**: Title (e.g., "Tune DSP System") and short description.
-   **Services Listed**:
    1.  Car Audio Installation
    2.  DSP Tuning
    3.  Camera Installation (Front/Rear)
    4.  Window Tinting

---

## 3. Promotion Page (`src/app/promotion/page.js`)

### UI Details (`PromoList`)
-   **Layout**: Vertical list of banner-like cards.
-   **Card Style**: Gradient background (`zinc-900` to `black`) with a border.
-   **Elements**:
    -   **Icon**: A `Tag` icon in a circular badge.
    -   **Title & Badge**: e.g., "Summer Sale" with a pulsing "20% OFF" badge.
    -   **Coupon Code**: A dashed-border box displaying the code (e.g., "SUMMER2025") in a monospaced font.
-   **Interaction**: Hovering the card highlights the border in the accent color.

---

## 4. About Us Page (`src/app/about-us/page.js`)

### UI Details (`AboutHero`)
-   **Hero Type**: Full-screen (`h-screen`) scroll-based animation.
-   **Knockout Text**:
    -   The text "ABOUT US" is massive (`18vw`).
    -   **Technique**: CSS `background-clip: text` using a fixed background image of the shop/team.
-   **Animation**:
    -   Uses `framer-motion`'s `useScroll` and `useTransform`.
    -   As the user scrolls down, the text scales up (`scale: 1 -> 3`), creating a "zoom through" effect.
