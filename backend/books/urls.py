# books/urls.py

from django.urls import path
from .views import RegisterView, BookListCreateView,  BookRetrieveUpdateDestroyView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('books/', BookListCreateView.as_view(), name='book-list-create'),
    path('books/<int:pk>/', BookRetrieveUpdateDestroyView.as_view(), name='book-id') # GET, PUT, DELETE
]
