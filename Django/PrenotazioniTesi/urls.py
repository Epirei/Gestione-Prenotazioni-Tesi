from django.urls import path
from . import views
from .views import BookingPlanListView, BookingSlotListView, BookingReservationView

urlpatterns = [
    path('booking_plans/', views.booking_plans_view, name='booking_plans'),
    path('profile/', views.profile_view, name='profile'),
    path('thesis/', views.thesis_view, name='thesis'),
    path('booking_plans/subject_selection/<int:plan_id>/', views.subject_selection_view, name='subject_selection'),
    path('api/booking-plans/', BookingPlanListView.as_view(), name='booking_plans'),
    path('api/booking-slots/<int:plan_id>/', BookingSlotListView.as_view(), name='booking_slots'),
    path('api/booking-reservations/', BookingReservationView.as_view(), name='booking_reservation'),
]