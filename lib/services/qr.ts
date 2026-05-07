export function createAssetQrSvg(tag: string, targetUrl: string) {
  const cells = Array.from({ length: 121 }, (_, index) => {
    const x = index % 11;
    const y = Math.floor(index / 11);
    const code = tag.charCodeAt(index % Math.max(1, tag.length)) || 17;
    const active = (code + x * 7 + y * 11 + index) % 3 !== 0;
    return active ? `<rect x="${x * 18 + 28}" y="${y * 18 + 28}" width="12" height="12" rx="2"/>` : "";
  }).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="280" height="320" viewBox="0 0 280 320" role="img" aria-label="QR asset tag ${escapeXml(tag)}">
  <rect width="280" height="320" rx="28" fill="#ffffff"/>
  <rect x="12" y="12" width="256" height="296" rx="22" fill="none" stroke="#E2E8F0" stroke-width="2"/>
  <g fill="#0F172A">${cells}</g>
  <rect x="28" y="242" width="224" height="44" rx="14" fill="#F8FAFC"/>
  <text x="140" y="263" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#0F172A">${escapeXml(tag)}</text>
  <text x="140" y="281" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="#64748B">${escapeXml(targetUrl)}</text>
</svg>`;
}

export function createAssetQrDataUrl(tag: string, targetUrl: string) {
  return `data:image/svg+xml;base64,${Buffer.from(createAssetQrSvg(tag, targetUrl)).toString("base64")}`;
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
