export type ReservationType = "CASA" | "QUARTO" | "CAMA";
export type ReservationStatus = "CONFIRMADA" | "PENDENTE" | "CANCELADA";

export interface ReservationRecord {
  id: string;
  type: ReservationType;
  status: ReservationStatus;
  startAt: Date;
  endAt: Date;
  houseId?: string;
  roomId?: string;
  bedId?: string;
  roomHouseId?: string;
  bedRoomId?: string;
  bedHouseId?: string;
}

export interface ReservationPayload {
  type: ReservationType;
  startAt: Date;
  endAt: Date;
  houseId?: string;
  roomId?: string;
  bedId?: string;
}

export function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date) {
  return aStart < bEnd && aEnd > bStart;
}

export function findConflicts(
  payload: ReservationPayload,
  existing: ReservationRecord[]
): ReservationRecord[] {
  if (payload.endAt <= payload.startAt) {
    throw new Error("endAt must be after startAt");
  }

  return existing.filter((reservation) => {
    if (reservation.status !== "CONFIRMADA") {
      return false;
    }

    const isOverlapping = overlaps(
      payload.startAt,
      payload.endAt,
      reservation.startAt,
      reservation.endAt
    );

    if (!isOverlapping) return false;

    if (payload.type === "CASA") {
      return (
        reservation.houseId === payload.houseId ||
        reservation.roomHouseId === payload.houseId ||
        reservation.bedHouseId === payload.houseId
      );
    }

    if (payload.type === "QUARTO") {
      return (
        reservation.houseId === payload.houseId ||
        reservation.roomId === payload.roomId ||
        reservation.bedRoomId === payload.roomId
      );
    }

    return (
      reservation.houseId === payload.houseId ||
      reservation.roomId === payload.roomId ||
      reservation.bedId === payload.bedId
    );
  });
}
