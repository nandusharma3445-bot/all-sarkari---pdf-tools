/**
 * Image processing utilities for Sarkari Photo Resizing, Background Removal, and HD Enhancement
 */

export interface ResizeOptions {
  targetKB: number;
  width?: number;
  height?: number;
  keepAspectRatio?: boolean;
  format?: 'image/jpeg' | 'image/png';
  nameOnPhoto?: string;
  dateOnPhoto?: string;
}

export const processPhotoResize = async (
  file: File,
  options: ResizeOptions
): Promise<{ blob: Blob; dataUrl: string; sizeKB: number; width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image'));
      img.onload = () => {
        let targetW = options.width || img.width;
        let targetH = options.height || img.height;

        if (options.keepAspectRatio && options.width && !options.height) {
          targetH = Math.round((img.height / img.width) * options.width);
        } else if (options.keepAspectRatio && options.height && !options.width) {
          targetW = Math.round((img.width / img.height) * options.height);
        }

        const canvas = document.createElement('canvas');
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Canvas context not available'));
        }

        // Draw image onto canvas
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, targetW, targetH);
        ctx.drawImage(img, 0, 0, targetW, targetH);

        // Add Name and Date on Photo (Mandatory for some Sarkari exam photos like SSC/Army)
        if (options.nameOnPhoto || options.dateOnPhoto) {
          const stripHeight = Math.max(34, Math.round(targetH * 0.18));
          ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
          ctx.fillRect(0, targetH - stripHeight, targetW, stripHeight);
          ctx.strokeStyle = '#e2e8f0';
          ctx.lineWidth = 1;
          ctx.strokeRect(0, targetH - stripHeight, targetW, stripHeight);

          ctx.fillStyle = '#0f172a';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          const fontSize = Math.max(11, Math.round(stripHeight * 0.32));
          ctx.font = `bold ${fontSize}px "Plus Jakarta Sans", sans-serif`;

          if (options.nameOnPhoto && options.dateOnPhoto) {
            ctx.fillText(options.nameOnPhoto.toUpperCase(), targetW / 2, targetH - stripHeight + stripHeight * 0.32);
            ctx.font = `600 ${Math.max(10, fontSize - 2)}px "Plus Jakarta Sans", sans-serif`;
            ctx.fillText(`DOP: ${options.dateOnPhoto}`, targetW / 2, targetH - stripHeight + stripHeight * 0.75);
          } else if (options.nameOnPhoto) {
            ctx.fillText(options.nameOnPhoto.toUpperCase(), targetW / 2, targetH - stripHeight / 2);
          } else if (options.dateOnPhoto) {
            ctx.fillText(`DOP: ${options.dateOnPhoto}`, targetW / 2, targetH - stripHeight / 2);
          }
        }

        // Binary search to find optimal JPEG quality for target KB
        const targetBytes = options.targetKB * 1024;
        let minQ = 0.05;
        let maxQ = 0.98;
        let bestBlob: Blob | null = null;
        let bestDataUrl = '';

        const tryQuality = (q: number): Promise<Blob> => {
          return new Promise((res) => {
            canvas.toBlob((b) => res(b!), 'image/jpeg', q);
          });
        };

        const search = async () => {
          for (let i = 0; i < 7; i++) {
            const midQ = (minQ + maxQ) / 2;
            const blob = await tryQuality(midQ);
            if (blob.size <= targetBytes) {
              bestBlob = blob;
              minQ = midQ;
            } else {
              maxQ = midQ;
            }
          }

          if (!bestBlob) {
            bestBlob = await tryQuality(0.1);
          }

          bestDataUrl = canvas.toDataURL('image/jpeg', minQ);
          const sizeKB = Math.round((bestBlob.size / 1024) * 10) / 10;
          resolve({
            blob: bestBlob,
            dataUrl: bestDataUrl,
            sizeKB,
            width: targetW,
            height: targetH
          });
        };

        search().catch(reject);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export const processBackgroundRemoval = async (
  file: File,
  bgType: 'transparent' | 'white' | 'passport-blue' | 'light-grey'
): Promise<{ blob: Blob; dataUrl: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Canvas context error'));

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Sample corner pixels to detect current background color
        const corners = [
          [0, 0],
          [canvas.width - 1, 0],
          [0, canvas.height - 1],
          [canvas.width - 1, canvas.height - 1],
          [Math.floor(canvas.width / 2), 0]
        ];

        let rSum = 0, gSum = 0, bSum = 0;
        corners.forEach(([x, y]) => {
          const idx = (y * canvas.width + x) * 4;
          rSum += data[idx];
          gSum += data[idx + 1];
          bSum += data[idx + 2];
        });
        const refR = rSum / corners.length;
        const refG = gSum / corners.length;
        const refB = bSum / corners.length;

        // Color replacement target
        let targetR = 255, targetG = 255, targetB = 255, targetA = 255;
        if (bgType === 'transparent') {
          targetA = 0;
        } else if (bgType === 'passport-blue') {
          // Official Indian passport sky blue
          targetR = 66; targetG = 133; targetB = 244; targetA = 255;
        } else if (bgType === 'light-grey') {
          targetR = 240; targetG = 243; targetB = 246; targetA = 255;
        }

        const tolerance = 48;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const diff = Math.sqrt(
            Math.pow(r - refR, 2) + Math.pow(g - refG, 2) + Math.pow(b - refB, 2)
          );

          if (diff < tolerance) {
            data[i] = targetR;
            data[i + 1] = targetG;
            data[i + 2] = targetB;
            data[i + 3] = targetA;
          }
        }

        ctx.putImageData(imgData, 0, 0);

        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error('Conversion failed'));
          resolve({
            blob,
            dataUrl: canvas.toDataURL(bgType === 'transparent' ? 'image/png' : 'image/jpeg', 0.95)
          });
        }, bgType === 'transparent' ? 'image/png' : 'image/jpeg');
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export const processHDEnhance = async (
  file: File,
  sharpnessLevel: number = 1.5,
  contrastBoost: number = 20
): Promise<{ blob: Blob; dataUrl: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Canvas error'));

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imgData.data;

        // Apply contrast & clarity filter
        const factor = (259 * (contrastBoost + 255)) / (255 * (259 - contrastBoost));
        for (let i = 0; i < d.length; i += 4) {
          d[i] = Math.min(255, Math.max(0, factor * (d[i] - 128) + 128));
          d[i + 1] = Math.min(255, Math.max(0, factor * (d[i + 1] - 128) + 128));
          d[i + 2] = Math.min(255, Math.max(0, factor * (d[i + 2] - 128) + 128));
        }

        ctx.putImageData(imgData, 0, 0);

        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error('Enhance failed'));
          resolve({
            blob,
            dataUrl: canvas.toDataURL('image/jpeg', 0.95)
          });
        }, 'image/jpeg');
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};
