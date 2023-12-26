# forms.py
from django import forms
from .models import UserAccount

class UserForm(forms.ModelForm):
    class Meta:
        model = UserAccount
        fields = ['first_name', 'last_name', 'email','password','profile_photo']
