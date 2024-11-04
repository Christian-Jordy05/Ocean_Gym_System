from rest_framework import permissions
import jwt

class Acceso_View_privada(permissions.BasePermission):
    def has_permission(self, request, view):
        token = request.COOKIES.get('user_token')
        if token:
            try:
                role = self.get_role_from_token(token)
                if role == "admin" or request.method == 'GET' or request.method == 'PATCH':
                    return True
            except Exception as e:
                return False
        return False

    def has_object_permission(self, request, view, obj):
        token = request.COOKIES.get('user_token')
        if token:
            try:
                
                role = self.get_role_from_token(token)
                user_id = self.get_user_id_from_token(token)
                
                return role == "admin" or obj.id_cliente == user_id
            except Exception as e:
                return False
        return False

    def get_role_from_token(self, token):
        payload = jwt.decode(token, options={"verify_signature": False})
        return payload.get("role")
    
    def get_user_id_from_token(self, token):
        payload = jwt.decode(token, options={"verify_signature": False})
        return payload.get("idCliente")
