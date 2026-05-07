export default function BlogPage() {
  return (
    <div className="section-shell py-12">
      <p className="text-sm font-bold uppercase text-ember">Fire safety resources</p>
      <h1 className="mt-2 text-4xl font-black">SEO-ready blog system</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {["How to choose fire extinguishers", "AMC checklist for factories", "Fire audit preparation guide"].map((title) => (
          <article key={title} className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
            <h2 className="text-xl font-black">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">Publish and manage this from the admin blog module with SEO slugs and metadata.</p>
          </article>
        ))}
      </div>
    </div>
  );
}
