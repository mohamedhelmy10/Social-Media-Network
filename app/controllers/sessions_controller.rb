class SessionsController < ApplicationController

    def new
    end

    def create
        @user = User.find_by(email: params[:email])
        if @user.blank? 
            redirect_to new_session_path
        elsif @user.try(:authenticate, params[:password])
            session[:user_id] = @user.id
            redirect_to user_path(@user)+'/home'
        else 
            redirect_to new_session_path
        end
    end

    def destroy
        log_out
        redirect_to new_session_path
    end
end
