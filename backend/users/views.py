from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializers import UserCreateSerializer, UserSerializer
from .models import UserAccount
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from .forms import UserForm  # Import your actual form
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.forms.models import model_to_dict
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets, permissions
from rest_framework.parsers import MultiPartParser, FormParser



class UserViewSet(viewsets.ModelViewSet):
    queryset = UserAccount.objects.all()
    serializer_class = UserSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


class RegisterView(APIView):
  def post(self, request):
    data = request.data
    print(data)
    

    serializer = UserCreateSerializer(data=data)

    if not serializer.is_valid():
      print('err',serializer.errors)
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    user = serializer.create(serializer.validated_data)
    user = UserSerializer(user)

    return Response(user.data, status=status.HTTP_201_CREATED)


class RetrieveUserView(APIView):
  permission_classes = [permissions.IsAuthenticated]

  def get(self, request):
    user = request.user
    user = UserSerializer(user)

    return Response(user.data, status=status.HTTP_200_OK)
  
def userlist(request):
    print('request came')
    data = UserAccount.objects.values()
    return JsonResponse(list(data), safe=False)  
  
@api_view(['GET', 'POST'])
def edit_user(request, user_id):
    user = UserAccount.objects.get(pk=user_id)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User updated successfully'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

import json
@csrf_exempt
def create_user(request):
    if request.method == 'POST':
        print('1')              
        
        data = json.loads(request.body.decode('utf-8'))
        form = UserForm(data)
        
        print(form.is_valid)
        
        if form.is_valid():
            print('3')
            new_user = form.save(commit=False)
            new_user.set_password(data['password'])
            new_user.save()
            return JsonResponse({'message': 'User created successfully', 'user': model_to_dict(new_user)})
        else:
            print('4')
            return JsonResponse({'error': 'Invalid form data'}, status=400)
            

    return JsonResponse({'error': 'Invalid request method'}, status=400)
      
@csrf_exempt
def delete_user(request, user_id):
    if request.method == 'DELETE':
        user = get_object_or_404(UserAccount, pk=user_id)
        user.delete()
        return JsonResponse({'message': 'User deleted successfully'})
    
    return JsonResponse({'error': 'Invalid request method'}, status=400)      


@csrf_exempt
def update_profile_photo(request,user_id):
    print('it came here')
    if request.method == 'POST':
        print('it came here-2')
        user = UserAccount.objects.get(email=user_id)
        print(user)
        profile_photo = request.FILES.get('profile_photo')
        print(profile_photo)

        if profile_photo:
            user.profile_photo = profile_photo
            user.save()

            return JsonResponse({'message': 'Profile photo updated successfully'})
        else:
            return JsonResponse({'error': 'No profile photo provided'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=400)
      