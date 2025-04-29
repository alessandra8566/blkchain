import { create } from "zustand"
import { LoadingDialogProps } from "@/components/dialog/loading-dialog"

type LoadingDialogState = {
  setLoadingDialogState: (props: LoadingDialogProps) => void
  openState: LoadingDialogProps
}

export const useLoadingDialogState = create<LoadingDialogState>()((set) => ({
  openState: {
    isLoading: false,
  },
  setLoadingDialogState: (openState: LoadingDialogProps) => set({ openState }),
}))
