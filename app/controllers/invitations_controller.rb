class InvitationsController < ApplicationController
    protect_from_forgery prepend: true
    #before_action :authorized

    def index
        begin
            @user = User.find(params[:user_id])
            # return all the friend requests sent to me
            @received_requests = @user.friends.where("status = ?", "pending")
            render json: @received_requests
        rescue ActiveRecord::RecordNotFound  
            render json: {error: "This user does not exist"} 
            return
        end
    end

    def create
        begin
            @invitation = Invitation.find_by(user_id: 2 , friend_id: params[:user_id]) ||
            Invitation.find_by(user_id:  params[:user_id] , friend_id: 2)
            if @invitation[:status] == "accepted"
                render json: {error: "Already friends"}
            else
                render json: {error: "Already sent"}
            end
        rescue ActiveRecord::RecordNotFound
            @sent_request = Invitation.new(user_id: current_user.id, friend_id: params[:user_id], status: "pending")
            @sent_request.save # the current user sent friend request to another user
            render json: @sent_request
        end
    end

    def update
        begin
            # when the current user accept the friend request sent to him
            @friend_request = Invitation.find(params[:id])
            if @friend_request.update(status: "accepted" )
                render json: @friend_request
            else
                render json: @friend_request.errors, status: :unprocessable_entity
            end
        rescue ActiveRecord::RecordNotFound
            render json: {error: "This friend request does not exist to accept"} 
            return
        end
    end

    def destroy
        begin
            @removed_request = Invitation.find(params[:id])
            if @removed_request.destroy
                redirect_to user_invitations_path(current_user.id)
            else
                render json: @friend_request.errors, status: :unprocessable_entity
            end
        rescue ActiveRecord::RecordNotFound
            render json: {error: "This friend request does not exist to remove"} 
            return
        end
    end

    def friends
        begin
            @user = User.find(params[:user_id]) # Current user
            @friends1 = @user.friends.where("status = ?", "accepted")
            @friends2 = @user.invitations.where("status = ?", "accepted")
            @friends = @friends1+@friends2
            render json: @friends
        rescue  ActiveRecord::RecordNotFound
            render json: {error: "This user does not exist"} 
            return
        end
    end
end
