from django.http import Http404
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import filters

from api.models import Book
from api.serializers import BookSerializer1, BookSerializer



class BookLists(generics.ListCreateAPIView):
    serializer_class = BookSerializer
    # permission_classes = (AllowAny|ReadOnly,)    
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Book.objects.for_user(self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        

class BookListDetail(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = (AllowAny,)
    queryset = Book.objects.all()
    serializer_class = BookSerializer


