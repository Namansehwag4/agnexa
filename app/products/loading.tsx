export default function ProductsLoading() {
  return (
    <div className="section-shell grid gap-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-3xl border border-line bg-white p-3 shadow-soft">
          <div className="h-52 rounded-2xl bg-slate-100" />
          <div className="mt-4 h-3 w-24 rounded bg-slate-100" />
          <div className="mt-3 h-5 w-4/5 rounded bg-slate-100" />
          <div className="mt-3 h-3 w-full rounded bg-slate-100" />
          <div className="mt-2 h-3 w-2/3 rounded bg-slate-100" />
        </div>
      ))}
    </div>
  );
}
