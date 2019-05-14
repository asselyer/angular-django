from django.contrib import admin
from .models import Book, ShopList, Contact, Feedback

admin.site.register(Contact)
admin.site.register(Book)
admin.site.register(ShopList)
admin.site.register(Feedback)


