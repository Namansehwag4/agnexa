export default function TrackOrderPage() {
  return (
    <div className="section-shell grid min-h-[60vh] place-items-center py-12">
      <form className="grid w-full max-w-md gap-4 rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
        <h1 className="text-3xl font-black">Track order</h1>
        <input name="orderNumber" placeholder="AGN-2026-0001" className="h-11 rounded-md border border-zinc-200 bg-transparent px-3 dark:border-zinc-800" />
        <button className="h-11 rounded-md bg-ember font-bold text-white">Track</button>
      </form>
    </div>
  );
}
