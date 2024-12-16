import React from "react";
import { toast } from "sonner";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

type NotificationOptions = {
  duration?: number;
  position?: "top-right" | "top-left" | "top-center" | "bottom-center" | "bottom-right" | "bottom-left";
  icon?: React.ReactNode;
};

const ICONS = {
  success: <CheckCircleIcon className="w-6 h-6 text-success" />,
  loading: <div className="w-6 h-6 animate-spin rounded-full border-b-2 border-current" />,
  error: <ExclamationCircleIcon className="w-6 h-6 text-error" />,
  info: <InformationCircleIcon className="w-6 h-6 text-info" />,
  warning: <ExclamationTriangleIcon className="w-6 h-6 text-warning" />,
};

const DEFAULT_DURATION = 3000;

/**
 * Custom Notification utility using Sonner
 */
export const notification = {
  success(content: React.ReactNode, options?: NotificationOptions) {
    return toast.success(content, {
      duration: options?.duration || DEFAULT_DURATION,
      position: options?.position || "top-center",
      icon: options?.icon || ICONS.success,
      className: "bg-base-200 text-base-content",
    });
  },
  info(content: React.ReactNode, options?: NotificationOptions) {
    return toast(content, {
      duration: options?.duration || DEFAULT_DURATION,
      position: options?.position || "top-center",
      icon: options?.icon || ICONS.info,
      className: "bg-base-200 text-base-content",
    });
  },
  warning(content: React.ReactNode, options?: NotificationOptions) {
    return toast(content, {
      duration: options?.duration || DEFAULT_DURATION,
      position: options?.position || "top-center",
      icon: options?.icon || ICONS.warning,
      className: "bg-base-200 text-base-content",
    });
  },
  error(content: React.ReactNode, options?: NotificationOptions) {
    return toast.error(content, {
      duration: options?.duration || DEFAULT_DURATION,
      position: options?.position || "top-center",
      icon: options?.icon || ICONS.error,
      className: "bg-base-200 text-base-content",
    });
  },
  loading(content: React.ReactNode, options?: NotificationOptions) {
    return toast.loading(content, {
      duration: options?.duration || DEFAULT_DURATION,
      position: options?.position || "top-center",
      icon: options?.icon || ICONS.loading,
      className: "bg-base-200 text-base-content",
    });
  },
  remove(toastId: string | number) {
    toast.dismiss(toastId);
  },
};
