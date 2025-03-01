"use client";

import { useEffect } from "react";

interface ServiceWorkerLoaderProps {
  children: React.ReactNode;
}

const ServiceWorkerLoader: React.FC<ServiceWorkerLoaderProps> = ({
  children,
}) => {
  const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js");
        console.log("Service Worker registered successfully:", registration);
      } catch (error) {
        console.error("Service Worker registration failed:", error);
      }
    }
  };

  useEffect(() => {
    registerServiceWorker();
  }, []);

  return <>{children}</>;
};

export default ServiceWorkerLoader;
