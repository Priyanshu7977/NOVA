'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useExperience } from '@/context/ExperienceContext';
import {
  Lock,
  Truck,
  CreditCard,
  QrCode,
  Building2,
  Banknote,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  ChevronLeft,
} from 'lucide-react';
import { MiniSneakerCanvas } from '@/components/ui/MiniSneakerCanvas';
import { NIKE_UNIVERSES } from '@/data/nikeUniverses';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi NCR', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useExperience();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [firstName, setFirstName] = useState('Priyanshu');
  const [lastName, setLastName] = useState('Singh');
  const [email, setEmail] = useState('priyanshu@nova.in');
  const [phone, setPhone] = useState('9876543210');
  const [address, setAddress] = useState('402, Horizon Towers, Linking Road');
  const [locality, setLocality] = useState('Bandra West');
  const [city, setCity] = useState('Mumbai');
  const [stateName, setStateName] = useState('Maharashtra');
  const [pincode, setPincode] = useState('400050');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('priyanshu@oksbi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrderId, setCompletedOrderId] = useState('');

  const shippingCost = shippingMethod === 'express' ? 495 : 0;
  const finalTotal = cartTotal + shippingCost;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCompletedOrderId(`NOVA-IN-${Math.floor(100000 + Math.random() * 900000)}`);
      setStep(3);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111111] font-sans antialiased">
      {/* Official Nova Header */}
      <header className="bg-white border-b border-gray-200 px-6 sm:px-12 py-4 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <svg className="w-16 h-8 fill-[#111111]" viewBox="0 0 24 24">
              <path d="M21.707 5.293c-.201-.2-.472-.3-.748-.284-4.832.28-11.83 3.654-15.69 7.828-2.617 2.827-3.81 5.61-3.272 7.625.56 2.102 2.766 3.125 5.922 2.742 7.747-.94 15.088-8.257 15.088-16.911 0-.353-.139-.691-.3-1zm-14.73 15.6c-2.316.28-3.79-.34-4.14-1.652-.363-1.36.439-3.414 2.37-5.501 3.256-3.522 9.074-6.52 13.407-7.258-1.572 6.643-7.24 13.882-11.637 14.411z" />
            </svg>
          </Link>
          <div className="border-l border-gray-200 pl-6 hidden sm:block">
            <span className="font-display text-xl font-black uppercase block tracking-tight">
              OFFICIAL NOVA CHECKOUT
            </span>
            <span className="text-[10px] font-mono text-gray-500 font-semibold">
              100% ENCRYPTED & VERIFIED GATEWAY
            </span>
          </div>
        </div>

        <Link
          href="/"
          className="flex items-center space-x-1 font-mono text-xs font-bold text-gray-600 hover:text-black uppercase"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>RETURN TO SHOWCASE</span>
        </Link>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col lg:flex-row gap-8">
        {/* LEFT COLUMN: Form Steps */}
        <div className="flex-1 space-y-6">
          {step === 1 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h2 className="font-display text-2xl font-black uppercase text-[#111111]">
                  1. DELIVERY ADDRESS
                </h2>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  FREE MEMBER SHIPPING
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-black font-medium text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-black font-medium text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-gray-700 mb-1">
                  Address Line 1 (Flat, House No., Street) *
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-black font-medium text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-gray-700 mb-1">
                    Locality / Landmark *
                  </label>
                  <input
                    type="text"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-black font-medium text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-black font-medium text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-gray-700 mb-1">
                    State *
                  </label>
                  <select
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-black font-medium text-sm bg-white"
                  >
                    {INDIAN_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-gray-700 mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-black font-mono font-bold text-sm tracking-wider"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-4 rounded-2xl bg-[#111111] hover:bg-black text-white font-sans font-bold text-sm tracking-widest uppercase transition-all shadow-xl flex items-center justify-center space-x-2"
              >
                <span>CONTINUE TO PAYMENT METHOD</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h2 className="font-display text-2xl font-black uppercase text-[#111111]">
                  2. PAYMENT GATEWAY
                </h2>
                <span className="text-xs font-mono text-gray-500 flex items-center space-x-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-BIT SSL ENCRYPTED</span>
                </span>
              </div>

              {/* Payment Tabs Selection */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2 transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-black bg-black text-white shadow-md'
                      : 'border-gray-200 bg-gray-50 text-gray-700'
                  }`}
                >
                  <QrCode className="w-6 h-6" />
                  <span className="font-mono text-xs font-bold uppercase">UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-black bg-black text-white shadow-md'
                      : 'border-gray-200 bg-gray-50 text-gray-700'
                  }`}
                >
                  <CreditCard className="w-6 h-6" />
                  <span className="font-mono text-xs font-bold uppercase">CARDS</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2 transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'border-black bg-black text-white shadow-md'
                      : 'border-gray-200 bg-gray-50 text-gray-700'
                  }`}
                >
                  <Building2 className="w-6 h-6" />
                  <span className="font-mono text-xs font-bold uppercase">NET BANKING</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-2xl border text-center flex flex-col items-center justify-center space-y-2 transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-black bg-black text-white shadow-md'
                      : 'border-gray-200 bg-gray-50 text-gray-700'
                  }`}
                >
                  <Banknote className="w-6 h-6" />
                  <span className="font-mono text-xs font-bold uppercase">PAY ON DELIVERY</span>
                </button>
              </div>

              {/* Supported Gateway Logos */}
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-gray-700 uppercase">
                    SUPPORTED GATEWAYS:
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded bg-white text-[11px] font-bold border font-mono text-blue-600">
                      GPay
                    </span>
                    <span className="px-2.5 py-1 rounded bg-white text-[11px] font-bold border font-mono text-indigo-600">
                      PhonePe
                    </span>
                    <span className="px-2.5 py-1 rounded bg-white text-[11px] font-bold border font-mono text-cyan-600">
                      Paytm
                    </span>
                    <span className="px-2.5 py-1 rounded bg-white text-[11px] font-bold border font-mono text-blue-900">
                      VISA
                    </span>
                    <span className="px-2.5 py-1 rounded bg-white text-[11px] font-bold border font-mono text-red-600">
                      Mastercard
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-gray-700 mb-1">
                    Enter UPI ID / VPA:
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 font-mono text-sm font-bold bg-white"
                  />
                  <span className="text-[11px] font-mono text-emerald-700 font-bold block mt-1">
                    ✓ Verified UPI Gateway ID
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-4 rounded-2xl border border-gray-300 font-sans font-bold text-xs uppercase hover:bg-gray-100"
                >
                  ← BACK
                </button>
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="flex-1 py-4 rounded-2xl bg-[#111111] hover:bg-black text-white font-sans font-bold text-sm tracking-widest uppercase transition-all shadow-xl flex items-center justify-center space-x-2"
                >
                  {isProcessing ? (
                    <span>PROCESSING SECURE PAYMENT...</span>
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

          {step === 3 && (
            <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-xs text-center space-y-6 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border-2 border-emerald-300 shadow-lg">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 uppercase block mb-1">
                  PAYMENT AUTHORIZED & VERIFIED
                </span>
                <h2 className="font-display text-4xl font-black uppercase text-[#111111]">
                  THANK YOU FOR YOUR ORDER!
                </h2>
                <p className="text-xs font-mono text-gray-500 mt-2">
                  Order ID: <span className="font-bold text-[#111111]">{completedOrderId}</span>
                </p>
              </div>

              <Link
                href="/"
                onClick={() => clearCart()}
                className="inline-block px-8 py-4 rounded-2xl bg-[#111111] text-white font-sans font-bold text-xs tracking-widest uppercase shadow-lg hover:bg-black transition-all"
              >
                RETURN TO NOVA SHOWCASE
              </Link>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Order Summary */}
        <div className="w-full lg:w-96 space-y-5">
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-4 sticky top-24">
            <h3 className="font-display text-xl font-black uppercase text-[#111111] border-b pb-3">
              IN YOUR BAG ({cartItems.reduce((s, i) => s + i.quantity, 0)})
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {cartItems.map((item) => {
                const matchedUniverse = NIKE_UNIVERSES.find((u) => u.id === item.id.split('-')[0]) || NIKE_UNIVERSES[0];
                return (
                  <div key={item.id} className="flex items-center space-x-3 p-2.5 rounded-2xl bg-gray-50 border">
                    <div className="w-14 h-14 rounded-xl bg-white border flex items-center justify-center overflow-hidden flex-shrink-0">
                      <MiniSneakerCanvas universe={matchedUniverse} heightClass="h-14" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-sm font-black uppercase text-[#111111] truncate">
                        {item.name}
                      </h4>
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

            <div className="space-y-2 pt-3 border-t border-gray-100 text-xs font-mono">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold text-[#111111]">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Delivery</span>
                <span className="font-bold text-emerald-700">FREE</span>
              </div>
              <div className="flex justify-between text-base font-black text-[#111111] pt-2 border-t font-sans">
                <span>TOTAL</span>
                <span>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
