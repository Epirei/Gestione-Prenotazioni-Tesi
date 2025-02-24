from django.urls import path
from .views import BookingPlanListView, BookingSlotListView, BookingReservationView

urlpatterns = [
    path('api/booking-plans/', BookingPlanListView.as_view(), name='booking_plans'),
    path('api/booking-slots/<int:plan_id>/', BookingSlotListView.as_view(), name='booking_slots'),
    path('api/booking-reservations/', BookingReservationView.as_view(), name='booking_reservation'),
]