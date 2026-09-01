'use client';

import React, { useState } from 'react';
import { useExperience, CartItem, OrderData } from '@/context/ExperienceContext';
import { sounds } from '@/components/audio/SoundManager';
import {
  ShieldCheck,
  Truck,
  ArrowRight,
  ArrowLeft,
  Check,
  CreditCard,
  Smartphone,
  Building2,
  PackageCheck,
  Lock,
  ShoppingBag,
} from 'lucide-react';
import { NikeShoeGraphic } from '@/components/ui/NikeShoeGraphic';

const STEPS = [
  { id: 1, title: '01 CART' },
  { id: 2, title: '02 DETAILS' },
  { id: 3, title: '03 PAYMENT' },
  { id: 4, title: '04 COMPLETE' },
];

export const CurvedCheckout: React.FC = () => {
  const {
    cartItems,
    cartTotal,
    clearCart,
    scrollToCollection,
    checkoutStep,
    setCheckoutStep,
    completedOrder,
    setCompletedOrder,
    setIsCartOpen,
  } = useExperience();

  // Form State
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [suite, setSuite] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('Maharashtra');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('India');

  // Shipping Method
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiProvider, setUpiProvider] = useState('gpay');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC');

  // Validation & Processing States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Dynamic Financial Calculations
  const shippingCost = shippingMethod === 'express' ? 499 : 0;
  // 18% GST calculation
  const taxAmount = Math.round(cartTotal * 0.18);
  const grandTotal = cartTotal + shippingCost + taxAmount;

  // Step 2 Validation Handler
  const validateDetails = () => {
    const errs: Record<string, string> = {};
    if (!email.includes('@') || !email.includes('.')) errs.email = 'Please enter a valid email address';
    if (phone.length < 10) errs.phone = 'Please enter a valid 10-digit mobile number';
    if (fullName.trim().length < 2) errs.fullName = 'Please enter your full legal name';
    if (address.trim().length < 5) errs.address = 'Please enter your street delivery address';
    if (city.trim().length < 2) errs.city = 'Please enter your city';
    if (postalCode.trim().length < 5) errs.postalCode = 'Please enter a valid postal code / PIN';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToPayment = () => {
    sounds.playClick();
    if (validateDetails()) {
      setCheckoutStep(3);
    }
  };

  // Payment Submission Simulation
  const handlePayNow = () => {
    sounds.playClick();
    setIsProcessing(true);

    setTimeout(() => {
      const orderNum = `#NX-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder: OrderData = {
        orderId: orderNum,
        items: [...cartItems],
        subtotal: cartTotal,
        shippingCost,
        tax: taxAmount,
        total: grandTotal,
        customer: { email, phone, fullName },
        shippingAddress: { address, suite, city, state: stateName, postalCode, country },
        shippingMethod,
        paymentMethod,
        createdAt: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        status: 'confirmed',
      };

      setCompletedOrder(newOrder);
      setIsProcessing(false);
      setCheckoutStep(4);
      clearCart();
    }, 1200);
  };

  return (
    <section
      id="nova-checkout"
      className="relative w-full bg-[#F8F8F5] text-[#111111] transition-colors duration-700 min-h-screen select-none pb-24"
    >
      {/* 1. Dramatic Curved Architectural Wave Header */}
      <div className="w-full relative overflow-hidden bg-[#F7F7F5] -mb-1">
        <svg
          viewBox="0 0 1440 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-36 md:h-52 preserve-3d"
        >
          {/* Smooth symmetrical architectural arch */}
          <path
            d="M 0,0 L 0,140 Q 720,240 1440,140 L 1440,0 Z"
            fill="#F8F8F5"
          />
        </svg>

        {/* Center Header Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <span className="text-xs font-mono font-bold tracking-mega text-[#6B6B6B] uppercase mb-1">
            NOVA LABS // ACT III
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-[#111111] uppercase">
            CHECKOUT
          </h2>
          <p className="text-xs font-mono text-[#777777] uppercase tracking-widest mt-1">
            COMPLETE YOUR NOVA X
          </p>
        </div>
      </div>

      {/* 2. 4-Stage Stepper Progress Line */}
      <div className="max-w-3xl mx-auto px-6 mb-12">
        <div className="relative flex items-center justify-between">
          {/* Connecting Progress Track */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#DCDCD6] -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-[2px] bg-[#111111] -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${((checkoutStep - 1) / 3) * 100}%` }}
          />

          {STEPS.map((s) => {
            const isCompleted = checkoutStep > s.id;
            const isCurrent = checkoutStep === s.id;
            return (
              <div
                key={s.id}
                className="relative z-10 flex flex-col items-center space-y-1 bg-[#F8F8F5] px-3 cursor-pointer"
                onClick={() => {
                  if (s.id < checkoutStep) {
                    sounds.playClick();
                    setCheckoutStep(s.id);
                  }
                }}
              >
                <div
                  className={`w-7 h-7 rounded-full border flex items-center justify-center font-mono text-xs font-bold transition-all ${
                    isCompleted
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : isCurrent
                      ? 'bg-[#FFFFFF] text-[#111111] border-[#111111] ring-4 ring-[#111111]/10'
                      : 'bg-[#F1F1ED] text-[#777777] border-[#DCDCD6]'
                  }`}
                >
                  {isCompleted ? <Check size={12} /> : s.id}
                </div>
                <span
                  className={`text-[10px] font-mono tracking-wider font-semibold ${
                    isCurrent ? 'text-[#111111]' : 'text-[#777777]'
                  }`}
                >
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Two-Column Architectural Checkout Body (60% / 40%) */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* ==================================================== */}
          {/* LEFT COLUMN: Customer Information & Interactive Steps */}
          {/* ==================================================== */}
          <div className="lg:col-span-7 space-y-8 bg-[#FFFFFF] p-8 md:p-12 rounded-3xl border border-[#DCDCD6] shadow-sm">
            {/* -------------------------------------------------- */}
            {/* STEP 01: CART REVIEW                               */}
            {/* -------------------------------------------------- */}
            {checkoutStep === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono tracking-mega text-[#777777] uppercase font-bold">
                    STEP 01 // SELECTION
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
                    YOUR NOVA X
                  </h3>
                  <p className="text-xs font-mono text-[#777777]">
                    Review your performance configuration before entering shipping details.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#F1F1ED]">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-[#F8F8F5] rounded-2xl border border-[#DCDCD6]"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className="w-16 h-16 rounded-xl border border-black/10 flex items-center justify-center shadow-inner"
                          style={{ backgroundColor: item.colorway.upperColor }}
                        >
                          <div
                            className="w-5 h-5 rounded-full border border-black/20"
                            style={{ backgroundColor: item.colorway.hex }}
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#111111]">{item.name}</h4>
                          <p className="text-xs font-mono text-[#777777]">
                            {item.subtitle} · <span className="font-bold text-[#111111]">{item.size}</span> · QTY {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-sm font-bold text-[#111111]">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-[#F1F1ED] gap-4">
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="text-xs font-mono font-bold text-[#777777] hover:text-[#111111] uppercase tracking-wider"
                  >
                    Edit in Bag →
                  </button>

                  <button
                    onClick={() => {
                      sounds.playClick();
                      setCheckoutStep(2);
                    }}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#111111] hover:bg-black text-white font-mono text-xs font-bold tracking-widest uppercase transition-all shadow-md flex items-center justify-center space-x-2"
                  >
                    <span>CONTINUE TO DETAILS</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* -------------------------------------------------- */}
            {/* STEP 02: CONTACT, DELIVERY & SHIPPING              */}
            {/* -------------------------------------------------- */}
            {checkoutStep === 2 && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono tracking-mega text-[#777777] uppercase font-bold">
                    STEP 02 // LOGISTICS
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black tracking-tight uppercase leading-none">
                    YOUR ORDER <br />
                    IS ALMOST READY.
                  </h3>
                  <p className="text-xs font-mono text-[#777777]">
                    Complete your details and we'll take care of the rest.
                  </p>
                </div>

                {/* Contact Information */}
                <div className="space-y-4 pt-4 border-t border-[#F1F1ED]">
                  <h4 className="text-xs font-mono font-bold text-[#111111] uppercase tracking-wider">
                    CONTACT INFORMATION
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-semibold text-[#777777] uppercase">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className={`w-full bg-[#F8F8F5] border rounded-xl px-4 py-3 text-xs font-mono text-[#111111] focus:outline-none focus:bg-white transition-colors ${
                          errors.email ? 'border-red-500' : 'border-[#DCDCD6] focus:border-[#111111]'
                        }`}
                      />
                      {errors.email && <p className="text-[10px] font-mono text-red-500">{errors.email}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-semibold text-[#777777] uppercase">
                        MOBILE NUMBER *
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className={`w-full bg-[#F8F8F5] border rounded-xl px-4 py-3 text-xs font-mono text-[#111111] focus:outline-none focus:bg-white transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-[#DCDCD6] focus:border-[#111111]'
                        }`}
                      />
                      {errors.phone && <p className="text-[10px] font-mono text-red-500">{errors.phone}</p>}
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="space-y-4 pt-4 border-t border-[#F1F1ED]">
                  <h4 className="text-xs font-mono font-bold text-[#111111] uppercase tracking-wider">
                    DELIVERY ADDRESS
                  </h4>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-semibold text-[#777777] uppercase">
                        FULL LEGAL NAME *
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Arjun Verma"
                        className={`w-full bg-[#F8F8F5] border rounded-xl px-4 py-3 text-xs font-mono text-[#111111] focus:outline-none focus:bg-white transition-colors ${
                          errors.fullName ? 'border-red-500' : 'border-[#DCDCD6] focus:border-[#111111]'
                        }`}
                      />
                      {errors.fullName && <p className="text-[10px] font-mono text-red-500">{errors.fullName}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-[10px] font-mono font-semibold text-[#777777] uppercase">
                          STREET ADDRESS *
                        </label>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Flat 402, Skyline Residency, Linking Road"
                          className={`w-full bg-[#F8F8F5] border rounded-xl px-4 py-3 text-xs font-mono text-[#111111] focus:outline-none focus:bg-white transition-colors ${
                            errors.address ? 'border-red-500' : 'border-[#DCDCD6] focus:border-[#111111]'
                          }`}
                        />
                        {errors.address && <p className="text-[10px] font-mono text-red-500">{errors.address}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-semibold text-[#777777] uppercase">
                          SUITE / LANDMARK
                        </label>
                        <input
                          type="text"
                          value={suite}
                          onChange={(e) => setSuite(e.target.value)}
                          placeholder="Near Bandra West"
                          className="w-full bg-[#F8F8F5] border border-[#DCDCD6] focus:border-[#111111] rounded-xl px-4 py-3 text-xs font-mono text-[#111111] focus:outline-none focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-semibold text-[#777777] uppercase">
                          CITY *
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Mumbai"
                          className={`w-full bg-[#F8F8F5] border rounded-xl px-4 py-3 text-xs font-mono text-[#111111] focus:outline-none focus:bg-white transition-colors ${
                            errors.city ? 'border-red-500' : 'border-[#DCDCD6] focus:border-[#111111]'
                          }`}
                        />
                        {errors.city && <p className="text-[10px] font-mono text-red-500">{errors.city}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-semibold text-[#777777] uppercase">
                          STATE
                        </label>
                        <input
                          type="text"
                          value={stateName}
                          onChange={(e) => setStateName(e.target.value)}
                          placeholder="Maharashtra"
                          className="w-full bg-[#F8F8F5] border border-[#DCDCD6] focus:border-[#111111] rounded-xl px-4 py-3 text-xs font-mono text-[#111111] focus:outline-none focus:bg-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-semibold text-[#777777] uppercase">
                          POSTAL CODE *
                        </label>
                        <input
                          type="text"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          placeholder="400050"
                          className={`w-full bg-[#F8F8F5] border rounded-xl px-4 py-3 text-xs font-mono text-[#111111] focus:outline-none focus:bg-white transition-colors ${
                            errors.postalCode ? 'border-red-500' : 'border-[#DCDCD6] focus:border-[#111111]'
                          }`}
                        />
                        {errors.postalCode && <p className="text-[10px] font-mono text-red-500">{errors.postalCode}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-semibold text-[#777777] uppercase">
                          COUNTRY
                        </label>
                        <input
                          type="text"
                          value={country}
                          readOnly
                          className="w-full bg-[#F1F1ED] border border-[#DCDCD6] rounded-xl px-4 py-3 text-xs font-mono text-[#777777]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Method Cards */}
                <div className="space-y-4 pt-4 border-t border-[#F1F1ED]">
                  <h4 className="text-xs font-mono font-bold text-[#111111] uppercase tracking-wider">
                    SHIPPING METHOD
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => {
                        sounds.playClick();
                        setShippingMethod('standard');
                      }}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between ${
                        shippingMethod === 'standard'
                          ? 'border-[#111111] bg-[#F8F8F5] ring-2 ring-[#111111]/10'
                          : 'border-[#DCDCD6] hover:border-[#777777]'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Truck size={15} className="text-[#111111]" />
                          <span className="font-bold text-xs">STANDARD COURIER</span>
                        </div>
                        <p className="text-[11px] font-mono text-[#777777]">3–5 Business Days</p>
                      </div>
                      <span className="font-mono text-xs font-bold text-emerald-700">FREE</span>
                    </div>

                    <div
                      onClick={() => {
                        sounds.playClick();
                        setShippingMethod('express');
                      }}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between ${
                        shippingMethod === 'express'
                          ? 'border-[#111111] bg-[#F8F8F5] ring-2 ring-[#111111]/10'
                          : 'border-[#DCDCD6] hover:border-[#777777]'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Truck size={15} className="text-purple-600" />
                          <span className="font-bold text-xs">NOVA AIR EXPRESS</span>
                        </div>
                        <p className="text-[11px] font-mono text-[#777777]">1–2 Business Days</p>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#111111]">₹499</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-[#F1F1ED]">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setCheckoutStep(1);
                    }}
                    className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#777777] hover:text-[#111111] uppercase"
                  >
                    <ArrowLeft size={14} />
                    <span>Back to Cart</span>
                  </button>

                  <button
                    onClick={handleProceedToPayment}
                    className="px-8 py-4 rounded-xl bg-[#111111] hover:bg-black text-white font-mono text-xs font-bold tracking-widest uppercase transition-all shadow-md flex items-center space-x-2"
                  >
                    <span>CONTINUE TO PAYMENT</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* -------------------------------------------------- */}
            {/* STEP 03: PAYMENT METHOD SELECTION                  */}
            {/* -------------------------------------------------- */}
            {checkoutStep === 3 && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono tracking-mega text-[#777777] uppercase font-bold">
                    STEP 03 // TRANSACTION
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">
                    ONE LAST STEP.
                  </h3>
                  <p className="text-xs font-mono text-[#777777]">
                    Select your preferred encrypted settlement channel.
                  </p>
                </div>

                {/* Payment Method Selector Tabs */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'upi', label: 'UPI', icon: Smartphone },
                    { id: 'card', label: 'CARD', icon: CreditCard },
                    { id: 'netbanking', label: 'NET BANKING', icon: Building2 },
                  ].map((tab) => {
                    const isSelected = paymentMethod === tab.id;
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          sounds.playClick();
                          setPaymentMethod(tab.id as any);
                        }}
                        className={`p-4 rounded-2xl border flex flex-col items-center space-y-2 transition-all ${
                          isSelected
                            ? 'border-[#111111] bg-[#F8F8F5] text-[#111111] shadow-sm ring-2 ring-[#111111]/10 font-bold'
                            : 'border-[#DCDCD6] text-[#777777] hover:border-[#777777]'
                        }`}
                      >
                        <Icon size={18} />
                        <span className="font-mono text-xs">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* UPI Interface */}
                {paymentMethod === 'upi' && (
                  <div className="space-y-4 p-6 bg-[#F8F8F5] rounded-2xl border border-[#DCDCD6] animate-in fade-in">
                    <span className="text-[10px] font-mono font-bold text-[#777777] uppercase">
                      SELECT INSTANT UPI APP
                    </span>
                    <div className="grid grid-cols-3 gap-3">
                      {['gpay', 'phonepe', 'paytm'].map((app) => (
                        <button
                          key={app}
                          onClick={() => setUpiProvider(app)}
                          className={`py-3 rounded-xl border text-xs font-mono font-bold uppercase transition-all ${
                            upiProvider === app
                              ? 'bg-white border-[#111111] text-[#111111] shadow-sm'
                              : 'bg-transparent border-[#DCDCD6] text-[#777777]'
                          }`}
                        >
                          {app === 'gpay' ? 'Google Pay' : app === 'phonepe' ? 'PhonePe' : 'Paytm'}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-1 pt-2">
                      <label className="text-[10px] font-mono font-semibold text-[#777777] uppercase">
                        OR ENTER UPI ID
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="username@okhdfcbank"
                        className="w-full bg-white border border-[#DCDCD6] focus:border-[#111111] rounded-xl px-4 py-3 text-xs font-mono text-[#111111] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Card Interface */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4 p-6 bg-[#F8F8F5] rounded-2xl border border-[#DCDCD6] animate-in fade-in">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-semibold text-[#777777] uppercase">
                        CARD NUMBER
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4532 •••• •••• 8892"
                        className="w-full bg-white border border-[#DCDCD6] focus:border-[#111111] rounded-xl px-4 py-3 text-xs font-mono text-[#111111] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-semibold text-[#777777] uppercase">
                          EXPIRY (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="08 / 28"
                          className="w-full bg-white border border-[#DCDCD6] focus:border-[#111111] rounded-xl px-4 py-3 text-xs font-mono text-[#111111] focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-semibold text-[#777777] uppercase">
                          SECURITY CODE (CVV)
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          className="w-full bg-white border border-[#DCDCD6] focus:border-[#111111] rounded-xl px-4 py-3 text-xs font-mono text-[#111111] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-semibold text-[#777777] uppercase">
                        NAME ON CARD
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Arjun Verma"
                        className="w-full bg-white border border-[#DCDCD6] focus:border-[#111111] rounded-xl px-4 py-3 text-xs font-mono text-[#111111] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Net Banking Interface */}
                {paymentMethod === 'netbanking' && (
                  <div className="space-y-4 p-6 bg-[#F8F8F5] rounded-2xl border border-[#DCDCD6] animate-in fade-in">
                    <span className="text-[10px] font-mono font-bold text-[#777777] uppercase">
                      SELECT PRIMARY BANK
                    </span>
                    <div className="grid grid-cols-3 gap-3">
                      {['HDFC', 'ICICI', 'SBI', 'Axis', 'Kotak', 'Other'].map((bank) => (
                        <button
                          key={bank}
                          onClick={() => setSelectedBank(bank)}
                          className={`py-3 rounded-xl border text-xs font-mono font-bold transition-all ${
                            selectedBank === bank
                              ? 'bg-white border-[#111111] text-[#111111] shadow-sm'
                              : 'bg-transparent border-[#DCDCD6] text-[#777777]'
                          }`}
                        >
                          {bank}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submit Payment CTA */}
                <div className="space-y-3 pt-4 border-t border-[#F1F1ED]">
                  <button
                    onClick={handlePayNow}
                    disabled={isProcessing}
                    className="w-full py-4 rounded-2xl bg-[#111111] hover:bg-black text-white font-mono text-xs font-bold tracking-widest uppercase transition-all shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span>ENCRYPTING TRANSACTION...</span>
                    ) : (
                      <>
                        <span>PAY ₹{grandTotal.toLocaleString('en-IN')}</span>
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center space-x-2 text-[11px] font-mono text-[#777777] pt-2">
                    <Lock size={13} className="text-emerald-700" />
                    <span>256-BIT TLS ENCRYPTED DIRECT SETTLEMENT</span>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------- */}
            {/* STEP 04: ORDER CONFIRMATION & MILESTONES           */}
            {/* -------------------------------------------------- */}
            {checkoutStep === 4 && completedOrder && (
              <div className="space-y-8 animate-in zoom-in-95 duration-500">
                <div className="space-y-3 text-center sm:text-left">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-xs font-bold">
                    <Check size={14} />
                    <span>ORDER CONFIRMED</span>
                  </div>
                  <h3 className="text-5xl sm:text-6xl font-black tracking-tight uppercase leading-none">
                    YOU'RE <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111111] via-purple-900 to-[#111111]">
                      READY.
                    </span>
                  </h3>
                  <p className="text-sm font-mono text-[#777777]">
                    Your NOVA X is on its way. A copy of the receipt has been sent to {completedOrder.customer.email || 'your email'}.
                  </p>
                </div>

                {/* Milestone Tracker Timeline */}
                <div className="p-6 bg-[#F8F8F5] rounded-2xl border border-[#DCDCD6] space-y-4">
                  <div className="flex justify-between items-center font-mono text-xs">
                    <span className="font-bold text-[#111111]">ORDER {completedOrder.orderId}</span>
                    <span className="text-emerald-700 font-bold">ESTIMATED: 2–4 BUSINESS DAYS</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 pt-2 text-center font-mono text-[10px]">
                    <div className="space-y-1">
                      <div className="w-6 h-6 rounded-full bg-[#111111] text-white flex items-center justify-center mx-auto">
                        <Check size={12} />
                      </div>
                      <span className="font-bold text-[#111111] block">CONFIRMED</span>
                    </div>
                    <div className="space-y-1">
                      <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mx-auto animate-pulse">
                        2
                      </div>
                      <span className="font-bold text-[#111111] block">PREPARING</span>
                    </div>
                    <div className="space-y-1">
                      <div className="w-6 h-6 rounded-full bg-[#DCDCD6] text-[#777777] flex items-center justify-center mx-auto">
                        3
                      </div>
                      <span className="text-[#777777] block">SHIPPED</span>
                    </div>
                    <div className="space-y-1">
                      <div className="w-6 h-6 rounded-full bg-[#DCDCD6] text-[#777777] flex items-center justify-center mx-auto">
                        4
                      </div>
                      <span className="text-[#777777] block">DELIVERED</span>
                    </div>
                  </div>
                </div>

                {/* Final Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[#F1F1ED]">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      setCheckoutStep(1);
                      scrollToCollection();
                    }}
                    className="flex-1 py-4 rounded-xl bg-[#111111] hover:bg-black text-white font-mono text-xs font-bold tracking-widest uppercase transition-all shadow-md flex items-center justify-center space-x-2"
                  >
                    <span>CONTINUE SHOPPING</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    onClick={() => {
                      sounds.playClick();
                      alert(`Viewing Order Details for ${completedOrder.orderId}\nCustomer: ${completedOrder.customer.fullName}\nTotal Paid: ₹${completedOrder.total.toLocaleString('en-IN')}`);
                    }}
                    className="flex-1 py-4 rounded-xl border border-[#111111] bg-transparent hover:bg-[#F8F8F5] text-[#111111] font-mono text-xs font-bold tracking-widest uppercase transition-colors flex items-center justify-center space-x-2"
                  >
                    <PackageCheck size={15} />
                    <span>VIEW ORDER</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ==================================================== */}
          {/* RIGHT COLUMN: Sticky Order Summary                   */}
          {/* ==================================================== */}
          <div className="lg:col-span-5 bg-[#FFFFFF] p-8 md:p-10 rounded-3xl border border-[#DCDCD6] space-y-6 shadow-sm sticky top-24">
            <div className="flex justify-between items-center pb-4 border-b border-[#F1F1ED]">
              <span className="text-xs font-mono font-bold text-[#111111] uppercase tracking-wider">
                ORDER SUMMARY
              </span>
              <span className="text-xs font-mono text-[#777777]">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} ITEMS
              </span>
            </div>

            {/* Product Visual List */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex space-x-4 items-center">
                  <div
                    className="w-16 h-16 rounded-xl border border-black/10 flex items-center justify-center flex-shrink-0 bg-white p-1"
                  >
                    <NikeShoeGraphic colorway={item.colorway} className="w-full h-full" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-xs text-[#111111] truncate">{item.name}</h5>
                    <p className="text-[11px] font-mono text-[#777777]">
                      {item.subtitle} · <span className="font-bold text-[#111111]">{item.size}</span>
                    </p>
                    <p className="text-[11px] font-mono text-[#777777]">QTY: {item.quantity}</p>
                  </div>

                  <span className="font-mono text-xs font-bold text-[#111111]">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Calculations */}
            <div className="space-y-2 font-mono text-xs pt-4 border-t border-[#F1F1ED]">
              <div className="flex justify-between text-[#777777]">
                <span>SUBTOTAL</span>
                <span className="font-bold text-[#111111]">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#777777]">
                <span>ESTIMATED SHIPPING</span>
                <span className="font-bold text-emerald-700">
                  {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                </span>
              </div>
              <div className="flex justify-between text-[#777777]">
                <span>GST / TAXES (18%)</span>
                <span className="font-bold text-[#111111]">₹{taxAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-base font-black text-[#111111] pt-3 border-t border-[#F1F1ED]">
                <span>TOTAL DUE</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Free Shipping Badge */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-[11px] font-mono flex items-center space-x-2">
              <Truck size={14} className="text-emerald-700" />
              <span>COMPLIMENTARY EXPRESS DELIVERY APPLIED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
