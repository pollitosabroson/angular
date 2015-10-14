from django.db import models

from autores.models import Autor


class Libro(models.Model):
    nombre = models.TextField(max_length=100)
    editorial = models.TextField(max_length=100)
    genero = models.TextField(max_length=100)
    autor = models.ForeignKey(
        Autor,
        null=True
    )

    def __unicode__(self):
        return self.nombre
