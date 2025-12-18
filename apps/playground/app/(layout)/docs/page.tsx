"use client";

import {useState, useEffect, useMemo} from "react";
import {FileText, Book, ExternalLink, Search} from "lucide-react";

interface DocFile {
  name: string;
  path: string;
  description: string;
}

const DOC_FILES: DocFile[] = [
  {name: "README.md", path: "../../README.md", description: "Main project documentation"},
  {
    name: "SETUP_CHECKLIST.md",
    path: "../../SETUP_CHECKLIST.md",
    description: "Complete setup guide",
  },
  {
    name: "CONTRIBUTING.md",
    path: "../../docs/CONTRIBUTING.md",
    description: "Contribution guidelines",
  },
  {
    name: "COMPONENT_GUIDELINES.md",
    path: "../../docs/COMPONENT_GUIDELINES.md",
    description: "Component development standards",
  },
  {
    name: "NAMING_CONVENTIONS.md",
    path: "../../docs/NAMING_CONVENTIONS.md",
    description: "Naming rules and cases",
  },
  {
    name: "TESTING_STRATEGY.md",
    path: "../../docs/TESTING_STRATEGY.md",
    description: "Quality assurance guide",
  },
  {
    name: "BUILD_DEPLOYMENT.md",
    path: "../../docs/BUILD_DEPLOYMENT.md",
    description: "Release process",
  },
  {
    name: "API_DOCUMENTATION.md",
    path: "../../docs/API_DOCUMENTATION.md",
    description: "Component reference",
  },
];

export default function DocsPage() {
  const [selectedDoc, setSelectedDoc] = useState<string>("README.md");
  const [searchTerm, setSearchTerm] = useState("");
  // const [docContent, setDocContent] = useState<string>("");

  // Mock content for demonstration
  const mockContent = useMemo(
    () => ({
      "README.md": `# IdeasUI - Component Library

IdeasUI is a modern, accessible component library built with TypeScript, Tailwind CSS, and comprehensive tooling.

## 🚀 Quick Start

\`\`\`bash
# Clone the repository
git clone <repository-url>
cd lib

# Install dependencies
pnpm install

# Start development
pnpm run dev
\`\`\`

## 📦 Usage

\`\`\`tsx
import {Button} from "@ideasui/button";
import {Box} from "@ideasui/box";

function App() {
  return (
    <Box className="p-6">
      <Button variant="solid" color="primary" size="md">
        Click me
      </Button>
    </Box>
  );
}
\`\`\`

## 🎯 Features

- ✅ Modern React components with TypeScript
- ✅ Tailwind CSS with variants system
- ✅ Storybook playground for development
- ✅ Comprehensive testing (Jest + Playwright)
- ✅ Accessibility compliant (WCAG 2.1)
- ✅ Dark mode support
- ✅ Tree-shakeable exports`,

      "SETUP_CHECKLIST.md": `# Setup Checklist

Complete setup guide for IdeasUI component library.

## ✅ Prerequisites

- [ ] Node.js 18+ installed
- [ ] pnpm package manager
- [ ] Git configured

## 🛠️ Development Setup

- [ ] Clone repository
- [ ] Install dependencies
- [ ] Run initial build
- [ ] Start Storybook
- [ ] Run tests

## 📋 Configuration

- [ ] ESLint configuration
- [ ] Prettier setup
- [ ] Husky git hooks
- [ ] Changesets for versioning`,

      "CONTRIBUTING.md": `# Contributing to IdeasUI

Thank you for your interest in contributing to IdeasUI!

## 🤝 How to Contribute

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📝 Development Guidelines

- Follow the component guidelines
- Write comprehensive tests
- Update documentation
- Use conventional commits

## 🧪 Testing

Run the test suite before submitting:

\`\`\`bash
pnpm run test
pnpm run test:visual
\`\`\``,
    }),
    [],
  );
  const docContent =
    (mockContent[selectedDoc as keyof typeof mockContent] as string) || "Content not available";
  // useEffect(() => {
  //   // In a real implementation, you would fetch the actual file content
  //   setDocContent(
  //     (mockContent[selectedDoc as keyof typeof mockContent] as string) || "Content not available",
  //   );
  // }, [selectedDoc]);

  const filteredDocs = DOC_FILES.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <Book className="h-8 w-8 text-blue-600" />
            <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
              Documentation
            </h1>
          </div>
          <p className="text-lg text-slate-600">
            Browse and preview all documentation files from the project root
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-2xl border bg-white p-6 shadow-sm">
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
                <input
                  type="text"
                  placeholder="Search docs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* File List */}
              <div className="space-y-2">
                <h3 className="mb-3 text-sm font-semibold text-slate-700">Documentation Files</h3>
                {filteredDocs.map((doc) => (
                  <button
                    key={doc.name}
                    onClick={() => setSelectedDoc(doc.name)}
                    className={`w-full rounded-lg p-3 text-left transition-all ${
                      selectedDoc === doc.name
                        ? "border-blue-300 bg-blue-100 text-blue-700"
                        : "border-transparent hover:bg-slate-50"
                    } border`}
                  >
                    <div className="flex items-start gap-2">
                      <FileText className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium">{doc.name}</div>
                        <div className="mt-1 text-xs text-slate-500">{doc.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* External Links */}
              <div className="mt-8 border-t border-slate-200 pt-6">
                <h3 className="mb-3 text-sm font-semibold text-slate-700">External Links</h3>
                <div className="space-y-2">
                  <a
                    href="https://github.com/your-repo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-blue-600"
                  >
                    <ExternalLink className="h-4 w-4" />
                    GitHub Repository
                  </a>
                  <a
                    href="/storybook"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-blue-600"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Storybook
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
              {/* Header */}
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-slate-600" />
                    <h2 className="text-lg font-semibold text-slate-800">{selectedDoc}</h2>
                  </div>
                  <div className="text-sm text-slate-500">
                    Last updated: {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="prose prose-slate max-w-none">
                  <div className="overflow-x-auto rounded-lg border bg-slate-50 p-6 font-mono text-sm whitespace-pre-wrap">
                    {docContent}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <div>
                    Found an issue?{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Edit on GitHub
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-blue-600 hover:underline">Share</button>
                    <button className="text-blue-600 hover:underline">Print</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
