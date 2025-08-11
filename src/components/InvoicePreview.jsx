import { useMemo } from 'react';

export default function InvoicePreview({ data }) {
  const subtotal = useMemo(() => data.items.reduce((sum, it) => sum + (Number(it.qty) || 0) * (Number(it.rate) || 0), 0), [data.items]);
  const gst = useMemo(() => subtotal * 0.18, [subtotal]);
  const total = useMemo(() => subtotal + gst, [subtotal, gst]);

  return (
    <div className="rounded-lg ring-1 ring-gray-100 p-4 sm:p-6 bg-white text-gray-900 lg:sticky lg:top-20 lg:self-start shadow-sm min-w-0">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-semibold tracking-tight truncate">Invoice</h2>
          <p className="text-sm text-gray-600">Date: {data.invoiceDate || '-'} </p>
        </div>
        <div className="text-right min-w-0">
          <p className="text-xs uppercase tracking-wide text-gray-600">Bill To</p>
          <p className="font-medium break-words">{data.clientName || 'Client Name'}</p>
        </div>
      </div>

      {/* Mobile stacked list */}
      <div className="mt-4 sm:hidden space-y-3">
        {data.items.map((it) => {
          const qty = Number(it.qty) || 0;
          const rate = Number(it.rate) || 0;
          const amt = qty * rate;
          return (
            <div key={it.id} className="rounded-lg bg-gray-50 ring-1 ring-gray-200 p-3">
              <div className="text-sm text-gray-600">Description</div>
              <div className="mt-0.5 text-sm text-gray-900 break-words">{it.desc || '\u2014'}</div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                <div>
                  <div className="text-gray-600">Qty</div>
                  <div className="tabular-nums">{qty}</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-600">Rate</div>
                  <div className="tabular-nums">₹ {rate.toFixed(2)}</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-600">Amount</div>
                  <div className="font-medium tabular-nums">₹ {amt.toFixed(2)}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop/tablet table view */}
      <div className="mt-4 hidden sm:block">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Description</th>
                <th className="px-3 py-2 text-right font-medium">Qty</th>
                <th className="px-3 py-2 text-right font-medium">Rate</th>
                <th className="px-3 py-2 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((it) => {
                const qty = Number(it.qty) || 0;
                const rate = Number(it.rate) || 0;
                const amt = qty * rate;
                return (
                  <tr key={it.id} className="border-t border-gray-200">
                    <td className="px-3 py-2 break-words">{it.desc || '\u2014'}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{qty}</td>
                    <td className="px-3 py-2 text-right tabular-nums">₹ {rate.toFixed(2)}</td>
                    <td className="px-3 py-2 text-right tabular-nums">₹ {amt.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 grid gap-1 sm:ml-auto sm:w-80 min-w-0">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium tabular-nums">₹ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">GST (18%)</span>
          <span className="font-medium tabular-nums">₹ {gst.toFixed(2)}</span>
        </div>
        <div className="mt-1 h-px bg-gray-200" />
        <div className="flex items-center justify-between text-base">
          <span className="font-semibold">Total</span>
          <span className="font-semibold tabular-nums">₹ {total.toFixed(2)}</span>
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-500">This is a system generated invoice preview.</p>
    </div>
  );
}
