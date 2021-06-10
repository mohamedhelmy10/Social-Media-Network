class CommentsController < ApplicationController 
    def new
        if logged_in?
            @post = Post.find(params[:post_id])
            @user = User.find(params[:user_id])
        else
            redirect_to  new_session_path 
        end

    end
    def create
        if logged_in?
            @user = User.find(params[:user_id])
            @post = Post.find(params[:post_id])
            @comment = @post.comments.create(comment_params) 
            @comment.update(user_id: current_user.id)
            redirect_to user_path(current_user)+"/home"
        else
            redirect_to  new_session_path  
        end
    end 

    def edit
        if logged_in? 
            @comment = Comment.find(params[:id])
            if current_user.id == params[:user_id] or current_user.id == @comment.user_id # current user must be post owner or comment owner
                @user = User.find(params[:user_id])
                @post = Post.find(params[:post_id])
            else
                redirect_to user_path(current_user)+"/home"
            end
        else
            redirect_to  new_session_path 
        end
    end

    def update
        if logged_in?
            @post = Post.find(params[:post_id])
            @comment = Comment.find(params[:id])
            if current_user.id == params[:user_id] or current_user.id == @comment.user_id  # post owner or comment owner only can edit
                @comment.update(comment_params)
                redirect_to user_path(current_user)+"/home"
            end
        else
            redirect_to  new_session_path 
        end
    end

    def destroy
        if logged_in?
            @post = Post.find(params[:post_id])
            @comment = Comment.find(params[:id])
            if current_user.id == params[:user_id] or current_user.id == @comment.user_id # post owner or comment owner only can delete
                @comment.destroy
                redirect_to user_path(current_user)+"/home"
            end
        else
            redirect_to  new_session_path
        end
    end
    private 
    def comment_params
        params.require(:comment).permit(:body) 
    end
 end
 