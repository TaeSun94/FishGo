from django import forms
from django.utils.translation import ugettext, ugettext_lazy as _

class SetPasswordForm(forms.Form):
    error_messages = {
        'password_mismatch': "두 개의 비밀번호가 같지 않습니다.",
        'password_length': "비밀번호가 8자 보다 짧습니다.",
    }
    new_password1 = forms.CharField(label=_("New password"),
                                    widget=forms.PasswordInput)
    new_password2 = forms.CharField(label=_("New password confirmation"),
                                    widget=forms.PasswordInput)

    def __init__(self, user, *args, **kwargs):
        self.user = user
        super(SetPasswordForm, self).__init__(*args, **kwargs)

    def clean_new_password2(self):
        password1 = self.cleaned_data.get('new_password1')
        password2 = self.cleaned_data.get('new_password2')
        if password1 and password2:
            if password1 != password2:
                raise forms.ValidationError(
                    self.error_messages['password_mismatch'],
                    code='password_mismatch',
                )
            elif len(password1) < 8:
                raise forms.ValidationError(
                    self.error_messages['password_length'],
                    code='password_length',
                )                
        return password2

    def save(self, commit=True):
        self.user.set_password(self.cleaned_data['new_password1'])
        if commit:
            self.user.save()
        return self.user


class MySetPasswordForm(SetPasswordForm):
    new_password1 = forms.CharField(
        label=_("New password"),
        widget=forms.PasswordInput(attrs={'placeholder': 'New Password', 'class': 'password1'}),
        strip=False
    )
    new_password2 = forms.CharField(
        label=_("New password confirmation"),
        strip=False,
        widget=forms.PasswordInput(attrs={'placeholder': 'New Password Confirmation', 'class': 'password2'}),
    )







