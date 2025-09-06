"use client";

export { Button } from "@carbon/react";
export type { ButtonProps } from "@carbon/react";

// Default export uyumluluğu için Carbon Button'ı aliaslayıp dışa aktar.
import { Button as CarbonButton } from "@carbon/react";
export default CarbonButton;

