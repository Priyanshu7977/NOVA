'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { notFound, useRouter } from 'next/navigation';
import { PRODUCTS, LIMITED_EDITION_PRODUCT } from '@/data/products';
import { NikeTunnelNav } from '@/components/ui/NikeTunnelNav';
import { CartDrawer } from '@/components/ui/CartDrawer';

// Dynamically import client-only 3D product showroom
const ProductShowroom = dynamic(
  () => import('@/components/product/ProductShowroom').then((mod) => mod.ProductShowroom),
  { ssr: false }
);

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter();
  const allProducts = [...PRODUCTS, LIMITED_EDITION_PRODUCT];
  const product = allProducts.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="relative bg-[#f6f5f2] text-[#0f172a] min-h-screen overflow-x-hidden">
      {/* Top Navbar */}
      <NikeTunnelNav
        currentUniverseIndex={0}
        onNavigateToUniverse={() => router.push('/')}
      />

      {/* Main Luxury Product Showroom */}
      <div className="pt-20">
        <ProductShowroom product={product} onBack={() => router.push('/')} />
      </div>

      {/* Sliding Luxury Cart Drawer */}
      <CartDrawer />
    </main>
  );
}
