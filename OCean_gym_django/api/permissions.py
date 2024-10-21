from rest_framework import permissions

class Acceso_View_privada(permissions.BasePermission):
    def has_permission(self, request, view):
        token = request.COOKIES.get('user_token')
        if token:
            try:
                role = self.get_role_from_token(token)
                if role == "admin":
                    return True
            except Exception as e:
                return False
        return False

    def get_role_from_token(self, token):
  
        import jwt
        payload = jwt.decode(token, options={"verify_signature": False})
        return payload.get("role")