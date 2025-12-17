"use client";

import type {PropConfig} from "../lib/component-registry";

import {useState, createElement} from "react";

import {componentRegistry, getComponentNames} from "../lib/component-registry";

export default function DynamicPlayground() {
  const [selectedComponent, setSelectedComponent] = useState(getComponentNames()[0]);
  const [props, setProps] = useState<Record<string, any>>(() => {
    const config = componentRegistry[getComponentNames()[0]];

    return Object.entries(config.props).reduce(
      (acc, [key, propConfig]) => {
        acc[key] = propConfig.defaultValue;

        return acc;
      },
      {} as Record<string, any>,
    );
  });

  const handleComponentChange = (componentName: string) => {
    setSelectedComponent(componentName);
    const config = componentRegistry[componentName];
    const newProps = Object.entries(config.props).reduce(
      (acc, [key, propConfig]) => {
        acc[key] = propConfig.defaultValue;

        return acc;
      },
      {} as Record<string, any>,
    );

    setProps(newProps);
  };

  const handlePropChange = (propName: string, value: any) => {
    setProps((prev) => ({...prev, [propName]: value}));
  };

  const renderPropControl = (propName: string, propConfig: PropConfig) => {
    switch (propConfig.type) {
      case "select":
        return (
          <select
            className="w-full rounded border p-2"
            value={props[propName]}
            onChange={(e) => handlePropChange(propName, e.target.value)}
          >
            {propConfig.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "boolean":
        return (
          <input
            checked={props[propName]}
            className="mr-2"
            type="checkbox"
            onChange={(e) => handlePropChange(propName, e.target.checked)}
          />
        );
      case "string":
        return (
          <input
            className="w-full rounded border p-2"
            type="text"
            value={props[propName]}
            onChange={(e) => handlePropChange(propName, e.target.value)}
          />
        );
      case "number":
        return (
          <input
            className="w-full rounded border p-2"
            type="number"
            value={props[propName]}
            onChange={(e) => handlePropChange(propName, Number(e.target.value))}
          />
        );
      default:
        return null;
    }
  };

  const config = componentRegistry[selectedComponent];
  const Component = config.component;

  return (
    <div className="space-y-8 p-8">
      <h1 className="text-3xl font-bold">Dynamic Component Playground</h1>

      {/* Component Selector */}
      <div>
        <label className="mb-2 block text-sm font-medium">Component</label>
        <select
          className="rounded border p-2"
          value={selectedComponent}
          onChange={(e) => handleComponentChange(e.target.value)}
        >
          {getComponentNames().map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">{selectedComponent} Component</h2>

        {/* Dynamic Controls */}
        <div className="grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-3">
          {Object.entries(config.props).map(([propName, propConfig]) => (
            <div key={propName}>
              <label className="mb-2 block text-sm font-medium">{propConfig.label}</label>
              {renderPropControl(propName, propConfig)}
            </div>
          ))}
        </div>

        {/* Preview */}
        <div className="rounded-lg border bg-gray-50 p-8">
          <h3 className="mb-4 text-lg font-medium">Preview</h3>
          {createElement(
            Component,
            {...props, onClick: () => alert(`${selectedComponent} clicked!`)},
            config.defaultChildren,
          )}
        </div>

        {/* Code */}
        <div className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-green-400">
          <pre className="text-sm">
            {`<${selectedComponent}${Object.entries(props)
              .map(([key, value]) => {
                if (typeof value === "boolean") {
                  return value ? `\n  ${key}` : "";
                }

                return `\n  ${key}="${value}"`;
              })
              .join("")}
  onClick={() => alert('${selectedComponent} clicked!')}
>
  ${config.defaultChildren}
</${selectedComponent}>`}
          </pre>
        </div>
      </div>
    </div>
  );
}
