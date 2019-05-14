from django.urls import path
from api import views

urlpatterns = [
    path('book_list/', views.BookLists.as_view()),
    path('book_list/<int:pk>/', views.BookListDetail.as_view()),
    path('book_list/<int:pk>/books/', views.book_list_book),
    path('shop_list/', views.ShopLists.as_view()),
    path('contact_list/', views.ContactList.as_view()),
    path('feed_list/', views.feedback_list),

    path('users/', views.UserList.as_view()),
    path('login/', views.login),
    path('logout/', views.logout),

    path('', views.index),

]