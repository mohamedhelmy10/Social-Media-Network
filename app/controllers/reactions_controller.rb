class ReactionsController < ApplicationController
    protect_from_forgery prepend: true
    #before_action :authorized
    def index 
        begin
            @reactions_users = []
            @post = Post.find(params[:post_id])
            if User.are_friends? params[:user_id].to_i, @post.user_id or @post.is_public
                @reactions = @post.reactions
                @reactions.each do |reaction|
                    @reactions_users.push({reaction: ReactionSerializer.new(reaction), user: UserSerializer.new(reaction.user)})
                end
                render json: @reactions_users
            else
                render json: {error: "You can not see reactions of this post as the post is private"} 
            end
        rescue ActiveRecord::RecordNotFound  
            render json: {error: "This post does not exist"} 
            return
        end
    end

    def show
        begin
            @reaction = Reaction.find(params[:id])
            if @reaction.post_id != params[:post_id].to_i
                render json: {error: "This reaction does not belong to this post"}
            elsif User.are_friends? params[:user_id].to_i, @reaction.post.user_id or @reaction.post.is_public
                render json: @reaction
            else
                render json: {error: "You can not see this reaction, it is a private post"}
            end
        rescue ActiveRecord::RecordNotFound  
            render json: {error: "This reaction does not exist"} 
            return
        end
    end

    def create
        begin       
            @post = Post.find(params[:post_id])
            @post.reactions.each do |reaction|
                if reaction.user_id == params[:user_id].to_i
                    render json: {error: "You already reacted to this post"}
                    return
                end
            end
            if User.are_friends? params[:user_id].to_i, @post.user_id or @post.is_public
                @reaction = @post.reactions.create(reaction_params) 
                if @reaction.update(user_id: params[:user_id].to_i)  
                    render json: @reaction
                else
                    render json: @reaction.errors, status: :unprocessable_entity
                end
            else
                render json: {error: "You can not react to this post as it is a private post"}
            end            
        rescue ActiveRecord::RecordNotFound  
            render json: {error: "This post does not exit to react on it"} 
            return
        end
    end 

    def update
        begin
            @reaction = Reaction.find(params[:id])
            if @reaction.post_id != params[:post_id].to_i
                render json: {error: "This reaction does not belong to this post"}
            elsif params[:user_id].to_i == @reaction.user_id 
                if @reaction.update(reaction_params)  
                    render json: @reaction
                else
                    render json: @reaction.errors, status: :unprocessable_entity
                end
            else
                render json: {error: "You does not have access to edit this reaction"}
            end
        rescue ActiveRecord::RecordNotFound  
            render json: {error: "This reaction does not exist"} 
            return
        end
    end

    def destroy
        begin
            @reaction = Reaction.find(params[:id])
            if @reaction.post_id != params[:post_id].to_i
                render json: {error: "This reaction does not belong to this post"}
            elsif params[:user_id].to_i == @reaction.user_id 
                @reaction.destroy
            else
                render json: {error: "You does not have access to remove this reaction"}
            end
        rescue ActiveRecord::RecordNotFound  
            render json: {error: "This reaction does not exist"} 
            return
        end
    end

    private 
    def reaction_params
        params.require(:reaction).permit(:reaction_type) 
    end
end
