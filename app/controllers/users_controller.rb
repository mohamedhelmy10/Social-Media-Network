  class UsersController < ApplicationController
    protect_from_forgery prepend: true
   # before_action :authorized, except: [:create, :login]

  def index
    @users = User.all
    render json: @users
  end

  def create
    @user = User.new(user_params)
    if @user.valid?
      if @user.save!
        token = encode_token({user_id: @user.id})
        render json: {user: UserSerializer.new(@user), token: token}
      else
        render json: @user.errors, status: :unprocessable_entit
      end
    else
      render json: {error: "Invalid email or password"}
    end
  end

  def login
    begin
      @user = User.find_by(email: params[:email])
      if @user.authenticate(params[:password])
        token = encode_token({user_id: @user.id})
        render json: {user: UserSerializer.new(@user), token: token}
      else
        render json: {error: "Invalid password"}
      end
    rescue
      render json: {error: "Invalid email"}
      return
    end
  end

  def auto_login
    render json: UserSerializer.new(@user)
  end
  

  def show
    begin
      @user = User.find(params[:id])
      render json: @user
    rescue ActiveRecord::RecordNotFound
      render json: {error: "This user does not exist"} 
      return
    end
  end

  def update
    begin
      @user = User.find(params[:id])
      if 2 == @user.id 
        if @user.update(user_params)
            render json: @user
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      else
        render json: {error: "You can not update another user info"} 
      end
    rescue ActiveRecord::RecordNotFound
      render json: {error: "This user does not exist"} 
      return
    end     
  end

    def destroy
      begin
        @user = User.find(params[:id])
        if current_user.id == @user.id
          @user.destroy
        else
          render json: {error: "You can not delete another user"}
        end
      rescue ActiveRecord::RecordNotFound
        render json: {error: "This user does not exist"} 
        return
      end   
    end


    private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :password, :email, :phone_number, :gender, :birthdate, :profile_picture, :hometown, :marital_status, :about_me)
    end

  end
