"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Download, Upload, X, Camera } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/src/lib/utils";

interface IdCardProps {
  name: string;
  position: string;
  email: string;
  phone?: string;
  nationality?: string;
  employeeId: string;
  avatarInitials: string;
}

const W = 680;
const H = 1080;

export function EmployeeIdCard({
  name, position, email, phone, nationality, employeeId, avatarInitials,
}: IdCardProps) {
  const canvasRef                       = useRef<HTMLCanvasElement>(null);
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [photoImg, setPhotoImg]         = useState<HTMLImageElement | null>(null);
  const [qrImg, setQrImg]               = useState<HTMLImageElement | null>(null);
  const [canDownload, setCanDownload]   = useState(false);

  /* ── QR ──────────────────────────────────────────────────────────────── */
  useEffect(() => {
    let dead = false;
    (async () => {
      try {
        const QRCode = (await import("qrcode")).default;
        const url = `${window.location.origin}/profile?emp=${employeeId}`;
        const du  = await QRCode.toDataURL(url, {
          width: 220, margin: 1,
          color: { dark: "#006C35", light: "#ffffff" },
          errorCorrectionLevel: "M",
        });
        if (dead) return;
        const img = new Image();
        img.onload = () => { if (!dead) setQrImg(img); };
        img.src = du;
      } catch { /* not installed yet */ }
    })();
    return () => { dead = true; };
  }, [employeeId]);

  /* ── Photo ───────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!photoDataUrl) { setPhotoImg(null); return; }
    const img = new Image();
    img.onload = () => setPhotoImg(img);
    img.src = photoDataUrl;
  }, [photoDataUrl]);

  /* ── Draw ────────────────────────────────────────────────────────────── */
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width  = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;

    /* ── helpers ── */
    const gold = (() => {
      const g = ctx.createLinearGradient(0, 0, W, 0);
      g.addColorStop(0,   "#b8922a");
      g.addColorStop(0.4, "#e8c96a");
      g.addColorStop(0.7, "#D4AF37");
      g.addColorStop(1,   "#b8922a");
      return g;
    })();

    /* ── background ── */
    ctx.fillStyle = "#f7f4f5";
    rr(ctx, 0, 0, W, H, 32); ctx.fill();

    /* subtle maroon watermark circle */
    ctx.fillStyle = "rgba(0,108,53,0.04)";
    ctx.beginPath(); ctx.arc(W / 2, H / 2, 320, 0, Math.PI * 2); ctx.fill();

    /* ── HEADER ── */
    const HDR = 210;
    const hg = ctx.createLinearGradient(0, 0, W, HDR);
    hg.addColorStop(0, "#006C35"); hg.addColorStop(1, "#004b23");
    ctx.fillStyle = hg;
    rr(ctx, 0, 0, W, HDR, [32, 32, 0, 0]); ctx.fill();

    /* header glow */
    const hgl = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, 300);
    hgl.addColorStop(0, "rgba(255,255,255,0.13)");
    hgl.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = hgl;
    rr(ctx, 0, 0, W, HDR, [32, 32, 0, 0]); ctx.fill();

    /* diagonal accent lines */
    ctx.save();
    ctx.strokeStyle = "rgba(201,162,77,0.22)";
    ctx.lineWidth = 1.5;
    for (let i = -3; i < 8; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 110 - 80, 0);
      ctx.lineTo(i * 110 + HDR + 40, HDR);
      ctx.stroke();
    }
    ctx.restore();

    /* gold bottom stripe */
    ctx.fillStyle = gold;
    ctx.fillRect(0, HDR - 6, W, 6);

    /* company name */
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 34px Arial Black, Arial, sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("GOLDEN FIRST CONTRACTING", W / 2, 75);

    ctx.fillStyle = "rgba(201,162,77,0.9)";
    ctx.font = "700 16px Arial, sans-serif";
    ctx.letterSpacing = "2.5px";
    ctx.fillText("INTEGRATED FACILITY MANAGEMENT", W / 2, 112);
    ctx.letterSpacing = "0px";

    /* ID CARD badge */
    const bw = 320, bh = 46, bx = (W - bw) / 2, by = 138;
    ctx.fillStyle = "rgba(0,0,0,0.28)";
    rr(ctx, bx, by, bw, bh, 9); ctx.fill();
    ctx.strokeStyle = "rgba(201,162,77,0.65)";
    ctx.lineWidth = 1.2;
    rr(ctx, bx, by, bw, bh, 9); ctx.stroke();
    ctx.fillStyle = "#D4AF37";
    ctx.font = "900 18px Arial Black, Arial, sans-serif";
    ctx.letterSpacing = "3px";
    ctx.fillText("EMPLOYEE  ID  CARD", W / 2, by + bh / 2 + 1);
    ctx.letterSpacing = "0px";

    /* ── PHOTO ── */
    const cx = W / 2, cy = 340, cr = 96;

    /* drop shadow */
    ctx.shadowColor = "rgba(0,0,0,0.22)"; ctx.shadowBlur = 28; ctx.shadowOffsetY = 8;
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.arc(cx, cy, cr + 7, 0, Math.PI * 2); ctx.fill();
    ctx.shadowColor = "transparent"; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;

    /* gold ring */
    const rg = ctx.createLinearGradient(cx - cr, cy - cr, cx + cr, cy + cr);
    rg.addColorStop(0, "#e8c96a"); rg.addColorStop(0.5, "#D4AF37"); rg.addColorStop(1, "#b8922a");
    ctx.strokeStyle = rg; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(cx, cy, cr + 4, 0, Math.PI * 2); ctx.stroke();

    /* white inner ring */
    ctx.strokeStyle = "#fff"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(cx, cy, cr + 1, 0, Math.PI * 2); ctx.stroke();

    /* clip & draw photo / initials */
    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, cr, 0, Math.PI * 2); ctx.clip();
    if (photoImg) {
      const s = Math.max((cr * 2) / photoImg.width, (cr * 2) / photoImg.height);
      ctx.drawImage(photoImg, cx - photoImg.width * s / 2, cy - photoImg.height * s / 2, photoImg.width * s, photoImg.height * s);
    } else {
      const ag = ctx.createRadialGradient(cx - 28, cy - 28, 8, cx, cy, cr);
      ag.addColorStop(0, "#a01a42"); ag.addColorStop(1, "#5a0d24");
      ctx.fillStyle = ag;
      ctx.fillRect(cx - cr, cy - cr, cr * 2, cr * 2);
      ctx.fillStyle = "#fff";
      ctx.font = "900 56px Arial Black, Arial, sans-serif";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(avatarInitials.toUpperCase(), cx, cy);
    }
    ctx.restore();

    /* ── NAME & POSITION ── */
    ctx.textAlign = "center"; ctx.textBaseline = "alphabetic";

    ctx.fillStyle = "#1a1020";
    const nfs = name.length > 20 ? 38 : 44;
    ctx.font = `900 ${nfs}px Arial Black, Arial, sans-serif`;
    ctx.fillText(name, W / 2, 490);

    /* position pill */
    ctx.font = "700 20px Arial, sans-serif";
    ctx.letterSpacing = "2px";
    const posText = position.toUpperCase();
    const posW = ctx.measureText(posText).width + 56;
    ctx.fillStyle = "#006C35";
    rr(ctx, (W - posW) / 2, 502, posW, 42, 10); ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.fillText(posText, W / 2, 530);
    ctx.letterSpacing = "0px";

    /* ── DIVIDER ── */
    const dg = ctx.createLinearGradient(40, 0, W - 40, 0);
    dg.addColorStop(0, "rgba(0,108,53,0)");
    dg.addColorStop(0.25, "rgba(0,108,53,0.5)");
    dg.addColorStop(0.75, "rgba(0,108,53,0.5)");
    dg.addColorStop(1, "rgba(0,108,53,0)");
    ctx.strokeStyle = dg; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(44, 558); ctx.lineTo(W - 44, 558); ctx.stroke();

    /* ── INFO ROWS ── */
    const rows = [
      { label: "Employee ID", value: `#${employeeId}`, highlight: true },
      { label: "Position",    value: position },
      { label: "Email",       value: email },
      ...(phone       ? [{ label: "Phone",       value: phone }]       : []),
      ...(nationality ? [{ label: "Nationality", value: nationality }] : []),
      { label: "Company",  value: "Golden First Contracting W.L.L." },
      { label: "Location", value: "Riyadh, Saudi Arabia" },
    ];

    const rowStartY = 576;
    const rowH      = 62;
    const lx        = 56;
    const vx        = 290;

    rows.forEach((row, i) => {
      const y = rowStartY + i * rowH;

      /* alternating bg */
      if (i % 2 === 0) {
        ctx.fillStyle = "rgba(0,108,53,0.055)";
        rr(ctx, 36, y - 14, W - 72, rowH - 4, 10); ctx.fill();
      }

      /* label */
      ctx.textAlign = "left"; ctx.textBaseline = "middle";
      ctx.fillStyle = "#006C35";
      ctx.font = "700 17px Arial, sans-serif";
      ctx.letterSpacing = "1.5px";
      ctx.fillText(row.label.toUpperCase(), lx, y + 16);
      ctx.letterSpacing = "0px";

      /* colon */
      ctx.fillStyle = "#D4AF37";
      ctx.font = "900 22px Arial, sans-serif";
      ctx.fillText(":", vx - 26, y + 17);

      /* value */
      ctx.fillStyle = (row as { highlight?: boolean }).highlight ? "#006C35" : "#1a1020";
      ctx.font = (row as { highlight?: boolean }).highlight
        ? "900 22px Arial Black, Arial, sans-serif"
        : "600 20px Arial, sans-serif";
      ctx.fillText(row.value, vx, y + 17);
    });

    /* ── QR CODE — anchored above footer, centered horizontally ── */
    const footerY = H - 55;
    const qrSize  = 60;
    const qrPad   = 6;
    const qrLblH  = 18;
    const qrCardW = qrSize + qrPad * 2;                  // 72px wide
    const qrCardH = qrPad + qrSize + qrPad + qrLblH;     // 90px tall
    const cardX   = (W - qrCardW) / 2;                   // (680-72)/2 = 304 — exact center
    const cardY   = footerY - qrCardH - 10;              // anchored above footer

    const drawQR = (qrImage: HTMLImageElement | null) => {
      /* white card */
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "rgba(0,0,0,0.12)"; ctx.shadowBlur = 16; ctx.shadowOffsetY = 4;
      rr(ctx, cardX, cardY, qrCardW, qrCardH, 14); ctx.fill();
      ctx.shadowColor = "transparent"; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;

      ctx.strokeStyle = "rgba(0,108,53,0.2)"; ctx.lineWidth = 1;
      rr(ctx, cardX, cardY, qrCardW, qrCardH, 14); ctx.stroke();

      const imgX = cardX + qrPad;  // QR image padded evenly inside the card
      const imgY = cardY + qrPad;

      if (qrImage) {
        ctx.drawImage(qrImage, imgX, imgY, qrSize, qrSize);
      } else {
        ctx.fillStyle = "rgba(0,108,53,0.15)";
        ctx.fillRect(imgX, imgY, qrSize, qrSize);
      }

      /* "SCAN TO VERIFY" label — centered at W/2 */
      ctx.fillStyle = "rgba(0,108,53,0.6)";
      ctx.font = "700 8px Arial, sans-serif";
      ctx.letterSpacing = "1.2px";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText("SCAN TO VERIFY", W / 2, imgY + qrSize + qrPad + qrLblH / 2);
      ctx.letterSpacing = "0px";
    };

    if (qrImg) {
      drawQR(qrImg);
    } else {
      drawQR(null);
    }

    /* ── FOOTER — drawn last so it's always on top ── */
    const fg = ctx.createLinearGradient(0, footerY, W, H);
    fg.addColorStop(0, "#006C35"); fg.addColorStop(1, "#004b23");
    ctx.fillStyle = fg;
    rr(ctx, 0, footerY, W, 72, [0, 0, 32, 32]); ctx.fill();

    ctx.fillStyle = gold;
    ctx.fillRect(0, footerY, W, 5);

    const issueDate = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase();
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.font = "600 16px Arial, sans-serif";
    ctx.letterSpacing = "1.5px";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(`ISSUED: ${issueDate}  •  goldenfirstcontracting.com`, W / 2, footerY + 36);
    ctx.letterSpacing = "0px";

  }, [name, position, email, phone, nationality, employeeId, avatarInitials, photoImg, qrImg]);

  useEffect(() => { draw(); }, [draw]);

  /* ── Upload ──────────────────────────────────────────────────────────── */
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotoDataUrl(ev.target?.result as string);
      setCanDownload(true);
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!canDownload) return;
    draw();
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const link = document.createElement("a");
      link.download = `golden-first-id-${name.replace(/\s+/g, "-").toLowerCase()}.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-5"
    >
      {/* Photo upload */}
      {!photoDataUrl ? (
        <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center bg-slate-50 hover:border-primary/40 transition-all">
          <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Camera className="size-7 text-primary" />
          </div>
          <h4 className="text-sm font-black text-accent uppercase tracking-widest mb-2">Upload Your Photo</h4>
          <p className="text-xs text-muted mb-5">Passport-style photo required to generate your ID card</p>
          <label className="inline-flex items-center gap-2 h-11 px-6 rounded-2xl bg-primary text-white text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <Upload className="size-3.5" /> Choose Photo
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
          </label>
        </div>
      ) : (
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-green-50 border border-green-100">
          <div className="size-8 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
            <Camera className="size-4 text-green-600" />
          </div>
          <p className="text-xs font-bold text-green-700 flex-1">Photo uploaded</p>
          <button
            onClick={() => { setPhotoDataUrl(null); setCanDownload(false); }}
            className="size-7 rounded-lg bg-green-100 hover:bg-red-100 hover:text-red-500 text-green-600 flex items-center justify-center transition-all"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {/* Card preview */}
      <div className="flex justify-center">
        <div className={cn(
          "relative rounded-3xl overflow-hidden shadow-2xl shadow-black/20 border border-slate-200 transition-all duration-500 w-full max-w-sm",
          !photoDataUrl && "opacity-40 blur-[2px] pointer-events-none select-none"
        )}>
          <canvas
            ref={canvasRef}
            className="w-full h-auto block"
            style={{ aspectRatio: `${W}/${H}` }}
          />
          {!photoDataUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/50 backdrop-blur-sm rounded-2xl px-5 py-2.5">
                <p className="text-white text-[10px] font-black uppercase tracking-widest">Upload photo first</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Download */}
      <Button
        onClick={handleDownload}
        disabled={!canDownload}
        className="w-full h-12 rounded-2xl gap-3 text-[10px] font-black uppercase tracking-widest bg-highlight hover:bg-highlight/90 text-white shadow-xl shadow-highlight/20 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <Download className="size-4" /> Download ID Card (PNG)
      </Button>
    </motion.div>
  );
}

function rr(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  r: number | [number, number, number, number]
) {
  const [tl, tr, br, bl] = Array.isArray(r) ? r : [r, r, r, r];
  ctx.beginPath();
  ctx.moveTo(x + tl, y);
  ctx.lineTo(x + w - tr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + tr);
  ctx.lineTo(x + w, y + h - br);
  ctx.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
  ctx.lineTo(x + bl, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - bl);
  ctx.lineTo(x, y + tl);
  ctx.quadraticCurveTo(x, y, x + tl, y);
  ctx.closePath();
}
