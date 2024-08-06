import { RoundStatus } from "@/enums/roundStatus";
import type { ProposedLetter } from "@/types/ProposedLetter";

export type CompareWordsResult = {
  status: RoundStatus;
  proposedWord: ProposedLetter[];
};
