class PostsController < ApplicationController
    protect_from_forgery prepend: true
    
    def new 
        if logged_in? && current_user.id.to_s == params[:user_id]
            @user = User.find(params[:user_id])
            @post =@user.posts.new
        else
            redirect_to  new_session_path  
        end      
    end

    def create
        if logged_in? && current_user.id.to_s == params[:user_id]
            @user = User.find(params[:user_id])
            @user.posts.create(post_params)
            redirect_to user_path(@user)+"/home"
        else
            redirect_to  new_session_path   
        end  
    end   

    def show
        if logged_in?
            @user = User.find(params[:user_id])
            @post =Post.find(params[:id])
        else
            redirect_to  new_session_path   
        end              
    end

    def edit
        if logged_in?
            if current_user.id.to_s == params[:user_id]
                @post = Post.find(params[:id])
                @user = User.find(params[:user_id])
            else
                redirect_to user_path(current_user)+"/home"
            end
        else
            redirect_to  new_session_path
        end       
    end

    def destroy 
        @user = User.find(params[:user_id])
        if logged_in? && current_user.id.to_s == params[:user_id]
            @post =Post.find(params[:id])
            @post.destroy
        end
        redirect_to user_path(current_user)+"/home"
        
    end

    def update
        @user = User.find(params[:user_id])
        @post =@user.posts.find(params[:id])
        if @post.update(post_params)
            redirect_to user_post_path(@post)
        else   
            render :edit 
        end

    end

    private

    def post_params
        params.require(:post).permit(:caption, :image, :posted_time, :is_public)
    end    
end
