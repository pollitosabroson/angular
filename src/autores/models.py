from django.db import models


class Autor(models.Model):
    nombre = models.TextField(max_length=100)
    apellido = models.TextField(max_length=100)

    def __unicode__(self):
        return self.nombre
