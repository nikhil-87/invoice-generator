import { useMemo, useState } from 'react'

function newItem() {
  return { id: crypto.randomUUID(), desc: '', qty: '', rate: '' };
}

function App() {
  const [data, setData] = useState({
    clientName: '',
    invoiceDate: new Date().toISOString().slice(0, 10),
    items: [], // start empty; no auto-inserted blank row on refresh
  });

  const onChange = (partial) => setData((d) => ({ ...d, ...partial }));
  const onAddItem = () => setData((d) => ({ ...d, items: [...d.items, newItem()] }));
  const onRemoveItem = (id) => setData((d) => ({ ...d, items: d.items.filter((it) => it.id !== id) }));

  const subtotal = useMemo(() => data.items.reduce((sum, it) => sum + (Number(it.qty) || 0) * (Number(it.rate) || 0), 0), [data.items]);
  const gst = useMemo(() => subtotal * 0.18, [subtotal]);
  const total = useMemo(() => subtotal + gst, [subtotal, gst]);

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900 antialiased">
      <header className="fixed top-0 left-0 right-0 z-40 w-full border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-6xl xl:max-w-7xl px-3 sm:px-4 h-14 sm:h-16 flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-sm sm:text-lg font-semibold tracking-tight text-gray-900 max-[360px]:w-full max-[360px]:text-center">Mini Invoice Generator</h1>
          <div className="text-xs sm:text-sm text-gray-600 max-[360px]:hidden">
            Total:
            <span className="ml-2 inline-flex items-center rounded-md bg-gray-100 px-2 py-1 font-medium tabular-nums ring-1 ring-inset ring-gray-200 shadow-sm text-gray-900">
              ₹ {total.toFixed(2)}
            </span>
          </div>
        </div>
      </header>

      <main className="pt-16 sm:pt-20 mx-auto max-w-6xl xl:max-w-7xl px-3 sm:px-4 py-4 sm:py-6 flex flex-col items-center gap-4 sm:gap-6 lg:grid lg:grid-cols-2 lg:items-start min-w-0">
        <div className="w-full min-w-0 flex justify-center">
          <section className="w-full min-w-0 max-w-xl sm:max-w-2xl lg:w-[36rem] mx-auto rounded-lg bg-white ring-1 ring-gray-100 p-4 sm:p-6 shadow-sm overflow-hidden">
            <InvoiceForm data={data} onChange={onChange} onAddItem={onAddItem} onRemoveItem={onRemoveItem} />
          </section>
        </div>
        <div className="w-full min-w-0 flex justify-center">
          <section className="w-full min-w-0 max-w-xl sm:max-w-2xl lg:w-[36rem] mx-auto p-0 rounded-lg overflow-hidden">
            <InvoicePreview data={data} />
          </section>
        </div>
      </main>
    </div>
  )
}

import InvoiceForm from './components/InvoiceForm.jsx'
import InvoicePreview from './components/InvoicePreview.jsx'

export default App
