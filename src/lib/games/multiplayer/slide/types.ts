export interface SlideSeed {
  slideHash: string;
  blockHash: string;
}

export interface SlideIntGenerationStepProps {
  stepNumber: number;
  seed: SlideSeed;
  hmac: string;
}
