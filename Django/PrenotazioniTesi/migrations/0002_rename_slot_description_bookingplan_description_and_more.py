# Generated by Django 5.1.6 on 2025-02-26 10:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PrenotazioniTesi', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bookingplan',
            old_name='slot_description',
            new_name='description',
        ),
        migrations.RemoveField(
            model_name='bookingplan',
            name='slot_name',
        ),
        migrations.AddField(
            model_name='bookingslot',
            name='name',
            field=models.CharField(default='Nome/Docente', help_text="Nome generico per gli slot (es. 'Materia/Docente')", max_length=255),
            preserve_default=False,
        ),
    ]
