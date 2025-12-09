// Main entry point for promotion module
// ใช้สำหรับ export ไปยังโปรเจคอื่น

// Components
export { default as PromoHero } from './PromoHero';
export { default as PromoCategory } from './PromoCategory';
export { default as PromoList, PromoCard } from './PromoList';
export { default as PromoSection } from './PromoSection';

// Data
export {
    promotionsData,
    homePromotions,
    productsByCategory,
    speakerSpecs
} from './data';
