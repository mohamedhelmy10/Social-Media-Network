class NotificationsController < ApplicationController
    protect_from_forgery prepend: true
    def index 
        begin
            @user = User.find(params[:user_id])
            if (@user.id == 5)
                @posts = @user.posts
                @notifications = []
                @posts.each do |post|
                    @notifications.push post.notifications
                end
                render json: @notifications
            else
                render json: {error: "This is not the current user"} 
            end
        rescue ActiveRecord::RecordNotFound  
            render json: {error: "This user does not exist"} 
            return
        end
    end

    def show
        begin
            @notification = Notification.find(params[:id])
            if @notification.post_id != params[:post_id].to_i || @notification.user_id != params[:user_id].to_i
                render json: {error: "This notification does not belong to this post or to this user"}
            else
                render json: @notification
            end
        rescue ActiveRecord::RecordNotFound  
            render json: {error: "This notification does not exist"} 
            return
        end
    end

    def create
        begin
            @post = Post.find(params[:post_id])
            @notification = @post.notifications.create(notification_params) 
            if @notification.update(user_id: params[:user_id].to_i)  
                render json: @notification
            else
                render json: @notification.errors, status: :unprocessable_entity
            end            
        rescue ActiveRecord::RecordNotFound  
            render json: {error: "This post does not exit to react or comment on it"} 
            return
        end
    end 



    private 
    def notification_params
        params.require(:notification).permit(:description) 
    end
end
