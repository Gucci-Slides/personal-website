import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Debounce function: Limits the rate at which a function can fire.
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this;
    
    const later = function() {
      timeoutId = null;
      func.apply(context, args);
    };
    
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(later, wait);
  };
}
