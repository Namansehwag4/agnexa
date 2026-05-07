import { AiAuditWizard } from "@/components/platform/ai-audit-wizard";

export default function AiAuditPage() {
  return (
    <div className="bg-smoke py-12">
      <div className="section-shell">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-bold uppercase text-ember">Fire safety audit</p>
          <h1 className="mt-2 text-5xl font-black tracking-tight">Create a practical site safety assessment.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">Enter building details and get a risk score, recommended products, inspection actions, and compliance-ready summary.</p>
        </div>
        <AiAuditWizard />
      </div>
    </div>
  );
}
