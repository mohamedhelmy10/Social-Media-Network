class CommentsController < ApplicationController 
    protect_from_forgery prepend: true
    before_action :authorized
    def index 
        begin
            @post = Post.find(params[:post_id])
            # the post must be public or the owner of the post is my friend
            if User.are_friends? params[:user_id].to_i, @post.user_id or @post.is_public
                @comments = @post.comments
                render json: @comments
            else
                render json: {error: "You can not see the comments of this post as the post is private"} 
            end
        rescue ActiveRecord::RecordNotFound  
            render json: {error: "This post does not exist"} 
            return
        end
    end

    def show
        begin
            @comment = Comment.find(params[:id])
            if @comment.post_id != params[:post_id].to_i
                render json: {error: "This comment does not belong to this post"}
            # the post must be public or the owner of the post is my friend
            elsif User.are_friends? params[:user_id].to_i, @comment.post.user_id or @comment.post.is_public
                render json: @comment
            else
                render json: {error: "You can not see this comment, it is a private post"}
            end
        rescue ActiveRecord::RecordNotFound  
            render json: {error: "This comment does not exist"} 
            return
        end
    end

    def create
        # check if the post is public or the post owner and the current user are friends
        begin
            @post = Post.find(params[:post_id])
            if User.are_friends? params[:user_id].to_i, @post.user_id or @post.is_public
                @comment = @post.comments.create(comment_params) 
                # put the comment owner to be the current user
                if @comment.update(user_id: params[:user_id].to_i)  
                    render json: @comment
                else
                    render json: @comment.errors, status: :unprocessable_entity
                end
            else
                render json: {error: "You can not add comment to this post as it is a private post"}
            end            
        rescue ActiveRecord::RecordNotFound  
            render json: {error: "This post does not exit to comment on it"} 
            return
        end
    end 

    def update
        begin
            @comment = Comment.find(params[:id])
            if @comment.post_id != params[:post_id].to_i
                render json: {error: "This comment does not belong to this post"}
            elsif params[:user_id].to_i == @comment.post.user_id or params[:user_id].to_i == @comment.user_id  # post owner or comment owner only can edit
                if @comment.update(comment_params)  
                    render json: @comment
                else
                    render json: @comment.errors, status: :unprocessable_entity
                end
            else
                render json: {error: "You does not have access to edit this comment"}
            end
        rescue ActiveRecord::RecordNotFound  
            render json: {error: "This comment does not exist"} 
            return
        end
    end

    def destroy
        begin
            @comment = Comment.find(params[:id])
            if @comment.post_id != params[:post_id].to_i
                render json: {error: "This comment does not belong to this post"}
            elsif params[:user_id].to_i == @comment.post.user_id or params[:user_id].to_i == @comment.user_id  # post owner or comment owner only can delete
                @comment.destroy
                redirect_to user_post_comments_path(user_id: params[:user_id], post_id: params[:post_id])
            else
                render json: {error: "You does not have access to delete this comment"}
            end
        rescue ActiveRecord::RecordNotFound  
            render json: {error: "This comment does not exist"} 
            return
        end
    end

    private 
    def comment_params
        params.require(:comment).permit(:body) 
    end
 end
