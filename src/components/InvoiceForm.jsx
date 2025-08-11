import { useMemo, useState } from 'react';
import { sanitizeDecimalInput, sanitizeIntegerInput } from '../utils/format.js';

export default function InvoiceForm({ data, onChange, onAddItem, onRemoveItem }) {
  const subtotal = useMemo(() => data.items.reduce((sum, it) => sum + (Number(it.qty) || 0) * (Number(it.rate) || 0), 0), [data.items]);
  const gst = useMemo(() => subtotal * 0.18, [subtotal]);
  const total = useMemo(() => subtotal + gst, [subtotal, gst]);

  const [removingIds, setRemovingIds] = useState(new Set());
  const handleRemove = (id) => {
    setRemovingIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      onRemoveItem(id);
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 380);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block min-w-0">
          <span className="block text-xs sm:text-sm font-medium text-gray-700">Client Name</span>
          <input
            type="text"
            className="mt-1 block w-full max-w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-3 text-[16px] text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            placeholder="Acme Corp"
            value={data.clientName}
            onChange={(e) => onChange({ clientName: e.target.value })}
            autoComplete="name"
          />
        </label>
        <label className="block min-w-0">
          <span className="block text-xs sm:text-sm font-medium text-gray-700">Invoice Date</span>
          <input
            type="date"
            className="mt-1 block w-full max-w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-3 text-[16px] text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            value={data.invoiceDate}
            onChange={(e) => onChange({ invoiceDate: e.target.value })}
          />
        </label>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight text-gray-900">Line Items</h3>
          <button type="button" onClick={onAddItem} className="group w-full sm:w-auto rounded-lg bg-gradient-to-r from-indigo-600 to-sky-600 px-4 py-3 text-sm font-medium text-white shadow transition hover:from-indigo-500 hover:to-sky-500 active:scale-[0.98]">
            <span className="inline-block transition-transform group-active:translate-y-px">+ Add Item</span>
          </button>
        </div>

        {/* Mobile stacked cards */}
        <div className="mt-3 space-y-3 sm:hidden">
          {data.items.map((it, idx) => {
            const amount = (Number(it.qty) || 0) * (Number(it.rate) || 0);
            const invalidQty = it.qty === '' || Number.isNaN(Number(it.qty));
            const invalidRate = it.rate === '' || Number.isNaN(Number(it.rate));
            const exiting = removingIds.has(it.id);
            return (
              <div
                key={it.id}
                className={`rounded-lg bg-white ring-1 ring-gray-100 p-3 shadow-sm motion-safe:transition motion-safe:duration-500 motion-safe:ease-out ${exiting ? 'animate-fade-out-down' : 'animate-fade-in-up'} `}
              >
                <div className="min-w-0">
                  <label className="block text-xs font-medium text-gray-600">Description</label>
                  <input
                    type="text"
                    className="mt-1 block w-full max-w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-3 text-[16px] text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="Item description"
                    value={it.desc}
                    onChange={(e) => onChange({ items: data.items.map((row, i) => i === idx ? { ...row, desc: e.target.value } : row) })}
                  />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="min-w-0">
                    <label className="block text-xs font-medium text-gray-600">Qty</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      className={`mt-1 block w-full max-w-full min-w-0 rounded-lg border px-3 py-3 text-[16px] text-right outline-none transition ${invalidQty ? 'border-red-300 bg-red-50 text-red-700 placeholder:text-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'}`}
                      value={it.qty}
                      onChange={(e) => onChange({ items: data.items.map((row, i) => i === idx ? { ...row, qty: sanitizeIntegerInput(e.target.value) } : row) })}
                    />
                  </div>
                  <div className="min-w-0">
                    <label className="block text-xs font-medium text-gray-600">Rate</label>
                    <input
                      type="text"
                      inputMode="decimal"
                      className={`mt-1 block w-full max-w-full min-w-0 rounded-lg border px-3 py-3 text-[16px] text-right outline-none transition ${invalidRate ? 'border-red-300 bg-red-50 text-red-700 placeholder:text-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'}`}
                      value={it.rate}
                      onChange={(e) => onChange({ items: data.items.map((row, i) => i === idx ? { ...row, rate: sanitizeDecimalInput(e.target.value) } : row) })}
                    />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-sm text-gray-600">Amount</div>
                  <div className="text-base font-medium tabular-nums">₹ {amount.toFixed(2)}</div>
                </div>
                <div className="mt-3 text-right">
                  <button type="button" onClick={() => handleRemove(it.id)} className="rounded-md px-3 py-2 text-sm text-red-600 transition hover:bg-red-50">Remove</button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop/tablet table view */}
        <div className="mt-3 hidden sm:block">
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left text-sm text-gray-600">
                  <th className="px-2 font-medium">Description</th>
                  <th className="px-2 w-24 font-medium">Qty</th>
                  <th className="px-2 w-32 font-medium">Rate</th>
                  <th className="px-2 w-28 text-right font-medium">Amount</th>
                  <th className="px-2 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((it, idx) => {
                  const amount = (Number(it.qty) || 0) * (Number(it.rate) || 0);
                  const invalidQty = it.qty === '' || Number.isNaN(Number(it.qty));
                  const invalidRate = it.rate === '' || Number.isNaN(Number(it.rate));
                  const exiting = removingIds.has(it.id);
                  return (
                    <tr
                      key={it.id}
                      className={`rounded-xl bg-white ring-1 ring-gray-100 motion-safe:transition motion-safe:duration-500 motion-safe:ease-out ${exiting ? 'animate-fade-out-down' : 'animate-fade-in-up'}`}
                    >
                      <td className="px-2 py-2 align-top">
                        <input
                          type="text"
                          className="w-full max-w-full min-w-0 rounded-lg border border-gray-300 bg-white px-4 py-3 text-[16px] text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                          placeholder="Item description"
                          value={it.desc}
                          onChange={(e) => onChange({ items: data.items.map((row, i) => i === idx ? { ...row, desc: e.target.value } : row) })}
                        />
                      </td>
                      <td className="px-2 py-2 align-top">
                        <input
                          type="text"
                          inputMode="numeric"
                          className={`w-20 max-w-full min-w-0 rounded-lg border px-3 py-3 text-[16px] text-right outline-none transition ${invalidQty ? 'border-red-300 bg-red-50 text-red-700 placeholder:text-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'}`}
                          value={it.qty}
                          onChange={(e) => onChange({ items: data.items.map((row, i) => i === idx ? { ...row, qty: sanitizeIntegerInput(e.target.value) } : row) })}
                        />
                      </td>
                      <td className="px-2 py-2 align-top">
                        <input
                          type="text"
                          inputMode="decimal"
                          className={`w-28 max-w-full min-w-0 rounded-lg border px-3 py-3 text-[16px] text-right outline-none transition ${invalidRate ? 'border-red-300 bg-red-50 text-red-700 placeholder:text-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'}`}
                          value={it.rate}
                          onChange={(e) => onChange({ items: data.items.map((row, i) => i === idx ? { ...row, rate: sanitizeDecimalInput(e.target.value) } : row) })}
                        />
                      </td>
                      <td className="px-2 py-2 align-top text-right tabular-nums text-gray-900">₹ {amount.toFixed(2)}</td>
                      <td className="px-2 py-2 align-top text-right">
                        <button type="button" onClick={() => handleRemove(it.id)} className="rounded-md px-3 py-2 text-sm text-red-600 transition hover:bg-red-50">Remove</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 grid gap-1 sm:ml-auto sm:w-80">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium tabular-nums text-gray-900">₹ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">GST (18%)</span>
            <span className="font-medium tabular-nums text-gray-900">₹ {gst.toFixed(2)}</span>
          </div>
          <div className="mt-1 h-px bg-gray-200" />
          <div className="flex items-center justify-between text-base">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="font-semibold tabular-nums text-gray-900">₹ {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
