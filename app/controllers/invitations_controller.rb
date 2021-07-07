class InvitationsController < ApplicationController
    protect_from_forgery prepend: true
    def index
        begin
            @friend_requests = current_user.received_friend_requests

            render json: UserSerializer.new(@friend_requests)
        rescue ActiveRecord::RecordNotFound  
            render json: {error: "This user does not exist"} 
            return
        end
    end

    def create
        begin
            if User.are_friends? current_user.id, params[:friend_id].to_i
                    render json: {error: "Already friends"}
            elsif User.pending_request?(params[:friend_id].to_i, current_user.id)
                    render json: {error: "You have friend request from this user"}
            elsif User.pending_request?(current_user.id, params[:friend_id].to_i)
                    render json: {error: "Already Sent"}
            else
                @sent_request = @user.create_friend_request(params[:friend_id].to_i)
                render json: InvitationSerializer.new(@sent_request)
            end
        rescue ActiveRecord::RecordNotFound
            render json: {error: "This user does not exist"} 
            return
        end
    end

    def update
        begin
            @friend_request = Invitation.pending_invitation(current_user.id, params[:id].to_i)
            if @friend_request.empty?
                render json: {error: "You does not have access to accept this request"}
            elsif @friend_request.update(status: :accepted)
                render json: InvitationSerializer.new(@friend_request)
            else
                render json: @friend_request.errors, status: :unprocessable_entity
            end
        rescue ActiveRecord::RecordNotFound
            render json: {error: "This friend request does not exist to accept"} 
            return
        end
    end

    def friends
        begin
            @my_friends = current_user.my_friends
            render json: UserSerializer.new(@my_friends)
        rescue  ActiveRecord::RecordNotFound
            render json: {error: "This user does not exist"} 
            return
        end
    end

    def destroy
        begin
            @friend_request = Invitation.not_declined_invitation(current_user.id, params[:id].to_i)
            if @friend_request.empty?
                render json: {error: "You does not have access to decline this friend"}
            elsif @friend_request.update(status: :declined)
                render json: InvitationSerializer.new(@friend_request)
            else
                render json: @friend_request.errors, status: :unprocessable_entity
            end
        rescue ActiveRecord::RecordNotFound
            render json: {error: "This friend request does not exist to accept"} 
            return
        end
    end
end
