class PostsController < ApplicationController
    protect_from_forgery prepend: true
    def index
        @posts = Post.all
        @allowed_posts = @posts.select{|post| User.are_friends? current_user.id, post.user_id or post.is_public}.map do |post| 
            {post: PostSerializer.new(post), user: UserSerializer.new(post.user)}
        end 
        render json: @allowed_posts.reverse
    end

    def profile
        begin
            @user= User.find(params[:id])       
            if User.are_friends?  current_user.id, params[:id].to_i
                @posts= PostSerializer.new(@user.posts).serializable_hash
            else
                @posts= PostSerializer.new(@user.posts.where(is_public: true)).serializable_hash
            end
            @reversed_posts = @posts[:data].reverse
            @reversed_posts.push UserSerializer.new(@user)
            render json: @reversed_posts
        rescue ActiveRecord::RecordNotFound  
            render json: {error: "This user does not exist"} 
            return
        end
    end


    def create
        begin
            @post = current_user.posts.create(post_params)
            render json: {post: PostSerializer.new(@post), user: UserSerializer.new(@post.user)}
        rescue ActiveRecord::RecordNotFound  
            render json: {error: "This user does not exist to add a post"} 
            return
        end
    end

    def update
        begin
            @post = Post.find(params[:id])
            if @post.user_id == current_user.id
                if @post.update(post_params)
                    render json: PostSerializer.new(@post)
                else   
                    render json: @post.errors, status: :unprocessable_entity
                end
            else
                render json: {error: "You does not have access to edit this post"}
            end
        rescue ActiveRecord::RecordNotFound  
            render json: {error: "This post does not exist"} 
            return
        end
    end

    def destroy
        begin
            @post = Post.find(params[:id])
            if @post.user_id == current_user.id
                @post.destroy
            else
                render json: {error: "You does not have access to delete this post"}
            end   
        rescue ActiveRecord::RecordNotFound  
            render json: {error: "This post does not exist"} 
            return
        end
    end

    private

    def post_params
        params.require(:post).permit(:caption, :image, :posted_time, :is_public)
    end    
end
