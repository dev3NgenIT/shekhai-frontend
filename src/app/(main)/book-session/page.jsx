"use client";

import ActiveSessions from "@/components/book-session/ActiveSessions";
import LiveSessionCard from "@/components/book-session/LiveSessionCard";
import RegistrationModal from "@/components/book-session/RegistrationModal";
import SuccessModal from "@/components/book-session/SuccessModal";
import UpcomingSessions from "@/components/book-session/UpcomingSessions";
import { useState } from "react";

const SessionBookingPage = () => {
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleRegisterClick = () => {
    setIsRegistrationModalOpen(true);
  };

  const handleRegistrationSubmit = () => {
    setIsRegistrationModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleCloseRegistrationModal = () => {
    setIsRegistrationModalOpen(false);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <div className="mx-auto min-h-screen max-w-4xl bg-gray-50 p-6">
      <h1 className="mb-8 text-3xl font-bold text-[#3B5998]">
        Join/ Book a Session
      </h1>

      <LiveSessionCard />

      <ActiveSessions onRegisterClick={handleRegisterClick} />

      <UpcomingSessions />

      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={handleCloseRegistrationModal}
        onSubmit={handleRegistrationSubmit}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
      />
    </div>
  );
};

export default SessionBookingPage;
