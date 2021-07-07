class NotificationsController < ApplicationController
    protect_from_forgery prepend: true
    def index 
        begin
            if (params[:user_id].to_i == current_user.id)
                @user = User.find(params[:user_id])
                @notifications = @user.notifications
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
            if @notification.post_id != params[:post_id].to_i || @notification.user_id != current_user.id
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
            if @notification.update(user_id: current_user.id)  
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
