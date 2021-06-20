class ReactionsController < ApplicationController
    protect_from_forgery prepend: true
    #before_action :authorized
    def index 
        begin
            @reactions_users = []
            @post = Post.find(params[:post_id])
            # the post must be public or the owner of the post is my friend
            if User.are_friends? params[:user_id].to_i, @post.user_id or @post.is_public
                @reactions = @post.reactions
                puts "here"
                @reactions.each do |reaction|
                    @reactions_users.push({reaction: reaction, user: reaction.user})
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
            # the post must be public or the owner of the post is my friend
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
        # check if the post is public or the post owner and the current user are friends
        begin
            @post = Post.find(params[:post_id])
            @post.reactions.each do |reaction|
                # the current user already reacted to this post
                if reaction.user_id == params[:user_id].to_i
                    render json: {error: "You already reacted to this post"}
                    return
                end
            end
            if User.are_friends? params[:user_id].to_i, @post.user_id or @post.is_public
                @reaction = @post.reactions.create(reaction_params) 
                # put the reaction owner to be the current user
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
            # reaction owner only can edit
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
             # reaction owner only can remove it
            elsif params[:user_id].to_i == @reaction.user_id 
                @reaction.destroy
                redirect_to user_post_reactions_path(user_id: params[:user_id], post_id: params[:post_id])
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
