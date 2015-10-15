from rest_framework import serializers
from .models import Libro
from autores.serializers import AutorSerializer


class LibroSerializer(serializers.ModelSerializer):
    autor = AutorSerializer()

    class Meta:
        model = Libro
        fields = ('id', 'nombre', 'editorial', 'genero', 'autor',)
