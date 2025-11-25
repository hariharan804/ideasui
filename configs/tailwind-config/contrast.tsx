import React, { useState } from 'react';

export default function ContrastChecker() {
  const [results, setResults] = useState([]);

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null;
  };

  const getLuminance = (hex) => {
    const rgb = hexToRgb(hex);
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(val => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const getContrastRatio = (hex1, hex2) => {
    const lum1 = getLuminance(hex1);
    const lum2 = getLuminance(hex2);
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
  };

  const checkWCAG = (ratio) => {
    const r = parseFloat(ratio);
    return {
      aaa: r >= 7 ? '✅ PASS' : '❌ FAIL',
      aa: r >= 4.5 ? '✅ PASS' : '❌ FAIL',
      largeAa: r >= 3 ? '✅ PASS' : '❌ FAIL',
    };
  };

  const testColors = () => {
    const colors = {
      Primary: {
        50: '#faf7fd', 500: '#861afd', 600: '#610fbb', 700: '#480890',
      },
      Secondary: {
        50: '#fafcf8', 500: '#9df33e', 600: '#77d311', 700: '#5da909',
      },
      Success: {
        50: '#f7fcf9', 500: '#0fef59', 600: '#0da540', 700: '#06792c',
      },
      Warning: {
        50: '#fdfaf7', 500: '#fda933', 600: '#d28211', 700: '#a86609',
      },
      Error: {
        50: '#fcf7f7', 500: '#f72020', 600: '#bb0f0f', 700: '#900808',
      },
      Info: {
        50: '#f8f9fc', 500: '#266af1', 600: '#0f49bb', 700: '#083590',
      },
    };

    const neutralBg = '#fafafa';
    const neutralBgDark = '#0a080c';
    const testResults = [];

    Object.entries(colors).forEach(([family, shades]) => {
      Object.entries(shades).forEach(([level, hex]) => {
        // Test on light background
        const ratioLight = getContrastRatio(hex, neutralBg);
        const wcagLight = checkWCAG(ratioLight);

        // Test on dark background
        const ratioDark = getContrastRatio(hex, neutralBgDark);
        const wcagDark = checkWCAG(ratioDark);

        testResults.push({
          family,
          level,
          hex,
          light: {
            ratio: ratioLight,
            ...wcagLight,
          },
          dark: {
            ratio: ratioDark,
            ...wcagDark,
          },
        });
      });
    });

    setResults(testResults);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Contrast Ratio Checker</h1>
        <p className="text-gray-600 mb-6">
          Tests all colors against light (#fafafa) and dark (#0a080c) backgrounds
        </p>

        <button
          onClick={testColors}
          className="mb-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
        >
          Calculate Contrast Ratios
        </button>

        {results.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow">
              <thead className="bg-gray-100 border-b-2 border-gray-300">
                <tr>
                  <th className="p-3 text-left font-semibold text-gray-900">Family</th>
                  <th className="p-3 text-left font-semibold text-gray-900">Level</th>
                  <th className="p-3 text-left font-semibold text-gray-900">Color</th>
                  <th className="p-3 text-center font-semibold text-gray-900 bg-blue-50">Light BG Ratio</th>
                  <th className="p-3 text-center font-semibold text-gray-900 bg-blue-50">AA (4.5:1)</th>
                  <th className="p-3 text-center font-semibold text-gray-900 bg-blue-50">AAA (7:1)</th>
                  <th className="p-3 text-center font-semibold text-gray-900 bg-gray-900 text-white">Dark BG Ratio</th>
                  <th className="p-3 text-center font-semibold text-gray-900 bg-gray-900 text-white">AA (4.5:1)</th>
                  <th className="p-3 text-center font-semibold text-gray-900 bg-gray-900 text-white">AAA (7:1)</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, idx) => (
                  <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3 font-semibold text-gray-900">{result.family}</td>
                    <td className="p-3 text-gray-700">{result.level}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded border border-gray-300"
                          style={{ backgroundColor: result.hex }}
                        />
                        <code className="text-sm text-gray-600">{result.hex}</code>
                      </div>
                    </td>
                    <td className="p-3 text-center font-semibold text-gray-900">{result.light.ratio}:1</td>
                    <td className="p-3 text-center text-sm">{result.light.aa}</td>
                    <td className="p-3 text-center text-sm">{result.light.aaa}</td>
                    <td className="p-3 text-center font-semibold text-gray-900 bg-gray-50">{result.dark.ratio}:1</td>
                    <td className="p-3 text-center text-sm bg-gray-50">{result.dark.aa}</td>
                    <td className="p-3 text-center text-sm bg-gray-50">{result.dark.aaa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <h3 className="font-semibold text-blue-900 mb-2">WCAG Standards:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li><strong>Large Text (18pt+):</strong> AA = 3:1, AAA = 4.5:1</li>
            <li><strong>Normal Text:</strong> AA = 4.5:1, AAA = 7:1</li>
            <li><strong>UI Components:</strong> AA = 3:1</li>
          </ul>
        </div>
      </div>
    </div>
  );
}