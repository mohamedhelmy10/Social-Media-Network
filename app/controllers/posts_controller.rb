class PostsController < ApplicationController
    protect_from_forgery prepend: true
    #before_action :authorized
    def index
        @posts = Post.all
        @allowed_posts = []

        @posts.each do |post|
            if User.are_friends? params[:user_id].to_i, post.user_id or post.is_public 
                @allowed_posts.push ({post: PostSerializer.new(post), user: UserSerializer.new(post.user)})
            end
        end 
        render json: @allowed_posts.reverse
    end

    def profile
        begin
            @user = User.find(params[:id])
            @posts = []
            @user.posts.each do |post|
                if User.are_friends?  params[:user_id].to_i , @user.id or post.is_public
                    @posts.push PostSerializer.new(post)
                end
            end
            @posts.push UserSerializer.new(@user)
            render json: @posts.reverse
        rescue ActiveRecord::RecordNotFound  
            render json: {error: "This user does not exist"} 
            return
        end
    end


    def create
        begin
            @user = User.find(params[:user_id])
            @post = @user.posts.create(post_params)
            render json: {post: PostSerializer.new(@post), user: UserSerializer.new(@post.user)}
        rescue ActiveRecord::RecordNotFound  
            render json: {error: "This user does not exist to add a post"} 
            return
        end
    end   

    def show
        begin
            @post = Post.find(params[:id])
            if User.are_friends?  params[:user_id].to_i, @post.user_id or @post.is_public
                render json: PostSerializer.new(@post)
            else
                render json: {error: "You does not have access to see this post"} 
            end   
        rescue ActiveRecord::RecordNotFound  
            render json: {error: "This post does not exist"} 
            return
        end 
    end

    def new
        begin
            @post = Post.find(params[:id])
            if @post.user_id.to_s == params[:user_id]
                render json: PostSerializer.new(@post)
            else
                render json: {error: "You does not have access to edit this post"}
            end
        rescue ActiveRecord::RecordNotFound  
            render json: {error: "This post does not exist"} 
            return
        end
    end

    def update
        begin
            @post = Post.find(params[:id])
            if @post.user_id.to_s == params[:user_id]
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
            if @post.user_id.to_s == params[:user_id]
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
