from django.shortcuts import render

# books/views.py

from rest_framework import generics, permissions
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, BookSerializer
from .models import Book

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticated]

# Retrieve, Update, Delete a single book (GET by ID, PUT, DELETE)
class BookRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticated]