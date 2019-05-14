from django.db import models
from django.conf import settings
from django.utils import timezone
from django.contrib.auth.models import User


class BookListManager(models.Manager):
    def for_user(self, user):
        return self.filter(owner=user)


class Book(models.Model):
    name = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    price = models.FloatField()
    owner = models.ForeignKey(User, related_name='books', on_delete=models.CASCADE, default=2)
    genre = models.CharField(max_length=200)
    rating = models.IntegerField(choices=list(zip(range(1, 11), range(1, 11))))

    objects = BookListManager()

    def __str__(self):
        return '{}: {}'.format(self.id, self.name)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'author': self.author,
            'owner': self.owner,
            'rating': self.rating,
            'genre': self.genre
        }



class ShopList(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, default=2)

    objects = BookListManager()

    def __str__(self):
        return '{}: {}'.format(self.id, self.book)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.book
        }

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=50)
    user = models.ForeignKey(User, related_name='feeds', on_delete=models.CASCADE, default=2)

    def __str__(self):
        return '{}: {}'.format(self.id, self.name)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'user': self.user
        }

class Feedback(models.Model):
    topic = models.CharField(max_length=255)
    comment = models.TextField(max_length=500)
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE, default=2)
    
    def __str__(self):
        return '{}: {}'.format(self.id, self.topic)

    def to_json(self):
        return {
            'id': self.id,
            'topic': self.topic,
            'comment': self.comment
            
        }