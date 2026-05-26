"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera, QrCode, ArrowLeft, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function ScanPage() {
  const [error, setError] = useState<string | null>(null);
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [manualTag, setManualTag] = useState("");
  const scannerRef = useRef<any>(null);

  useEffect(() => {
    let html5QrcodeScanner: any;

    async function startScanner() {
      try {
        const { Html5Qrcode } = await import("html5-qrcode");
        
        // Ensure element exists
        const container = document.getElementById("qr-reader");
        if (!container) return;

        html5QrcodeScanner = new Html5Qrcode("qr-reader");
        scannerRef.current = html5QrcodeScanner;

        const qrCodeSuccessCallback = (decodedText: string) => {
          setScannedResult(decodedText);
          
          // Stop scanner
          if (html5QrcodeScanner.isScanning) {
            html5QrcodeScanner.stop().then(() => {
              // Redirect to scanned asset
              // If the scanned text is a URL, extract tag or route directly
              let targetTag = decodedText;
              if (decodedText.startsWith("http")) {
                const parts = decodedText.split("/");
                targetTag = parts[parts.length - 1];
              }
              window.location.href = `/tracking/${targetTag}`;
            });
          }
        };

        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        await html5QrcodeScanner.start(
          { facingMode: "environment" },
          config,
          qrCodeSuccessCallback,
          () => {} // silent on errors
        );
      } catch (err: any) {
        console.error("Scanner start error:", err);
        setError("Camera permission denied or camera not found. Please try entering the tag code manually.");
      }
    }

    startScanner();

    return () => {
      if (html5QrcodeScanner && html5QrcodeScanner.isScanning) {
        html5QrcodeScanner.stop().catch((e: any) => console.error("Scanner stop error on unmount", e));
      }
    };
  }, []);

  function handleManualSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (manualTag.trim()) {
      window.location.href = `/tracking/${manualTag.trim()}`;
    }
  }

  return (
    <div className="relative min-h-[85vh] bg-smoke py-12 px-4 sm:px-6 lg:px-8">
      <div className="section-shell max-w-xl mx-auto">
        <Link href="/tracking" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-ember mb-6 transition">
          <ArrowLeft className="size-4" /> Back to Dashboard
        </Link>

        <div className="text-center mb-8">
          <p className="text-sm font-bold uppercase text-ember tracking-wider">Agnexa smart tracking</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-carbon">Asset QR Scanner</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">Scan the Agnexa QR code tag mounted on your fire extinguisher or safety hardware.</p>
        </div>

        {/* Scanner Viewport */}
        <div className="rounded-3xl border border-line bg-white p-6 shadow-soft relative overflow-hidden">
          {scannedResult ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <RefreshCw className="size-12 text-bluefire animate-spin mb-4" />
              <h3 className="text-xl font-black text-carbon">Tag Detected!</h3>
              <p className="text-sm font-semibold text-slate-500 mt-1">Navigating to asset log...</p>
              <span className="mt-3 rounded-full bg-slate-100 px-4 py-1 text-xs font-bold text-carbon border border-line">{scannedResult}</span>
            </div>
          ) : (
            <div className="relative">
              {/* Outer overlay border corners to style like an authentic scanning device */}
              <div className="absolute top-4 left-4 size-8 border-t-4 border-l-4 border-ember rounded-tl-lg z-10 pointer-events-none" />
              <div className="absolute top-4 right-4 size-8 border-t-4 border-r-4 border-ember rounded-tr-lg z-10 pointer-events-none" />
              <div className="absolute bottom-4 left-4 size-8 border-b-4 border-l-4 border-ember rounded-bl-lg z-10 pointer-events-none" />
              <div className="absolute bottom-4 right-4 size-8 border-b-4 border-r-4 border-ember rounded-br-lg z-10 pointer-events-none" />

              <div id="qr-reader" className="overflow-hidden rounded-2xl bg-slate-900 aspect-square w-full border border-line" />
            </div>
          )}

          {error && (
            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50/50 p-4 text-sm text-amber-800">
              <AlertCircle className="size-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Camera scanner inactive</p>
                <p className="text-xs mt-0.5 leading-5 text-amber-900/90">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Manual Fallback */}
        <div className="mt-6 rounded-3xl border border-line bg-white p-6 shadow-soft">
          <h2 className="text-lg font-black text-carbon flex items-center gap-2 mb-4">
            <QrCode className="size-5 text-bluefire" /> Manual Code Lookup
          </h2>
          <form onSubmit={handleManualSubmit} className="flex gap-2">
            <input
              type="text"
              value={manualTag}
              onChange={(e) => setManualTag(e.target.value)}
              placeholder="e.g. AGN-QR-1001"
              className="h-12 flex-1 rounded-2xl border border-line bg-transparent px-4 text-sm font-semibold outline-none focus:border-bluefire"
            />
            <button type="submit" className="rounded-2xl bg-carbon px-6 text-sm font-bold text-white transition hover:bg-slate-800">
              Lookup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
