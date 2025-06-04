'use client';

import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';

interface Appointment {
  id: string;
  title: string;
  date: Date;
  type: 'gestante' | 'lactante' | 'bajo-peso' | 'sobre-peso' | 'gemelar';
}

interface CalendarProps {
  appointments: Appointment[];
  onDateSelect: (date: Date) => void;
  onAppointmentClick: (appointment: Appointment) => void;
}

export default function Calendar({
  appointments,
  onDateSelect,
  onAppointmentClick,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const previousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const getAppointmentsForDay = (date: Date) =>
    appointments.filter((appointment) =>
      isSameDay(new Date(appointment.date), date)
    );

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={previousMonth}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronLeftIcon className="h-5 w-5 text-gray-400" />
        </button>
        <h2 className="text-xl font-semibold text-white">
          {format(currentMonth, 'MMMM yyyy', { locale: es })}
        </h2>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronRightIcon className="h-5 w-5 text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
          <div key={day} className="text-center text-sm text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, dayIdx) => {
          const dayAppointments = getAppointmentsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);

          return (
            <div
              key={day.toString()}
              className={`
                min-h-[100px] p-2 border border-gray-700 rounded-lg
                ${isCurrentMonth ? 'bg-gray-800' : 'bg-gray-900'}
                hover:bg-gray-700 transition-colors cursor-pointer
              `}
              onClick={() => onDateSelect(day)}
            >
              <span className={`text-sm ${
                isCurrentMonth ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {format(day, 'd')}
              </span>
              
              <div className="mt-1 space-y-1">
                {dayAppointments.map((appointment) => (
                  <button
                    key={appointment.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onAppointmentClick(appointment);
                    }}
                    className={`
                      w-full text-left text-xs p-1 rounded
                      ${appointment.type === 'gestante' ? 'bg-blue-900 text-blue-200' :
                        appointment.type === 'lactante' ? 'bg-green-900 text-green-200' :
                        appointment.type === 'bajo-peso' ? 'bg-yellow-900 text-yellow-200' :
                        appointment.type === 'sobre-peso' ? 'bg-red-900 text-red-200' :
                        'bg-purple-900 text-purple-200'}
                    `}
                  >
                    {appointment.title}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}