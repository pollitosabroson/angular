from django.conf import settings
from django.conf.urls import patterns, url, include
from django.conf.urls.static import static

from . import views # noqa

from libros.views import LibroViewSet
from autores.views import AutorViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'libros', LibroViewSet)
router.register(r'autores', AutorViewSet)


if getattr(settings, 'ALLOW_SERVE_STATIC_FILES', False):
    urlpatterns = static(
        settings.STATIC_URL, document_root=settings.STATIC_ROOT)

else:
    urlpatterns = patterns('',)


urlpatterns = patterns(
    '',
    url(r'^api/', include(router.urls)),
    url(r'^.*', views.AngularAppView.as_view(), name='app'),
)
