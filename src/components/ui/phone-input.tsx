"use client";

import React from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { cn } from "@/src/lib/utils";

interface CustomPhoneInputProps {
  value: string;
  onChange: (value: string | undefined) => void;
  className?: string;
  placeholder?: string;
  required?: boolean;
}

export function SmartPhoneInput({ value, onChange, className, placeholder, required }: CustomPhoneInputProps) {
  return (
    <div className={cn("phone-input-container", className)}>
      <PhoneInput
        international
        defaultCountry="SA"
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Enter phone number"}
        required={required}
        className="premium-phone-input"
      />
      <style jsx global>{`
        .premium-phone-input {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          height: 3.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid #006C35;
          border-radius: 1rem;
          padding: 0 1.5rem;
          color: white;
          transition: all 0.3s ease;
        }

        .premium-phone-input:focus-within {
          background: rgba(255, 255, 255, 0.1);
          border-color: #006C35;
          box-shadow: 0 0 0 1px #006C35;
        }

        .premium-phone-input input {
          flex: 1;
          background: transparent !important;
          border: none !important;
          outline: none !important;
          color: white !important;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .premium-phone-input input::placeholder {
          color: #006C35;
        }

        /* --- Global Country Dropdown Fix --- */
        .PhoneInputCountry {
          margin-right: 0 !important;
          display: flex;
          align-items: center;
        }

        /* Fixing the white-on-white dropdown text */
        .PhoneInputCountrySelect {
          background: #0f172a !important; /* Dark background for the native select */
          color: white !important;
          border: none;
          outline: none;
        }

        /* Styling for the native select options */
        .PhoneInputCountrySelect option {
          background: #0f172a !important;
          color: white !important;
        }

        .PhoneInputCountrySelectArrow {
          color: rgba(255, 255, 255, 0.3);
          margin-left: 4px;
          opacity: 0.5;
        }

        /* Light mode variants for Admin/Contact/QuickRequest */
        .light-phone-input .premium-phone-input {
          background: #f8fafc;
          border-color: #f1f5f9;
          color: #0f172a;
        }

        .light-phone-input .premium-phone-input input {
          color: #0f172a !important;
        }

        .light-phone-input .premium-phone-input input::placeholder {
          color: #94a3b8;
        }

        .light-phone-input .PhoneInputCountrySelect {
          background: white !important;
          color: #0f172a !important;
        }

        .light-phone-input .PhoneInputCountrySelect option {
          background: white !important;
          color: #0f172a !important;
        }

        .light-phone-input .PhoneInputCountrySelectArrow {
          color: #94a3b8;
        }

        .light-phone-input .premium-phone-input:focus-within {
          background: white;
          border-color: rgba(138, 21, 56, 0.2);
        }
      `}</style>
    </div>
  );
}
