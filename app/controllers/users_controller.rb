  class UsersController < ApplicationController
    protect_from_forgery prepend: true
    def index
    end


    def home
      if logged_in? && current_user.id.to_s == params[:id]
        @users = User.all
        @user = User.find(params[:id])
      else
        redirect_to  new_session_path  
      end
    end

    def profile
      if logged_in?
        @user = User.find(params[:id])
      else
        redirect_to  new_session_path 
      end
    end

    def new 
      @user = User.new
    end 

    def create

      @user = User.new(user_params)
      if @user.save
        session[:user_id] = @user.id
        redirect_to user_path(@user)+'/home'
      else
        render :new
      end
    end

    def show
      if logged_in? && current_user.id.to_s == params[:id]
        @user = User.find(params[:id])
      else
        redirect_to  new_session_path 
      end
    end

    def edit 
      if logged_in? && current_user.id.to_s == params[:id]
        @user = User.find(params[:id])
      else
        redirect_to  new_session_path 
      end
    end

    def update
      if logged_in? && current_user.id.to_s == params[:id]
        @user = User.find(params[:id])
        if @user.update(user_params)
          redirect_to @user
        else
          render :edit 
        end
      else
        redirect_to  new_session_path 
      end
    end

    def destroy
      if logged_in? && current_user.id.to_s == params[:id]
        @user = User.find(params[:id])
        @user.destroy
      end
      redirect_to  new_session_path 
    end


    private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :password, :email, :phone_number, :gender, :birthdate, :profile_picture, :hometown, :marital_status, :about_me)
    end

  end
