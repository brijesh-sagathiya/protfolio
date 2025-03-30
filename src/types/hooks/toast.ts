import { ToastActionElement, ToastProps } from '@/types/components';

/**
 * Extended toast props with ID
 */
export interface ToasterToast extends ToastProps {
  id: string;
  title?: string;
  description?: string;
  action?: ToastActionElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * Toast action types
 */
export const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const;

/**
 * Type for action types
 */
export type ActionType = typeof actionTypes;

/**
 * Toast action union type
 */
export type Action =
  | {
      type: ActionType['ADD_TOAST'];
      toast: ToasterToast;
    }
  | {
      type: ActionType['UPDATE_TOAST'];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType['DISMISS_TOAST'];
      toastId?: ToasterToast['id'];
    }
  | {
      type: ActionType['REMOVE_TOAST'];
      toastId?: ToasterToast['id'];
    };

/**
 * Toast state interface
 */
export interface State {
  toasts: ToasterToast[];
}

/**
 * Toast without ID
 */
export type Toast = Omit<ToasterToast, 'id'>;
