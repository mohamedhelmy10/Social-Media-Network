class ApplicationController < ActionController::Base
    helper_method :current_user, :logged_in?
    #before_action :authorized
    @rsa_public
    def encode_token(payload)
      rsa_private = OpenSSL::PKey::RSA.generate 2048
      @rsa_public = rsa_private.public_key 
      JWT.encode(payload, rsa_private, 'RS256')
    end
  
    def auth_header
      # { Authorization: 'Bearer <token>' }
      request.headers['Authorization']
    end
  
    def decoded_token
      if auth_header
        token = auth_header.split(' ')[1]
        # header: { 'Authorization': 'Bearer <token>' }
        begin
          JWT.decode(token, @rsa_public, true, algorithm: 'RS256')
        rescue JWT::DecodeError
          nil
        end
      end
    end
  
    def logged_in_user
      if decoded_token
        user_id = decoded_token[0]['user_id']
        @user = User.find_by(id: user_id)
      end
    end
  
    def logged_in?
      !!logged_in_user
    end
  
    def authorized
      render json: { message: 'Please log in' }, status: :unauthorized unless logged_in?
    end
    
end
