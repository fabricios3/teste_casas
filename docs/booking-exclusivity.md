# Regras de exclusividade de reservas

## Regras principais
- Intervalos sobrepostos: `start < other_end` e `end > other_start`.
- Nunca permitir `endAt <= startAt`.
- Reserva de **Casa** bloqueia todas as reservas de Quartos e Camas da casa.
- Reserva de **Quarto** bloqueia todas as Camas do quarto.
- Reservas no mesmo alvo não podem se sobrepor.

## Pseudocódigo (checagem de conflitos)
```
function findConflicts({ type, houseId, roomId, bedId, startAt, endAt }) {
  assert(endAt > startAt)

  const baseFilter = {
    status: "CONFIRMADA",
    startAt: { lt: endAt },
    endAt: { gt: startAt }
  }

  if (type === "CASA") {
    return queryReservations({
      ...baseFilter,
      OR: [
        { houseId },
        { room: { houseId } },
        { bed: { room: { houseId } } }
      ]
    })
  }

  if (type === "QUARTO") {
    return queryReservations({
      ...baseFilter,
      OR: [
        { houseId },
        { roomId },
        { bed: { roomId } }
      ]
    })
  }

  return queryReservations({
    ...baseFilter,
    OR: [
      { houseId },
      { roomId },
      { bedId }
    ]
  })
}

function createReservation(payload) {
  const conflicts = findConflicts(payload)
  if (conflicts.length > 0) {
    return { status: 409, conflicts }
  }

  return createReservationTransaction(payload)
}
```

## Estrutura de resposta (erro)
```json
{
  "error": {
    "code": "RESERVATION_CONFLICT",
    "message": "Reserva conflita com período já confirmado.",
    "conflicts": [
      { "reservationId": "...", "type": "CASA", "startAt": "...", "endAt": "..." }
    ]
  }
}
```
