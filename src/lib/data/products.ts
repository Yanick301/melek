export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    description: string;
    image_url: string;
    gallery_urls?: string[];
    sizes: string[];
    is_featured: boolean;
}

export const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Veste Vintage Prestige',
        price: 85000,
        category: 'Homme',
        description: 'Une pièce rare des années 90, en cuir véritable d\'Italie. Sa patine naturelle témoigne d\'un passé noble.',
        image_url: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=1000&auto=format&fit=crop',
        gallery_urls: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop'],
        sizes: ['M', 'L', 'XL'],
        is_featured: true
    },
    {
        id: '2',
        name: 'Robe en Soie Royale',
        price: 45000,
        category: 'Femme',
        description: 'Fluidité et délicatesse pour cette robe en soie sauvage. Un tombé impeccable qui sublime la silhouette.',
        image_url: 'https://images.unsplash.com/photo-1539109132314-34a936699561?q=80&w=1000&auto=format&fit=crop',
        sizes: ['S', 'M'],
        is_featured: true
    },
    {
        id: '3',
        name: 'Blazer Velours Heritage',
        price: 65000,
        category: 'Homme',
        description: 'Le velours côtelé revisité. Une pièce structurée pour une allure solennelle et moderne.',
        image_url: 'https://images.unsplash.com/photo-1594932224010-754f7a637532?q=80&w=1000&auto=format&fit=crop',
        sizes: ['M', 'L'],
        is_featured: true
    },
    {
        id: '4',
        name: 'Ensemble Lin Saharienne',
        price: 55000,
        category: 'Femme',
        description: 'Le confort du lin pur associé à une coupe saharienne intemporelle. Idéal pour l\'élégance tropicale.',
        image_url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
        sizes: ['S', 'M', 'L'],
        is_featured: true
    }
];
