from rest_framework import serializers
from .models import Book, ShopList, Contact
from django.contrib.auth.models import User


class BookListSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)

    def create(self, validated_data):
        # {'name': 'new category 3'}
        # name='new category 3'
        book_list = BookList(**validated_data)
        book_list.save()
        return task_list

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

class ContactSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    user = UserSerializer(read_only=True)

    class Meta:
        model = Contact
        fields = ('id', 'name', 'user')

class BookSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    author = serializers.CharField()
    price = serializers.FloatField()
    owner = UserSerializer(read_only=True)
    rating = serializers.IntegerField()
    genre = serializers.CharField()

    class Meta:
        model = Book
        fields = ('id', 'name', 'author','price', 'rating', 'genre','owner')


class BookSerializer1(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    book = BookSerializer()
    class Meta:
        model = ShopList
        fields = '__all__'



class FeedbackSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    topic = serializers.CharField()
    comment = serializers.CharField()
    contact = ContactSerializer(read_only=True)
    # owner = UserSerializer(read_only=True)
    # tasks = TaskSerializer2(many=True)
    
    class Meta:
        model = Book
        fields = ('id', 'topic', 'comment', 'contact')

    def create(self, validated_data):
        # {'name': 'new category 3'}
        # name='new category 3'
        book_list = BookList(**validated_data)
        book_list.save()
        return task_list

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance