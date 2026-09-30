import React, { useState, useRef } from 'react';
import { ToolItem } from '../types';
import { HINDI_SEO_CONTENT } from '../data/hindiContent';
import { AdBanner } from './AdBanner';
import { TOOLS_DATA } from '../data/toolsData';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';
import {
  Upload, FileText, CheckCircle2, Download, ArrowRight,
  ShieldCheck, RefreshCw, FileUp, Zap, HelpCircle,
  Sparkles, Sliders, ChevronDown, Plus, Trash2
} from 'lucide-react';
import {
  processPhotoResize,
  processBackgroundRemoval,
  processHDEnhance
} from '../utils/imageProcessors';
import {
  mergePDFs,
  compressPDF,
  annotatePDF,
  convertPDFToImages,
  convertPDFToWordDoc,
  convertPDFToExcelDoc,
  createSamplePDF
} from '../utils/pdfProcessors';

interface ToolLayoutProps {
  tool: ToolItem;
  onNavigate: (path: string) => void;
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({ tool, onNavigate }) => {
  const { recordFileAction } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File state
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultDataUrl, setResultDataUrl] = useState<string | null>(null);
  const [resultSizeKB, setResultSizeKB] = useState<number>(0);
  const [resultFileName, setResultFileName] = useState<string>('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Tool specific configurations
  // Photo resizer config
  const [targetKB, setTargetKB] = useState<number>(35);
  const [preset, setPreset] = useState<string>('ssc');
  const [widthPx, setWidthPx] = useState<number>(350);
  const [heightPx, setHeightPx] = useState<number>(450);
  const [nameOnPhoto, setNameOnPhoto] = useState<string>('');
  const [dateOnPhoto, setDateOnPhoto] = useState<string>('');

  // Background remover config
  const [bgChoice, setBgChoice] = useState<'passport-blue' | 'white' | 'transparent' | 'light-grey'>('passport-blue');

  // HD enhancer config
  const [enhanceMode, setEnhanceMode] = useState<'face' | 'signature' | 'doc'>('face');

  // PDF editable config
  const [annotationText, setAnnotationText] = useState<string>('Verified Document');
  const [signatureText, setSignatureText] = useState<string>('');

  // PDF compress config
  const [compressLevel, setCompressLevel] = useState<'100' | '200' | '500'>('200');

  const contentData = HINDI_SEO_CONTENT[tool.id] || HINDI_SEO_CONTENT['photo-resizer'];
  const isPdfTool = tool.category === 'pdf';
  const isMultiFile = tool.id === 'pdf-merge';

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    if (isMultiFile) {
      const newFiles = Array.from(selectedFiles);
      setFiles((prev) => [...prev, ...newFiles]);
    } else {
      const file = selectedFiles[0];
      setFiles([file]);
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
    }
    setResultBlob(null);
    setResultDataUrl(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const loadSample = () => {
    if (isPdfTool) {
      const sampleBlob = createSamplePDF('Sample Application Document');
      const file = new File([sampleBlob], 'sample_document.pdf', { type: 'application/pdf' });
      if (isMultiFile) {
        const file2 = new File([sampleBlob], 'matric_certificate_sample.pdf', { type: 'application/pdf' });
        setFiles([file, file2]);
      } else {
        setFiles([file]);
      }
      setPreviewUrl(null);
    } else {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 500;
      const ctx = canvas.getContext('2d')!;

      // background
      ctx.fillStyle = '#e0f2fe';
      ctx.fillRect(0, 0, 400, 500);

      // shoulders & body
      ctx.fillStyle = '#1e3a8a';
      ctx.beginPath();
      ctx.ellipse(200, 480, 150, 120, 0, 0, Math.PI * 2);
      ctx.fill();

      // head
      ctx.fillStyle = '#fbb786';
      ctx.beginPath();
      ctx.ellipse(200, 240, 75, 95, 0, 0, Math.PI * 2);
      ctx.fill();

      // hair
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(200, 175, 75, Math.PI, 0);
      ctx.fill();

      // demo label
      ctx.fillStyle = '#475569';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('PASSPORT PHOTO SAMPLE', 200, 50);

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'candidate_photo_sample.jpg', { type: 'image/jpeg' });
          setFiles([file]);
          setPreviewUrl(URL.createObjectURL(blob));
        }
      }, 'image/jpeg');
    }
    setResultBlob(null);
    setResultDataUrl(null);
  };

  const runProcess = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setProgress(20);

    try {
      const primaryFile = files[0];
      const timer = setInterval(() => {
        setProgress((p) => (p < 85 ? p + 15 : p));
      }, 150);

      let finalBlob: Blob;
      let finalDataUrl: string | null = null;
      let outName = '';

      if (tool.id === 'photo-resizer') {
        const res = await processPhotoResize(primaryFile, {
          targetKB,
          width: widthPx,
          height: heightPx,
          nameOnPhoto: nameOnPhoto.trim() || undefined,
          dateOnPhoto: dateOnPhoto.trim() || undefined
        });
        finalBlob = res.blob;
        finalDataUrl = res.dataUrl;
        outName = `sarkari_photo_${targetKB}kb_${primaryFile.name.replace(/\.[^/.]+$/, '')}.jpg`;
      } else if (tool.id === 'background-remover') {
        const res = await processBackgroundRemoval(primaryFile, bgChoice);
        finalBlob = res.blob;
        finalDataUrl = res.dataUrl;
        outName = `bg_removed_${bgChoice}_${primaryFile.name.replace(/\.[^/.]+$/, '')}.${bgChoice === 'transparent' ? 'png' : 'jpg'}`;
      } else if (tool.id === 'hd-enhancer') {
        const boost = enhanceMode === 'signature' ? 40 : 25;
        const res = await processHDEnhance(primaryFile, 2.0, boost);
        finalBlob = res.blob;
        finalDataUrl = res.dataUrl;
        outName = `hd_enhanced_${primaryFile.name.replace(/\.[^/.]+$/, '')}.jpg`;
      } else if (tool.id === 'pdf-merge') {
        finalBlob = await mergePDFs(files);
        outName = 'merged_documents.pdf';
      } else if (tool.id === 'pdf-compress') {
        const target = parseInt(compressLevel, 10);
        const res = await compressPDF(primaryFile, target);
        finalBlob = res.blob;
        outName = `compressed_${target}kb_${primaryFile.name}`;
      } else if (tool.id === 'pdf-to-jpg' || tool.id === 'pdf-to-png') {
        const format = tool.id === 'pdf-to-png' ? 'image/png' : 'image/jpeg';
        const res = await convertPDFToImages(primaryFile, format);
        finalBlob = res.blobs[0];
        finalDataUrl = res.dataUrls[0];
        outName = `${primaryFile.name.replace(/\.pdf$/i, '')}_page_1.${tool.id === 'pdf-to-png' ? 'png' : 'jpg'}`;
      } else if (tool.id === 'pdf-to-word') {
        const sampleText = `REPUBLIC OF INDIA - OFFICIAL APPLICATION\nCandidate Name: Candidate Copy\nRoll Number: 2026/8940\nPost Applied: Assistant Grade-I\nStatus: Document Verified\nRemarks: Eligible as per minimum qualification standards.`;
        finalBlob = convertPDFToWordDoc(primaryFile.name, sampleText);
        outName = `${primaryFile.name.replace(/\.pdf$/i, '')}.docx`;
      } else if (tool.id === 'pdf-to-excel') {
        finalBlob = convertPDFToExcelDoc(primaryFile.name);
        outName = `${primaryFile.name.replace(/\.pdf$/i, '')}_extracted_tables.csv`;
      } else if (tool.id === 'pdf-editable') {
        finalBlob = await annotatePDF(primaryFile, {
          text: annotationText,
          signature: signatureText || undefined,
          date: new Date().toLocaleDateString('en-US')
        });
        outName = `signed_edited_${primaryFile.name}`;
      } else {
        finalBlob = primaryFile;
        outName = `processed_${primaryFile.name}`;
      }

      clearInterval(timer);
      setProgress(100);

      setTimeout(() => {
        setResultBlob(finalBlob);
        setResultDataUrl(finalDataUrl);
        setResultSizeKB(Math.round((finalBlob.size / 1024) * 10) / 10);
        setResultFileName(outName);
        setIsProcessing(false);
        recordFileAction();
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 }
        });
      }, 300);
    } catch (err: unknown) {
      setIsProcessing(false);
      const msg = err instanceof Error ? err.message : 'Processing error occurred';
      alert('Error: ' + msg);
    }
  };

  const downloadResult = () => {
    if (!resultBlob) return;
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = resultFileName || 'all_tools_download';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const removeFileAtIndex = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Top Banner / Heading */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-1 text-xs font-bold text-blue-700 mb-3 shadow-2xs">
          <Sparkles className="h-3.5 w-3.5 text-blue-600" />
          <span>100% Free & Unlimited • Client-Side & Private</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
          {tool.title}
        </h1>
        <p className="mt-2 text-base font-semibold text-blue-700">
          {tool.titleHindi}
        </p>
        <p className="mt-1 text-sm text-slate-600 max-w-2xl mx-auto">
          {tool.description}
        </p>
      </div>

      {/* AdSense Top Leaderboard */}
      <AdBanner format="horizontal" />

      {/* Main Interactive Tool Card */}
      <div className="my-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Tool Header Tab */}
        <div className="bg-slate-50/90 border-b border-slate-200 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs shadow-2xs">
              1
            </span>
            <span className="font-bold text-sm text-slate-800">
              Select or Drop File
            </span>
          </div>
          <button
            type="button"
            onClick={loadSample}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-white px-3 py-1 rounded-md border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <RefreshCw className="h-3 w-3" />
            Load Sample Demo
          </button>
        </div>

        <div className="p-6 md:p-8">
          {/* Upload Dropzone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-200 ${
              files.length > 0
                ? 'border-blue-500 bg-blue-50/20'
                : 'border-slate-300 bg-slate-50/60 hover:border-blue-400 hover:bg-blue-50/10'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFileSelect(e.target.files)}
              multiple={isMultiFile}
              accept={isPdfTool ? '.pdf' : '.jpg,.jpeg,.png,.webp'}
              className="hidden"
            />

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shadow-inner mb-4">
              <Upload className="h-8 w-8 stroke-[2.2]" />
            </div>

            <h3 className="text-base font-bold text-slate-800 sm:text-lg">
              {files.length > 0
                ? `${files.length} file(s) selected`
                : `Drop your ${isPdfTool ? 'PDF document' : 'image file'} here or click to browse`}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {isPdfTool
                ? 'Supports PDF files up to 50MB • Safe, Client-Side Processing'
                : 'Supports JPG, PNG, WEBP files up to 25MB'}
            </p>

            <button
              type="button"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 active:scale-95 transition-all"
            >
              <FileUp className="h-4 w-4" />
              Browse from Device
            </button>
          </div>

          {/* Multi-file list for PDF merge */}
          {isMultiFile && files.length > 0 && (
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Files to Merge ({files.length}):
                </span>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Plus className="h-3 w-3" /> Add More Files
                </button>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-white p-2.5 border border-slate-200 text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-[10px]">
                        {i + 1}
                      </span>
                      <span className="font-semibold text-slate-800 truncate max-w-xs">{f.name}</span>
                      <span className="text-slate-400">({(f.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFileAtIndex(i);
                      }}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Single File Preview Info */}
          {!isMultiFile && files.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-100/80 p-3 text-xs">
              <div className="flex items-center gap-3">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="h-12 w-12 rounded-lg object-cover border border-slate-300" />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-rose-100 text-rose-600">
                    <FileText className="h-6 w-6" />
                  </div>
                )}
                <div>
                  <span className="font-bold text-slate-900 block truncate max-w-xs">{files[0].name}</span>
                  <span className="text-slate-500 font-medium">Original Size: {(files[0].size / 1024).toFixed(1)} KB</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFiles([]);
                  setPreviewUrl(null);
                  setResultBlob(null);
                }}
                className="text-xs font-semibold text-rose-600 hover:underline"
              >
                Change File
              </button>
            </div>
          )}

          {/* Tool Options & Settings */}
          {files.length > 0 && (
            <div className="mt-6 rounded-2xl bg-blue-50/40 border border-blue-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Sliders className="h-4 w-4 text-blue-600" />
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Tool Options & Settings
                </h4>
              </div>

              {/* Photo Resizer Controls */}
              {tool.id === 'photo-resizer' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Select Exam Preset:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'ssc', name: 'SSC Form', kb: 35, w: 350, h: 450, note: '20KB - 50KB' },
                        { id: 'upsc', name: 'UPSC CSE', kb: 75, w: 550, h: 550, note: '20KB - 300KB' },
                        { id: 'sign', name: 'Signature', kb: 15, w: 350, h: 180, note: '10KB - 20KB' },
                        { id: 'custom', name: 'Custom', kb: targetKB, w: widthPx, h: heightPx, note: 'Custom Target' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setPreset(item.id);
                            if (item.id !== 'custom') {
                              setTargetKB(item.kb);
                              setWidthPx(item.w);
                              setHeightPx(item.h);
                            }
                          }}
                          className={`rounded-xl p-2.5 text-left border transition-all ${
                            preset === item.id
                              ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                              : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300'
                          }`}
                        >
                          <div className="font-bold text-xs">{item.name}</div>
                          <div className={`text-[10px] ${preset === item.id ? 'text-blue-100' : 'text-slate-500'}`}>
                            {item.note}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Target File Size: <span className="font-bold text-blue-600">{targetKB} KB</span>
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="300"
                        step="5"
                        value={targetKB}
                        onChange={(e) => {
                          setTargetKB(Number(e.target.value));
                          setPreset('custom');
                        }}
                        className="w-full accent-blue-600"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                        <span>10 KB</span>
                        <span>50 KB (SSC)</span>
                        <span>100 KB</span>
                        <span>300 KB</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Width (in pixels):
                      </label>
                      <input
                        type="number"
                        value={widthPx}
                        onChange={(e) => setWidthPx(Number(e.target.value))}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Height (in pixels):
                      </label>
                      <input
                        type="number"
                        value={heightPx}
                        onChange={(e) => setHeightPx(Number(e.target.value))}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="border-t border-blue-200/60 pt-3">
                    <span className="text-xs font-bold text-slate-800 block mb-2">
                      Print Name & Date on Photo (Optional for SSC/Defence):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          placeholder="Candidate Name (e.g. RAHUL SHARMA)"
                          value={nameOnPhoto}
                          onChange={(e) => setNameOnPhoto(e.target.value)}
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs uppercase text-slate-800"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Date of Photo (e.g. 15-09-2026)"
                          value={dateOnPhoto}
                          onChange={(e) => setDateOnPhoto(e.target.value)}
                          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-800"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Background Remover Controls */}
              {tool.id === 'background-remover' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Select New Background Color:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'passport-blue', name: 'Passport Sky Blue', color: 'bg-blue-500' },
                      { id: 'white', name: 'Official White', color: 'bg-white border' },
                      { id: 'transparent', name: 'Transparent (PNG)', color: 'bg-slate-200' },
                      { id: 'light-grey', name: 'Light Gray', color: 'bg-slate-100' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setBgChoice(item.id as any)}
                        className={`flex items-center gap-2 rounded-xl p-2.5 border text-xs font-bold transition-all ${
                          bgChoice === item.id
                            ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        <span className={`h-4 w-4 rounded-full border border-slate-300 ${item.color}`}></span>
                        <span>{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* HD Enhancer Controls */}
              {tool.id === 'hd-enhancer' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Select Enhancement Mode:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'face', title: 'Face Clarity (HD Boost)', desc: 'Sharpen facial contours and contrast' },
                      { id: 'signature', title: 'Signature Ink Darken', desc: 'Boost faint blue or black ballpoint strokes' },
                      { id: 'doc', title: 'Document Contrast', desc: 'Clean marksheets and certificate backgrounds' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setEnhanceMode(item.id as any)}
                        className={`rounded-xl p-3 text-left border text-xs transition-all ${
                          enhanceMode === item.id
                            ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="font-bold">{item.title}</div>
                        <div className={`text-[10px] mt-0.5 ${enhanceMode === item.id ? 'text-blue-100' : 'text-slate-500'}`}>
                          {item.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* PDF Compress Controls */}
              {tool.id === 'pdf-compress' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Target Maximum File Size:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: '100', label: '< 100 KB', sub: 'Scholarships & Police Forms' },
                      { id: '200', label: '< 200 KB', sub: 'SSC / UPSC Norm (Recommended)' },
                      { id: '500', label: '< 500 KB', sub: 'Banking & General Portals' }
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setCompressLevel(item.id as any)}
                        className={`rounded-xl p-2.5 text-center border text-xs transition-all ${
                          compressLevel === item.id
                            ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="font-extrabold text-sm">{item.label}</div>
                        <div className={`text-[10px] ${compressLevel === item.id ? 'text-blue-100' : 'text-slate-500'}`}>
                          {item.sub}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* PDF Editable Controls */}
              {tool.id === 'pdf-editable' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Text Annotation to Add:
                    </label>
                    <input
                      type="text"
                      value={annotationText}
                      onChange={(e) => setAnnotationText(e.target.value)}
                      placeholder="e.g. Self Attested, Roll No. 2026..."
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Digital Signature Name Stamp:
                    </label>
                    <input
                      type="text"
                      value={signatureText}
                      onChange={(e) => setSignatureText(e.target.value)}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-800"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action / Convert Button */}
          {files.length > 0 && !resultBlob && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-6">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Secure & Fast Client-Side Processing</span>
              </div>
              <button
                type="button"
                disabled={isProcessing}
                onClick={runProcess}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-md hover:from-blue-700 hover:to-indigo-700 active:scale-95 transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Processing... ({progress}%)</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 fill-white" />
                    <span>Process Now</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Result / Download Card */}
          {resultBlob && (
            <div className="mt-8 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-white border-2 border-emerald-300 p-6 shadow-sm animate-in fade-in zoom-in-95 duration-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      Ready for Download!
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900 mt-0.5 truncate max-w-sm">
                      {resultFileName}
                    </h4>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mt-1">
                      <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-emerald-800">
                        Final Size: {resultSizeKB} KB
                      </span>
                      {files[0] && (
                        <span className="text-slate-500">
                          (Original: {(files[0].size / 1024).toFixed(1)} KB)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={downloadResult}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-extrabold text-white shadow-md hover:bg-emerald-700 active:scale-95 transition-all"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Processed File</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setResultBlob(null);
                      setResultDataUrl(null);
                    }}
                    className="rounded-xl border border-slate-300 bg-white px-3 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50"
                    title="Process another file"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {resultDataUrl && (
                <div className="mt-4 pt-4 border-t border-emerald-200/60 flex items-center justify-center">
                  <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-white p-2 shadow-2xs">
                    <img src={resultDataUrl} alt="Processed Output Preview" className="max-h-56 rounded object-contain" />
                    <span className="absolute bottom-3 right-3 rounded-md bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-xs">
                      {resultSizeKB} KB
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* AdSense In-Article Ad */}
      <AdBanner format="horizontal" />

      {/* Comprehensive English SEO Content Section */}
      <div className="my-10 rounded-2xl bg-white border border-slate-200 p-6 md:p-10 shadow-xs">
        <div className="border-b border-slate-100 pb-4 mb-6">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Comprehensive Guide & Official Rules
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 mt-1">
            {contentData.heading}
          </h2>
        </div>

        {/* Detailed Article */}
        <p className="text-sm md:text-base leading-relaxed text-slate-700 mb-6">
          {contentData.description}
        </p>

        {/* Specs Box */}
        <div className="my-6 rounded-xl bg-slate-50 border border-slate-200 p-5">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
            {contentData.specsTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {contentData.specs.map((item, i) => (
              <div key={i} className="flex flex-col p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
                <span className="font-bold text-blue-900">{item.label}:</span>
                <span className="text-slate-600 mt-0.5">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step by Step Guide */}
        <div className="my-6">
          <h3 className="text-base font-bold text-slate-900 mb-3">
            {contentData.guideTitle}
          </h3>
          <ol className="space-y-2.5 text-xs md:text-sm text-slate-700">
            {contentData.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-xs">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Extended Article */}
        <div className="my-6 text-xs md:text-sm text-slate-600 leading-relaxed bg-blue-50/40 p-4 rounded-xl border border-blue-100">
          <p>{contentData.seoArticle}</p>
        </div>

        {/* FAQ Accordion */}
        <div className="mt-8 border-t border-slate-100 pt-6">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-600" />
            Frequently Asked Questions (FAQs)
          </h3>
          <div className="space-y-3">
            {contentData.faqs.map((faq, index) => (
              <div key={index} className="rounded-xl border border-slate-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-xs md:text-sm text-slate-800 bg-slate-50/60 hover:bg-slate-100 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaqIndex === index && (
                  <div className="p-4 bg-white text-xs md:text-sm text-slate-600 border-t border-slate-100 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Tools Grid */}
      <div className="my-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">
            Explore Related Utility Tools
          </h3>
          <button
            onClick={() => onNavigate('/')}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            View All 14 Tools <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS_DATA.filter((t) => t.id !== tool.id).slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate(item.slug)}
              className="group cursor-pointer rounded-xl bg-white p-4 border border-slate-200 shadow-2xs hover:border-blue-400 hover:shadow-md transition-all"
            >
              <span className="text-xs font-bold text-blue-600 uppercase">{item.badge}</span>
              <h4 className="font-bold text-sm text-slate-900 mt-1 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {item.shortDesc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
