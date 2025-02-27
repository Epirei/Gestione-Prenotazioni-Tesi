import json
from django.http import JsonResponse
from django.views import View
from django.shortcuts import get_object_or_404
from django.utils.timezone import now
from django.contrib.auth.models import User
from .models import BookingPlan, BookingSlot, BookingReservation
from django.forms.models import model_to_dict


class BookingPlanListView(View):
    """ Restituisce tutti i piani di prenotazione disponibili. """
    def get(self, request):
        plans = BookingPlan.objects.all().values("id", "name", "description")
        response=JsonResponse(list(plans), safe=False)
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response

class BookingSlotListView(View):
    """ Restituisce tutti gli slot disponibili per un determinato piano. """
    def get(self, request, plan_id):

        for slot in BookingSlot.objects.all():
            print(slot)
            print(model_to_dict(slot))
        slots = BookingSlot.objects.filter(
            booking_plan_id=plan_id,
        ).values("id","subject","booking_plan", "description", "available_seats", "date_opening", "date_closing")
        
        response=JsonResponse(list(slots), safe=False)
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response

class BookingReservationView(View):
    """ Permette a un utente di effettuare una prenotazione. """
    def post(self, request):
        try:
            data = json.loads(request.body)
            user_id = data.get("user_id")
            slot_id = data.get("slot_id")
            thesis_name = data.get("thesis_name")

            user = get_object_or_404(User, id=user_id)
            slot = get_object_or_404(BookingSlot, id=slot_id)

            # Controllo se i posti sono ancora disponibili
            if slot.available_seats <= 0:
                return JsonResponse({"error": "Posti esauriti"}, status=400)

            # Controllo se l'utente ha già prenotato questo slot
            if BookingReservation.objects.filter(user=user, booking_slot=slot).exists():
                return JsonResponse({"error": "Hai già prenotato questo slot"}, status=400)

            # Creazione della prenotazione
            reservation = BookingReservation.objects.create(user=user, booking_slot=slot, thesis_name=thesis_name)

            # Riduzione dei posti disponibili
            slot.available_seats -= 1
            slot.save()

            return JsonResponse({
                "message": "Prenotazione effettuata",
                "reservation_code": reservation.reservation_code
            }, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Dati non validi"}, status=400)
class BookingReservationListView(View):
    """ Restituisce tutte le prenotazioni effettuate da un utente. """
    def get(self, request, user_id):
        reservations = BookingReservation.objects.filter(user_id=user_id).values("id", "reservation_code", "booking_slot", "thesis_name")
        response=JsonResponse(list(reservations), safe=False)
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response
class TeacherListView(View):
    """ Restituisce le prenotazioni effettuate per un determinato docente. """
    def get(self, request, teacher):
        reservations = BookingSlot.objects.filter(tutor=teacher).values("id", "tutor", "subject", "booking_plan", "description", "available_seats", "date_opening", "date_closing")
        response=JsonResponse(list(reservations), safe=False)
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response