class CommentsController < ApplicationController 
    def create
        @post = Post.find(params[:post_id])
        @comment = @post.comments.create(comment_params) 
        @comment.update(user_id: current_user)
        redirect_to user_path(current_user)+"/home" 
    end 
    private 
    def comment_params
        params.require(:comment).permit(:body) 
    end
 end