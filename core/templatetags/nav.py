from django import template
from django.template import Context
from django.contrib.auth.models import User
from django.template import RequestContext

register = template.Library()

@register.inclusion_tag('core/navigation.html', takes_context=True)
def show_nav(context):
    pass
#    print(context['request'].user)

@register.inclusion_tag('core/guest_navigation.html')
def guest_show_nav():
    pass


@register.assignment_tag
def get_navigation_buttons():
    buttons = []

    buttons.append({'url':'/', 'value':'Dashboard'})
    buttons.append({'url':'#', 'value':'Slaves'})
    buttons.append({'url':'#', 'value':'Tasks'})
    buttons.append({'url':'/logout', 'value':'Logout'})
    return buttons

@register.assignment_tag
def guest_get_navigation_buttons():
    buttons = []
    buttons.append({'url':'/', 'value':'Home'})
    buttons.append({'url':'/login', 'value':'Login'})

    return buttons
