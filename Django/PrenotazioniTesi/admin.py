from django.contrib import admin

# Register your models here.
from .models import BookingPlan, BookingReservation, BookingSlot
admin.site.register([BookingSlot,BookingPlan,BookingReservation])