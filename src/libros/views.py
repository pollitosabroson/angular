from .models import Libro, Autor
from .serializers import LibroSerializer
from rest_framework import viewsets


class LibroViewSet(viewsets.ModelViewSet):
    serializer_class = LibroSerializer
    queryset = Libro.objects.all()
