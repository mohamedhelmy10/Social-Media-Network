class ApplicationController < ActionController::Base
    helper_method :current_user, :logged_in?
    def current_user    
        User.find_by(id: session[:user_id])  
    end

    def logged_in?     
        !current_user.nil?
    end

    def log_out
        session[:user_id] = nil
    end

end
