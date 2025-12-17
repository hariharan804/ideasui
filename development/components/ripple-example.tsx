import React from "react";
import {Ripple} from "@ideasui/ripple";

export function RippleExample() {
  return (
    <div className="space-y-8 p-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Ripple Component Examples</h2>
        <p className="text-gray-600">
          Click on any of the examples below to see the ripple effect in action.
        </p>
      </div>

      {/* Basic Variants */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Variants</h3>
        <div className="flex gap-4">
          <Ripple variant="solid">Solid</Ripple>
          <Ripple variant="outline">Outline</Ripple>
          <Ripple variant="ghost">Ghost</Ripple>
        </div>
      </section>

      {/* Colors */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Colors</h3>
        <div className="flex flex-wrap gap-4">
          <Ripple color="primary">Primary</Ripple>
          <Ripple color="secondary">Secondary</Ripple>
          <Ripple color="success">Success</Ripple>
          <Ripple color="warning">Warning</Ripple>
          <Ripple color="danger">Danger</Ripple>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Sizes</h3>
        <div className="flex items-center gap-4">
          <Ripple size="xs">XS</Ripple>
          <Ripple size="sm">SM</Ripple>
          <Ripple size="md">MD</Ripple>
          <Ripple size="lg">LG</Ripple>
          <Ripple size="xl">XL</Ripple>
        </div>
      </section>

      {/* Custom Ripple Effects */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Custom Effects</h3>
        <div className="flex gap-4">
          <Ripple rippleColor="#ff6b6b" variant="outline">
            Custom Color
          </Ripple>
          <Ripple center>Center Ripple</Ripple>
          <Ripple duration={1200}>Slow Animation</Ripple>
          <Ripple duration={300}>Fast Animation</Ripple>
        </div>
      </section>

      {/* Interactive Examples */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive</h3>
        <div className="flex gap-4">
          <Ripple color="primary" onClick={() => alert("Primary action triggered!")}>
            Primary Action
          </Ripple>
          <Ripple
            color="secondary"
            variant="outline"
            onClick={() => console.log("Secondary action")}
          >
            Secondary Action
          </Ripple>
          <Ripple color="success" variant="ghost" onClick={() => alert("Success!")}>
            Success Action
          </Ripple>
        </div>
      </section>

      {/* Disabled State */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">States</h3>
        <div className="flex gap-4">
          <Ripple>Normal</Ripple>
          <Ripple disabled>Disabled</Ripple>
        </div>
      </section>

      {/* With Icons */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">With Content</h3>
        <div className="flex gap-4">
          <Ripple className="gap-2">
            <span>❤️</span>
            Like
          </Ripple>
          <Ripple className="gap-2" variant="outline">
            <span>📤</span>
            Share
          </Ripple>
          <Ripple className="gap-2" variant="ghost">
            <span>💬</span>
            Comment
          </Ripple>
        </div>
      </section>
    </div>
  );
}

export default RippleExample;
