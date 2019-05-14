from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.models import Book, ShopList, Contact
from api.serializers import BookSerializer1, BookSerializer, ContactSerializer
from django.views.generic import ListView, DetailView 


class ContactList(APIView): 
    def get(self, request):
        contacts = Contact.objects.all()
        serializer = ContactSerializer(contacts, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ShopLists(APIView):
    def get(self, request):
        books = ShopList.objects.all()
        serializer = BookSerializer1(books, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BookSerializer1(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
