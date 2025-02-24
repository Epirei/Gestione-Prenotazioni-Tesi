import json
from django.http import JsonResponse
from django.views import View
from django.shortcuts import get_object_or_404
from django.utils.timezone import now
from django.contrib.auth.models import User
from .models import BookingPlan, BookingSlot, BookingReservation

class BookingPlanListView(View):
    """ Restituisce tutti i piani di prenotazione disponibili. """
    def get(self, request):
        plans = BookingPlan.objects.all().values("id", "name", "slot_name", "slot_description")
        return JsonResponse({"booking_plans": list(plans)}, safe=False)

class BookingSlotListView(View):
    """ Restituisce tutti gli slot disponibili per un determinato piano. """
    def get(self, request, plan_id):
        slots = BookingSlot.objects.filter(
            booking_plan_id=plan_id,
            date_opening__lte=now(),
            date_closing__gte=now(),
            available_seats__gt=0
        ).values("id", "description", "available_seats", "date_opening", "date_closing")

        return JsonResponse({"slots": list(slots)}, safe=False)

class BookingReservationView(View):
    """ Permette a un utente di effettuare una prenotazione. """
    def post(self, request):
        try:
            data = json.loads(request.body)
            user_id = data.get("user_id")
            slot_id = data.get("slot_id")

            user = get_object_or_404(User, id=user_id)
            slot = get_object_or_404(BookingSlot, id=slot_id)

            # Controllo se i posti sono ancora disponibili
            if slot.available_seats <= 0:
                return JsonResponse({"error": "Posti esauriti"}, status=400)

            # Controllo se l'utente ha già prenotato questo slot
            if BookingReservation.objects.filter(user=user, booking_slot=slot).exists():
                return JsonResponse({"error": "Hai già prenotato questo slot"}, status=400)

            # Creazione della prenotazione
            reservation = BookingReservation.objects.create(user=user, booking_slot=slot)

            # Riduzione dei posti disponibili
            slot.available_seats -= 1
            slot.save()

            return JsonResponse({
                "message": "Prenotazione effettuata",
                "reservation_code": reservation.reservation_code
            }, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Dati non validi"}, status=400)
