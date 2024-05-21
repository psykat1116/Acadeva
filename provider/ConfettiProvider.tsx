"use client";
import ReactConfetti from "react-confetti";
import { useConfetti } from "@/hook/useConfetti";

const ConfettiProvider = () => {
  const { isOpen, onClose } = useConfetti();

  if (!isOpen) return null;

  return (
    <ReactConfetti
      className="pointer-events-none z-[100]"
      numberOfPieces={500}
      recycle={false}
      onConfettiComplete={onClose}
    />
  );
};

export default ConfettiProvider;
