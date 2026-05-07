import { LinkButton } from "@/components/ui/button";

export function AdminListPage({
  title,
  description,
  items
}: {
  title: string;
  description: string;
  items: string[];
}) {
  return (
    <div className="section-shell py-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold uppercase text-ember">Admin module</p>
          <h1 className="mt-2 text-4xl font-black">{title}</h1>
          <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">{description}</p>
        </div>
        <LinkButton href="/admin" variant="secondary">Back to admin</LinkButton>
      </div>
      <div className="mt-8 grid gap-4">
        {items.map((item) => (
          <div key={item} className="rounded-lg border border-zinc-200 bg-white p-5 font-semibold dark:border-zinc-800 dark:bg-carbon">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
