'use client';

import { useState } from 'react';
import { InputField, Button } from '@ideasui/react';
import { Minus, Plus, Eye, EyeOff, Search, X } from 'lucide-react';

export function InputNumberButtons() {
  const [quantity, setQuantity] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      {/* Number Input with Stepper Controls */}
      <InputField>
        <InputField.Label>Quantity Stepper (Number Input)</InputField.Label>
        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            aria-label="Decrease quantity"
            isDisabled={quantity <= 1}
            size="md"
            variant="outline"
            onClick={decrement}
          >
            <Minus className="h-4 w-4" />
          </Button>

          <InputField.Input
            className="w-14"
            inputClassName="text-center"
            min={1}
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value) || 1)}
          />

          <Button
            isIconOnly
            aria-label="Increase quantity"
            size="md"
            variant="outline"
            onClick={increment}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <InputField.Description>
          Interactive number stepper combining InputField type=&quot;number&quot; with stepper
          buttons.
        </InputField.Description>
      </InputField>

      {/* Password Input with Show/Hide Button */}
      <InputField>
        <InputField.Label>Password</InputField.Label>
        <InputField.Input
          endContent={
            <button
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="text-content-tertiary hover:text-content-primary transition-colors focus:outline-none"
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
          placeholder="Enter password"
          type={showPassword ? 'text' : 'password'}
        />
        <InputField.Description>
          Toggle password visibility with an action button inside endContent.
        </InputField.Description>
      </InputField>

      {/* Search Input with Clear Icon & Action Button */}
      <InputField>
        <InputField.Label>Search</InputField.Label>
        <InputField.Input
          endContent={
            <div className="-mr-1.5 flex items-center gap-1.5">
              {Boolean(searchQuery) && (
                <button
                  aria-label="Clear search text"
                  className="text-content-tertiary hover:text-content-primary p-1 transition-colors focus:outline-none"
                  type="button"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <Button aria-label="Search" color="primary" size="sm" variant="solid">
                <Search className="h-3.5 w-3.5" />
              </Button>
            </div>
          }
          placeholder="Search documentation..."
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <InputField.Description>
          Integrated clear icon (X) and search action button.
        </InputField.Description>
      </InputField>
    </div>
  );
}
