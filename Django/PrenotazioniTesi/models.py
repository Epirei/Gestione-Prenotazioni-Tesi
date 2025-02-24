import hashlib
import random
import string
from django.db import models
from django.contrib.auth.models import User, Group
from django.utils import timezone

class BookingPlan(models.Model):
    name = models.CharField(max_length=255)
    slot_name = models.CharField(
        max_length=255,
        help_text="Nome generico per gli slot (es. 'Materia/Docente')"
    )
    slot_description = models.CharField(
        max_length=255,
        blank=True,
        help_text="Descrizione/istruzioni per la scelta dello slot (es. 'Seleziona il nome della disciplina/Docente di tua scelta')"
    )
    allow_multiple_slots = models.BooleanField(
        default=False,
        help_text="Se True, l'utente può prenotare più di uno slot"
    )
    allowed_groups = models.ManyToManyField(Group, blank=True)

    def __str__(self):
        return self.name

class BookingSlot(models.Model):
    booking_plan = models.ForeignKey(
        BookingPlan,
        related_name='slots',
        on_delete=models.CASCADE
    )
    description = models.TextField()
    available_seats = models.PositiveIntegerField(default=0)
    date_opening = models.DateTimeField()
    date_closing = models.DateTimeField()

    def __str__(self):
        return f"{self.booking_plan.slot_name} - {self.description}"

class BookingReservation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    booking_slot = models.ForeignKey(
        BookingSlot,
        related_name='reservations',
        on_delete=models.CASCADE
    )
    timestamp = models.DateTimeField(auto_now_add=True)
    reservation_code = models.CharField(max_length=64, unique=True, blank=True)

    class Meta:
        unique_together = ('user', 'booking_slot')

    def save(self, *args, **kwargs):
        if not self.reservation_code:
            # Genera il reservation_code come hash di:
            # <plan_id>-<slot_id>-<user_id>-<timestamp>-<random_4_char>
            ts = timezone.now().strftime('%Y%m%d%H%M%S')
            random_str = ''.join(random.choices(string.ascii_letters + string.digits, k=4))
            base_str = f"{self.booking_slot.booking_plan.id}-{self.booking_slot.id}-{self.user.id}-{ts}-{random_str}"
            self.reservation_code = hashlib.sha256(base_str.encode()).hexdigest()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.booking_slot} ({self.reservation_code})"
 