'use client';

import React, { useState, useMemo } from 'react';
import { PRODUCTS, Product } from '@/data/products';
import { CollectionHero } from './CollectionHero';
import { ProductCard } from './ProductCard';
import { EditorialFeature } from './EditorialFeature';
import { ColorSystemSection } from './ColorSystemSection';
import { ProductDetailModal } from './ProductDetailModal';
import { useExperience } from '@/context/ExperienceContext';
import { sounds } from '@/components/audio/SoundManager';
import { ArrowRight } from 'lucide-react';

export const Act02Collection: React.FC = () => {
  const { scrollToCheckout, selectedProductForModal, setSelectedProductForModal } = useExperience();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter products by category & search query
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sport.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (activeCategory !== 'ALL') {
      if (activeCategory === 'MENS') {
        list = list.filter((p) => p.gender === "Men's" || p.gender === 'Unisex');
      } else if (activeCategory === 'WOMENS') {
        list = list.filter((p) => p.gender === "Women's" || p.gender === 'Unisex');
      } else if (activeCategory === 'BADMINTON') {
        list = list.filter((p) => p.sport.includes('Badminton') || p.category === 'TENNIS');
      } else {
        list = list.filter((p) => p.category === activeCategory);
      }
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.badge === 'NEW DROP' || b.badge === 'NEW' ? -1 : 1));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      // Most Popular
      list.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return list;
  }, [activeCategory, sortBy, searchQuery]);

  return (
    <section
      id="nova-collection"
      className="relative w-full bg-[#F7F7F5] text-[#111111] py-16 transition-colors duration-700 min-h-screen select-none border-t border-[#E5E5E2]"
    >
      {/* 1. Collection Hero, Search & Filters */}
      <CollectionHero
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalProductsCount={filteredProducts.length}
      />

      {/* 2. Responsive Product Grid */}
      <div className="w-full max-w-7xl mx-auto px-6 mt-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-[#E5E5E2] font-mono text-sm text-[#6B6B6B] space-y-3">
            <p>No Nova footwear matched your search "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('ALL');
              }}
              className="px-5 py-2.5 rounded-full bg-[#111111] text-white text-xs font-mono font-bold uppercase"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div
            key={`${activeCategory}-${sortBy}-${searchQuery}`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-300"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* 3. Wide Editorial Section */}
      <EditorialFeature />

      {/* 4. The Color System Section */}
      <ColorSystemSection />

      {/* 5. 3D Product Detail Modal */}
      {selectedProductForModal && (
        <ProductDetailModal
          product={selectedProductForModal}
          onClose={() => setSelectedProductForModal(null)}
        />
      )}
    </section>
  );
};
