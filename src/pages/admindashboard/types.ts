export type AppointmentStatus = "Confirmado" | "Pendente" | "Cancelado";

export type Appointment = {
  time: string;
  period: string;
  patient: string;
  status: AppointmentStatus;
};
