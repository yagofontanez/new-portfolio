let ctx: AudioContext | null = null;

const getCtx = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
};

interface ToneOptions {
  type?: OscillatorType;
  startFreq: number;
  endFreq?: number;
  durationMs: number;
  peakGain?: number;
}

const playTone = ({
  type = "sine",
  startFreq,
  endFreq,
  durationMs,
  peakGain = 0.06,
}: ToneOptions) => {
  const c = getCtx();
  if (!c) return;
  if (c.state === "suspended") c.resume();

  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  const now = c.currentTime;
  const end = now + durationMs / 1000;

  o.frequency.setValueAtTime(startFreq, now);
  if (endFreq && endFreq !== startFreq) {
    o.frequency.exponentialRampToValueAtTime(Math.max(1, endFreq), end);
  }

  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(peakGain, now + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, end);

  o.connect(g).connect(c.destination);
  o.start(now);
  o.stop(end + 0.02);
};

export const playClick = () =>
  playTone({ type: "triangle", startFreq: 1100, endFreq: 880, durationMs: 70, peakGain: 0.04 });

export const playPop = () =>
  playTone({ type: "sine", startFreq: 520, endFreq: 260, durationMs: 160, peakGain: 0.08 });

export const playClose = () =>
  playTone({ type: "sine", startFreq: 320, endFreq: 180, durationMs: 130, peakGain: 0.06 });
