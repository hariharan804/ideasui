/* eslint-disable react/jsx-no-leaked-render */
'use client';

import { motion } from 'framer-motion';

interface PropDef {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

export function PropsTable({ props }: { props: PropDef[] }) {
  return (
    <div className="my-10">
      <h2 className="text-content-primary mb-6 text-xl font-bold">API Reference</h2>

      {/* Desktop View */}
      <div className="border-subtle hidden overflow-hidden rounded-xl border md:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-surface-muted">
              <th className="text-content-secondary px-5 py-3.5 text-[10px] font-bold tracking-wider uppercase">
                Prop
              </th>
              <th className="text-content-secondary px-5 py-3.5 text-[10px] font-bold tracking-wider uppercase">
                Type
              </th>
              <th className="text-content-secondary px-5 py-3.5 text-[10px] font-bold tracking-wider uppercase">
                Default
              </th>
              <th className="text-content-secondary px-5 py-3.5 text-[10px] font-bold tracking-wider uppercase">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="border-subtle divide-y">
            {props.map((p) => (
              <tr key={p.name} className="hover:bg-primary/5 transition-colors">
                <td className="text-primary px-5 py-4 font-mono text-sm font-bold whitespace-nowrap">
                  {p.name}
                  {p.required ? <span className="text-error ml-1">*</span> : null}
                </td>
                <td className="px-5 py-4 font-mono text-xs">
                  <span className="bg-info/10 border-info/20 text-info rounded border px-2 py-0.5">
                    {p.type}
                  </span>
                </td>
                <td className="text-content-primary px-5 py-4 font-mono text-xs opacity-70">
                  {p.default ?? '-'}
                </td>
                <td className="text-content-secondary px-5 py-4 text-sm leading-relaxed">
                  {p.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="space-y-4 md:hidden">
        {props.map((p) => (
          <motion.div
            key={p.name}
            className="bg-background border-subtle rounded-xl border p-5 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-primary font-mono font-bold">
                {p.name}
                {p.required ? <span className="text-error">*</span> : null}
              </span>
              <span className="bg-surface-muted text-content-secondary rounded-full px-2 py-0.5 font-mono text-[10px]">
                {p.default ?? 'no default'}
              </span>
            </div>
            <div className="bg-info/5 border-info/10 text-info mb-3 rounded border p-2 font-mono text-[11px]">
              {p.type}
            </div>
            <p className="text-content-secondary text-sm leading-relaxed">{p.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
