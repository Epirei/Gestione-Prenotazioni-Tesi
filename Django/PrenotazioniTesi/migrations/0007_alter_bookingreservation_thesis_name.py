# Generated by Django 4.2.15 on 2025-02-28 11:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PrenotazioniTesi', '0006_remove_bookingslot_tutor_alter_bookingslot_subject'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bookingreservation',
            name='thesis_name',
            field=models.CharField(max_length=255),
        ),
    ]
