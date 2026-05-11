export interface CrashSeed {
  gameHash: string;
  blockHash: string;
}

export interface CrashIntGenerationStepProps {
  stepNumber: number;
  seed: CrashSeed;
  hmac: string;
}
