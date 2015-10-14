from .models import Autor
from .serializers import AutorSerializer
from rest_framework import viewsets


class AutorViewSet(viewsets.ModelViewSet):

    serializer_class = AutorSerializer
    queryset = Autor.objects.all()
