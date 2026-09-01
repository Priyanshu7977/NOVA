'use client';

import React from 'react';
import { useExperience } from '@/context/ExperienceContext';
import { ProductShowroom } from '@/components/product/ProductShowroom';
import { Product } from '@/data/products';

interface ProductDetailModalProps {
  product?: Product | null;
  onClose?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const { selectedProductForModal, setSelectedProductForModal } = useExperience();

  const currentProduct = product || selectedProductForModal;

  if (!currentProduct) return null;

  const handleClose = () => {
    onClose?.();
    setSelectedProductForModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#F7F7F5] pointer-events-auto animate-in fade-in duration-300">
      <ProductShowroom
        product={currentProduct}
        onBack={handleClose}
      />
    </div>
  );
};
