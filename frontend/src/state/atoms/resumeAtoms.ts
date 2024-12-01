import { atom } from "recoil";

// Atom for storing uploaded file
export const uploadedFileState = atom<File | null>({
  key: "uploadedFileState",
  default: null,
});

// Atom for storing roast result
export const roastResultState = atom<string | null>({
  key: "roastResultState",
  default: null,
});
