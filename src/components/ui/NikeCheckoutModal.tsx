'use client';

import React, { useState } from 'react';
import { useExperience, OrderData } from '@/context/ExperienceContext';
import {
  X,
  CheckCircle2,
  Lock,
  Truck,
  CreditCard,
  QrCode,
  Building2,
  Banknote,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Phone,
  HelpCircle,
  FileText,
  Clock,
} from 'lucide-react';
import { audio } from '@/components/audio/NikeAudioEngine';
import { MiniSneakerCanvas } from './MiniSneakerCanvas';
import { NIKE_UNIVERSES } from '@/data/nikeUniverses';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi NCR', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export const NikeCheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartItems,
    cartTotal,
    clearCart,
    completedOrder,
    setCompletedOrder,
  } = useExperience();

  // Multi-step Checkout: 1 = Shipping Address, 2 = Payment, 3 = Confirmation
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Address Form State
  const [firstName, setFirstName] = useState('Priyanshu');
  const [lastName, setLastName] = useState('Singh');
  const [email, setEmail] = useState('priyanshu@nova.in');
  const [phone, setPhone] = useState('9876543210');
  const [address, setAddress] = useState('Flat 402, High-Tech Horizon Towers');
  const [locality, setLocality] = useState('Bandra West');
  const [city, setCity] = useState('Mumbai');
  const [stateName, setStateName] = useState('Maharashtra');
  const [pincode, setPincode] = useState('400050');

  // Shipping Speed
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

  // Payment Method Selection
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');

  // Specific Payment Details
  const [upiId, setUpiId] = useState('priyanshu@oksbi');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('821');
  const [cardName, setCardName] = useState('PRIYANSHU SINGH');
  const [selectedBank, setSelectedBank] = useState('HDFC');

  // Processing & Verification Animation
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  if (!isCheckoutOpen) return null;

  const shippingCost = shippingMethod === 'express' ? 495 : 0;
  const finalTotal = Math.max(0, cartTotal + shippingCost - discount);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'NOVA2026' || promoCode.trim().toUpperCase() === 'MEMBER10') {
      audio.playChime(880, 'sine', 0.15);
      const disc = Math.round(cartTotal * 0.1);
      setDiscount(disc);
      setPromoApplied(true);
    } else {
      audio.playChime(300, 'sawtooth', 0.1);
      alert('Invalid promo code. Use NOVA2026 for 10% Member discount.');
    }
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    audio.playChime(660, 'sine', 0.1);
    setStep(2);
  };

  const handlePlaceOrder = () => {
    audio.playSonicBlast();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const orderId = `NOVA-IN-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: OrderData = {
        orderId,
        items: [...cartItems],
        subtotal: cartTotal,
        shippingCost,
        tax: Math.round(finalTotal * 0.18),
        total: finalTotal,
        customer: {
          email,
          phone,
          fullName: `${firstName} ${lastName}`,
        },
        shippingAddress: {
          address: `${address}, ${locality}`,
          city,
          state: stateName,
          postalCode: pincode,
          country: 'India',
        },
        shippingMethod,
        paymentMethod: paymentMethod as any,
        createdAt: new Date().toISOString(),
        status: 'confirmed',
      };

      setCompletedOrder(newOrder);
      setStep(3);
    }, 1800);
  };

  const handleClose = () => {
    if (step === 3) {
      clearCart();
      setStep(1);
    }
    setIsCheckoutOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none animate-fade-in"
    >
      <div className="relative w-full max-w-5xl bg-[#ffffff] text-[#111111] rounded-[2.5rem] shadow-2xl border border-[#e5e5e5] overflow-hidden flex flex-col max-h-[95vh]">
        {/* ========================================================= */}
        {/* 1. OFFICIAL NOVA CHECKOUT HEADER                          */}
        {/* ========================================================= */}
        <header className="px-6 sm:px-10 py-4 border-b border-[#e5e5e5] flex items-center justify-between bg-[#ffffff] sticky top-0 z-30">
          {/* Nova Swoosh Brand Logo */}
          <div className="flex items-center space-x-4">
            <svg className="w-14 h-7 fill-[#111111]" viewBox="0 0 24 24">
              <path d="M21.707 5.293c-.201-.2-.472-.3-.748-.284-4.832.28-11.83 3.654-15.69 7.828-2.617 2.827-3.81 5.61-3.272 7.625.56 2.102 2.766 3.125 5.922 2.742 7.747-.94 15.088-8.257 15.088-16.911 0-.353-.139-.691-.3-1zm-14.73 15.6c-2.316.28-3.79-.34-4.14-1.652-.363-1.36.439-3.414 2.37-5.501 3.256-3.522 9.074-6.52 13.407-7.258-1.572 6.643-7.24 13.882-11.637 14.411z" />
            </svg>
            <div className="hidden sm:block border-l border-gray-300 pl-4">
              <span className="font-display text-lg font-black tracking-tight uppercase block leading-none">
                OFFICIAL NOVA CHECKOUT
              </span>
              <span className="text-[10px] font-mono font-semibold text-gray-500">
                100% ENCRYPTED & SECURED
              </span>
            </div>
          </div>

          {/* Checkout Steps Progress Indicator */}
          {step !== 3 && (
            <div className="hidden md:flex items-center space-x-6 text-xs font-mono font-bold">
              <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-[#111111]' : 'text-gray-400'}`}>
                <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center text-[10px]">1</span>
                <span>DELIVERY</span>
              </div>
              <span className="text-gray-300">———</span>
              <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-[#111111]' : 'text-gray-400'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#111111] text-white' : 'bg-gray-200 text-gray-600'}`}>2</span>
                <span>PAYMENT</span>
              </div>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-all active:scale-95"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* ========================================================= */}
        {/* 2. CHECKOUT BODY                                         */}
        {/* ========================================================= */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 flex flex-col lg:flex-row gap-8 bg-[#fafafa]">
          {/* LEFT COLUMN: Checkout Form / Payment Selection */}
          <div className="flex-1 space-y-6">
            {/* -------------------------------------------------- */}
            {/* STEP 1: SHIPPING ADDRESS                           */}
            {/* -------------------------------------------------- */}
            {step === 1 && (
              <form onSubmit={handleProceedToPayment} className="space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e5e5e5] shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <h3 className="font-display text-2xl font-black uppercase text-[#111111]">
                      1. ENTER YOUR NAME & ADDRESS
                    </h3>
                    <span className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      FREE MEMBER DELIVERY
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1.5">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none font-sans text-sm font-medium transition-all"
                        placeholder="First Name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1.5">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none font-sans text-sm font-medium transition-all"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1.5">
                      Address Line 1 (Flat, House No., Building) *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none font-sans text-sm font-medium transition-all"
                      placeholder="e.g. 402, Horizon Towers, Linking Road"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1.5">
                        Locality / Landmark *
                      </label>
                      <input
                        type="text"
                        required
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none font-sans text-sm font-medium transition-all"
                        placeholder="e.g. Near National College"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1.5">
                        Town / City *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none font-sans text-sm font-medium transition-all"
                        placeholder="City (e.g. Mumbai, Delhi, Bengaluru)"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1.5">
                        State / Union Territory *
                      </label>
                      <select
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none font-sans text-sm font-medium transition-all bg-white"
                      >
                        {INDIAN_STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1.5">
                        Postal PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none font-mono text-sm font-bold tracking-widest transition-all"
                        placeholder="e.g. 400050"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1.5">
                        Email Address (for Nova receipt) *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none font-sans text-sm font-medium transition-all"
                        placeholder="name@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1.5">
                        Mobile Phone Number *
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 text-gray-500 font-mono text-xs font-bold">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-r-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none font-mono text-sm font-bold tracking-wider transition-all"
                          placeholder="10-digit number"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Method Option */}
                <div className="bg-white p-6 rounded-3xl border border-[#e5e5e5] shadow-sm space-y-3">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
                    DELIVERY SPEED & METHOD:
                  </h4>

                  <label
                    onClick={() => setShippingMethod('standard')}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      shippingMethod === 'standard'
                        ? 'border-black bg-black/5 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="accent-black"
                      />
                      <div>
                        <span className="font-sans font-bold text-sm text-[#111111] block">
                          Standard Delivery (Arrives in 3–5 Business Days)
                        </span>
                        <span className="text-xs font-mono text-emerald-700 font-semibold">
                          Free for Nova Members
                        </span>
                      </div>
                    </div>
                    <span className="font-sans font-bold text-sm text-emerald-700">FREE</span>
                  </label>

                  <label
                    onClick={() => setShippingMethod('express')}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      shippingMethod === 'express'
                        ? 'border-black bg-black/5 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="accent-black"
                      />
                      <div>
                        <span className="font-sans font-bold text-sm text-[#111111] block">
                          Nova Priority Air Express (Arrives in 1–2 Business Days)
                        </span>
                        <span className="text-xs font-mono text-gray-500">
                          Guaranteed lightning dispatch
                        </span>
                      </div>
                    </div>
                    <span className="font-sans font-bold text-sm text-[#111111]">₹495</span>
                  </label>
                </div>

                {/* Continue to Payment Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#111111] hover:bg-black text-white font-sans font-bold text-sm tracking-widest uppercase transition-all shadow-xl flex items-center justify-center space-x-2 active:scale-98"
                >
                  <span>CONTINUE TO PAYMENT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* -------------------------------------------------- */}
            {/* STEP 2: PAYMENT METHOD (REAL OFFICIAL LOGOS)      */}
            {/* -------------------------------------------------- */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e5e5e5] shadow-sm space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <h3 className="font-display text-2xl font-black uppercase text-[#111111]">
                      2. SELECT PAYMENT METHOD
                    </h3>
                    <span className="text-[11px] font-mono text-gray-500 flex items-center space-x-1">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>256-BIT SSL ENCRYPTED</span>
                    </span>
                  </div>

                  {/* Payment Tabs Selection */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {/* 1. UPI */}
                    <button
                      type="button"
                      onClick={() => {
                        audio.playChime(600, 'sine', 0.08);
                        setPaymentMethod('upi');
                      }}
                      className={`p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2 transition-all ${
                        paymentMethod === 'upi'
                          ? 'border-black bg-black text-white shadow-md scale-105'
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <QrCode className="w-6 h-6" />
                      <span className="font-mono text-xs font-bold uppercase">UPI / QR</span>
                    </button>

                    {/* 2. Credit/Debit Card */}
                    <button
                      type="button"
                      onClick={() => {
                        audio.playChime(640, 'sine', 0.08);
                        setPaymentMethod('card');
                      }}
                      className={`p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-black bg-black text-white shadow-md scale-105'
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <CreditCard className="w-6 h-6" />
                      <span className="font-mono text-xs font-bold uppercase">CARDS</span>
                    </button>

                    {/* 3. Net Banking */}
                    <button
                      type="button"
                      onClick={() => {
                        audio.playChime(680, 'sine', 0.08);
                        setPaymentMethod('netbanking');
                      }}
                      className={`p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2 transition-all ${
                        paymentMethod === 'netbanking'
                          ? 'border-black bg-black text-white shadow-md scale-105'
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <Building2 className="w-6 h-6" />
                      <span className="font-mono text-xs font-bold uppercase">NET BANKING</span>
                    </button>

                    {/* 4. Cash on Delivery */}
                    <button
                      type="button"
                      onClick={() => {
                        audio.playChime(720, 'sine', 0.08);
                        setPaymentMethod('cod');
                      }}
                      className={`p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2 transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-black bg-black text-white shadow-md scale-105'
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <Banknote className="w-6 h-6" />
                      <span className="font-mono text-xs font-bold uppercase">PAY ON DELIVERY</span>
                    </button>
                  </div>

                  {/* ------------------------------------------- */}
                  {/* OPTION A: UPI PAYMENT WITH GATEWAY LOGOS    */}
                  {/* ------------------------------------------- */}
                  {paymentMethod === 'upi' && (
                    <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-gray-800 uppercase">
                          SUPPORTED UPI APPS:
                        </span>
                        {/* Real UPI Gateway Badges */}
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 rounded bg-white text-[10px] font-bold border font-mono shadow-xs text-blue-600">
                            GPay
                          </span>
                          <span className="px-2 py-1 rounded bg-white text-[10px] font-bold border font-mono shadow-xs text-indigo-600">
                            PhonePe
                          </span>
                          <span className="px-2 py-1 rounded bg-white text-[10px] font-bold border font-mono shadow-xs text-cyan-600">
                            Paytm
                          </span>
                          <span className="px-2 py-1 rounded bg-white text-[10px] font-bold border font-mono shadow-xs text-orange-600">
                            BHIM
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1.5">
                          Enter UPI ID / VPA:
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="w-full px-4 py-3 rounded-l-xl border border-gray-300 focus:border-black focus:ring-1 focus:ring-black outline-none font-mono text-sm font-medium bg-white"
                            placeholder="username@bank"
                          />
                          <button
                            type="button"
                            onClick={() => audio.playChime(700, 'sine', 0.1)}
                            className="px-5 py-3 rounded-r-xl bg-[#111111] text-white font-mono text-xs font-bold uppercase hover:bg-black"
                          >
                            VERIFY
                          </button>
                        </div>
                        <span className="text-[11px] font-mono text-emerald-700 font-semibold mt-1 block">
                          ✓ Verified UPI Address: Priyanshu Singh (Instant 0% Convenience Fee)
                        </span>
                      </div>
                    </div>
                  )}

                  {/* ------------------------------------------- */}
                  {/* OPTION B: CREDIT / DEBIT CARDS WITH LOGOS  */}
                  {/* ------------------------------------------- */}
                  {paymentMethod === 'card' && (
                    <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-gray-800 uppercase">
                          CARDS ACCEPTED:
                        </span>
                        {/* Official Card Logos */}
                        <div className="flex items-center space-x-1.5">
                          <span className="px-2 py-0.5 rounded bg-white text-[10px] font-black border font-mono text-blue-800">
                            VISA
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white text-[10px] font-black border font-mono text-red-600">
                            Mastercard
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white text-[10px] font-black border font-mono text-green-700">
                            RuPay
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white text-[10px] font-black border font-mono text-blue-500">
                            Amex
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1.5">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black outline-none font-mono text-sm font-bold bg-white"
                          placeholder="4532 0000 0000 0000"
                        />
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1.5">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black outline-none font-mono text-sm bg-white"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1.5">
                            CVV / CVC
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black outline-none font-mono text-sm bg-white"
                            placeholder="•••"
                          />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1.5">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-black outline-none font-sans text-sm uppercase bg-white font-bold"
                            placeholder="Name"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ------------------------------------------- */}
                  {/* OPTION C: NET BANKING (MAJOR INDIAN BANKS) */}
                  {/* ------------------------------------------- */}
                  {paymentMethod === 'netbanking' && (
                    <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4 animate-fade-in">
                      <span className="font-mono text-xs font-bold text-gray-800 uppercase block">
                        POPULAR INDIAN BANKS:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National'].map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setSelectedBank(b)}
                            className={`p-3 rounded-xl border text-left font-sans text-xs font-bold transition-all ${
                              selectedBank === b
                                ? 'border-black bg-black text-white shadow-xs'
                                : 'border-gray-200 bg-white text-gray-800 hover:border-gray-400'
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ------------------------------------------- */}
                  {/* OPTION D: CASH ON DELIVERY                 */}
                  {/* ------------------------------------------- */}
                  {paymentMethod === 'cod' && (
                    <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3 animate-fade-in">
                      <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>Cash On Delivery is Available for PIN {pincode}</span>
                      </div>
                      <p className="text-xs font-mono text-gray-600">
                        Pay by Cash or scan the delivery agent&apos;s UPI QR code upon receipt. An OTP will be sent to +91 {phone} for verification.
                      </p>
                    </div>
                  )}
                </div>

                {/* Back to Address & Place Order Button */}
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-4 rounded-2xl border border-gray-300 font-sans font-bold text-xs uppercase hover:bg-gray-100 transition-all"
                  >
                    ← BACK
                  </button>

                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex-1 py-4 rounded-2xl bg-[#111111] hover:bg-black text-white font-sans font-bold text-sm tracking-widest uppercase transition-all shadow-xl flex items-center justify-center space-x-2 active:scale-98"
                  >
                    {isProcessing ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>AUTHORIZING PAYMENT WITH NOVA GATEWAY...</span>
                      </div>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-emerald-400" />
                        <span>PLACE ORDER & PAY ₹{finalTotal.toLocaleString('en-IN')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* -------------------------------------------------- */}
            {/* STEP 3: ORDER SUCCESS CONFIRMATION                 */}
            {/* -------------------------------------------------- */}
            {step === 3 && completedOrder && (
              <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#e5e5e5] shadow-sm space-y-6 text-center animate-fade-in">
                {/* Success Swoosh Animation */}
                <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border-2 border-emerald-300 shadow-lg animate-bounce">
                  <CheckCircle2 className="w-12 h-12" />
                </div>

                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 uppercase block mb-1">
                    PAYMENT AUTHORIZED & VERIFIED
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-[#111111]">
                    THANK YOU FOR YOUR ORDER!
                  </h2>
                  <p className="text-xs font-mono text-gray-500 mt-2">
                    Order ID: <span className="font-bold text-[#111111]">{completedOrder.orderId}</span>
                  </p>
                  <p className="text-xs font-sans text-gray-600 max-w-md mx-auto mt-1">
                    A confirmation email and GST tax invoice have been dispatched to <span className="font-bold">{completedOrder.customer.email}</span>.
                  </p>
                </div>

                {/* Delivery Timeline Tracker */}
                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 text-left space-y-4 max-w-lg mx-auto">
                  <span className="font-mono text-xs font-bold text-gray-800 uppercase block">
                    LIVE DISPATCH TRACKING:
                  </span>
                  <div className="space-y-3 text-xs font-mono">
                    <div className="flex items-center space-x-3 text-emerald-700 font-bold">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                      <span>ORDER PLACED & PAYMENT CAPTURED (Just now)</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                      <span>PACKING AT NOVA CENTRAL FULFILMENT HUB</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                      <span>DISPATCH VIA BLUEDART AIR (Tracking #BD-889127)</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                      <span>ESTIMATED DELIVERY: IN 3 BUSINESS DAYS</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <button
                    onClick={() => {
                      audio.playChime(750, 'sine', 0.1);
                      alert(`Invoice PDF for Order ${completedOrder.orderId} downloaded.`);
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl border border-gray-300 font-sans font-bold text-xs uppercase flex items-center justify-center space-x-2 hover:bg-gray-50"
                  >
                    <FileText className="w-4 h-4" />
                    <span>DOWNLOAD TAX INVOICE</span>
                  </button>

                  <button
                    onClick={handleClose}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#111111] hover:bg-black text-white font-sans font-bold text-xs tracking-widest uppercase transition-all shadow-lg"
                  >
                    CONTINUE EXPLORING SHOWCASE
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: STICKY ORDER SUMMARY */}
          {step !== 3 && (
            <div className="w-full lg:w-96 space-y-5">
              <div className="bg-white p-6 rounded-3xl border border-[#e5e5e5] shadow-sm space-y-4 sticky top-20">
                <h4 className="font-display text-xl font-black uppercase text-[#111111] border-b pb-3">
                  ORDER SUMMARY ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                </h4>

                {/* Items Mini List with 3D Preview */}
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {cartItems.map((item) => {
                    const matchedUniverse = NIKE_UNIVERSES.find((u) => u.id === item.id.split('-')[0]) || NIKE_UNIVERSES[0];
                    return (
                      <div key={item.id} className="flex items-center space-x-3 p-2.5 rounded-2xl bg-gray-50 border border-gray-100">
                        <div className="w-14 h-14 rounded-xl bg-white border flex items-center justify-center overflow-hidden flex-shrink-0">
                          <MiniSneakerCanvas universe={matchedUniverse} heightClass="h-14" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-display text-sm font-black text-[#111111] truncate uppercase">
                            {item.name}
                          </h5>
                          <span className="text-[10px] font-mono text-gray-500 block">
                            Size: {item.size} • Qty: {item.quantity}
                          </span>
                          <span className="font-sans text-xs font-bold text-[#111111] block mt-0.5">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Promo Code Input */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="PROMO CODE (e.g. NOVA2026)"
                      className="flex-1 px-3.5 py-2 rounded-xl border border-gray-200 font-mono text-xs uppercase outline-none focus:border-black"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#111111] font-mono text-xs font-bold uppercase transition-colors"
                    >
                      APPLY
                    </button>
                  </div>
                  {promoApplied && (
                    <span className="text-[10px] font-mono text-emerald-700 font-bold mt-1 block">
                      ✓ 10% Member Discount Applied (-₹{discount.toLocaleString('en-IN')})
                    </span>
                  )}
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-2 pt-3 border-t border-gray-100 text-xs font-mono">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#111111]">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Estimated Delivery</span>
                    <span className="font-bold text-emerald-700">
                      {shippingMethod === 'express' ? '₹495' : 'FREE'}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Promo Discount</span>
                      <span>-₹{discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>GST (18% inclusive)</span>
                    <span className="font-bold text-[#111111]">
                      ₹{Math.round(finalTotal * 0.18).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-black text-[#111111] pt-2 border-t border-gray-200 font-sans">
                    <span>TOTAL</span>
                    <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Guarantee Note */}
                <div className="flex items-center space-x-2 text-[10px] font-mono text-gray-500 pt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>30-Day Free Return & Exchange Policy</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
