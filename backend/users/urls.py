from django.urls import path
from .views import RegisterView, RetrieveUserView
from .import views


urlpatterns = [
  path('register', RegisterView.as_view()),
  path('me', RetrieveUserView.as_view()),
  path('userlist',views.userlist,name='userlist'),
  path('edit_user/<int:user_id>/',views.edit_user,name='edit_user'),
  path('create_user/',views.create_user,name='create_user'),
   path('delete_user/<int:user_id>/', views.delete_user, name='delete_user'),
   path('update_profile_photo/<str:user_id>',views.update_profile_photo,name='update_profile_photo')
]
