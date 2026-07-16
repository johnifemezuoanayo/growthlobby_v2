"use client";

import { Calendar, Clock, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { timeSlots } from "./data";

type ScheduleModalProps = {
  isOpen: boolean;
  selectedDate: string | null;
  selectedTime: string | null;
  isScheduled: boolean;
  daysAhead: Date[];
  onClose: () => void;
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
  onSubmit: () => void;
};

export function ScheduleModal({
  isOpen,
  selectedDate,
  selectedTime,
  isScheduled,
  daysAhead,
  onClose,
  onSelectDate,
  onSelectTime,
  onSubmit,
}: ScheduleModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg rounded-[2rem] border border-neutral-800 bg-[#0f110f] p-6 text-white shadow-2xl md:p-8"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 cursor-pointer p-1 text-neutral-400 transition-colors hover:text-white"
              aria-label="Close scheduling modal"
            >
              <X className="size-5" />
            </button>

            {!isScheduled ? (
              <div className="flex flex-col gap-6">
                <div>
                  <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#1b221b] px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-primary">
                    <Calendar className="size-3.5" /> Direct Booking
                  </div>
                  <h3 className="text-xl font-extrabold tracking-tight text-white md:text-2xl">
                    Schedule an Exploration Call
                  </h3>
                  <p className="mt-1 text-xs text-neutral-400">
                    Select a date and time slot that fits your schedule. Our
                    strategy call is free with no commitment.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                    1. Select Date
                  </span>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {daysAhead.map((date) => {
                      const dateValue = date.toISOString().split("T")[0];
                      const isSelected = selectedDate === dateValue;

                      return (
                        <button
                          key={dateValue}
                          onClick={() => onSelectDate(dateValue)}
                          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border p-2.5 text-center transition-all ${
                            isSelected
                              ? "scale-[1.03] border-brand-primary bg-brand-primary font-bold text-black"
                              : "border-neutral-800 bg-[#161a16] text-neutral-300 hover:border-neutral-700"
                          }`}
                        >
                          <span className="text-[10px] uppercase tracking-wider opacity-75">
                            {date.toLocaleDateString("en-US", {
                              weekday: "short",
                            })}
                          </span>
                          <span className="text-sm font-bold">
                            {date.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                    2. Select Time
                  </span>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {timeSlots.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          disabled={!selectedDate}
                          onClick={() => onSelectTime(time)}
                          className={`cursor-pointer rounded-xl border p-2.5 text-center text-xs font-semibold uppercase tracking-wider transition-all disabled:cursor-not-allowed disabled:opacity-30 ${
                            isSelected
                              ? "border-brand-primary bg-brand-primary font-bold text-black"
                              : "border-neutral-800 bg-[#161a16] text-neutral-300 hover:border-neutral-700"
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-neutral-800 bg-[#161a16] p-4">
                  <Clock className="mt-0.5 size-5 shrink-0 text-brand-primary" />
                  <div className="text-left text-xs">
                    <span className="block font-bold text-white">
                      Strategy Session
                    </span>
                    <span className="mt-0.5 block text-neutral-400">
                      30 Min - Video Call
                    </span>
                    {selectedDate && selectedTime ? (
                      <span className="mt-1 block font-bold text-brand-primary">
                        Selected:{" "}
                        {new Date(selectedDate).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        at {selectedTime}
                      </span>
                    ) : (
                      <span className="mt-1 block text-neutral-500">
                        Please select date and time above
                      </span>
                    )}
                  </div>
                </div>

                <button
                  disabled={!selectedDate || !selectedTime}
                  onClick={onSubmit}
                  className="w-full cursor-pointer rounded-xl bg-brand-primary py-4 text-center text-xs font-extrabold uppercase tracking-widest text-black transition-all disabled:bg-neutral-800 disabled:text-neutral-500"
                >
                  Confirm Schedule
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-6 py-8 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-emerald-950 text-brand-primary">
                  <div className="size-8 animate-spin rounded-full border-3 border-brand-primary border-t-transparent" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Securing Your Slot...</h4>
                  <p className="mt-2 text-xs text-neutral-400">
                    Booking call for {selectedDate} at {selectedTime}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
