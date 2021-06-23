class InvitationsController < ApplicationController
    protect_from_forgery prepend: true
    #before_action :authorized

    def index
        begin
            @friend_requests = []
            @user = User.find(params[:user_id])
            # return all the friend requests sent to me
            @received_requests = @user.friends.where("status = ?", "pending")
            @received_requests.each do |request|
                @friend_requests.push ({user:User.find(request.user_id), invitation:{id:request.id}})
            end
            render json: @friend_requests
        rescue ActiveRecord::RecordNotFound  
            render json: {error: "This user does not exist"} 
            return
        end
    end

    def create
        begin
            @invitation = Invitation.find_by(user_id:  params[:user_id].to_i , friend_id: params[:friend_id].to_i)||
             Invitation.find_by(user_id: params[:friend_id].to_i, friend_id: params[:user_id].to_i )
             if @invitation
                if @invitation[:status] == "accepted"
                    render json: {error: "Already friends"}
                elsif @invitation[:status] == "pending" and @invitation.user_id == params[:user_id].to_i
                    render json: {error: "Already sent"}
                else
                    render json: {error: "You have friend request from this user"}
                end
            else
                @sent_request = Invitation.new(user_id: params[:user_id].to_i, friend_id: params[:friend_id].to_i, status: "pending")
                @sent_request.save # the current user sent friend request to another user
                render json: @sent_request
            end
        rescue ActiveRecord::RecordNotFound
            @sent_request = Invitation.new(user_id: params[:user_id].to_i, friend_id: params[:friend_id].to_i, status: "pending")
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
            @removed_request.destroy
        rescue ActiveRecord::RecordNotFound
            render json: {error: "This friend request does not exist to remove"} 
            return
        end
    end

    def friends
        begin
            @my_friends = []
            @user = User.find(params[:user_id]) # Current user
            #friends who sent requests to me
            @friends1 = @user.friends.where("status = ?", "accepted")
            #friends who i sent requests to them
            @friends2 = @user.invitations.where("status = ?", "accepted")
            @friends = @friends1+@friends2

            @friends1.each do |friend|
                @my_friends.push ({user:User.find(friend.user_id), invitation:{id: friend.id}})
            end 
            @friends2.each do |friend|
                @my_friends.push ({user:User.find(friend.user_id), invitation:{id: friend.id}})
            end 
            render json: @my_friends
        rescue  ActiveRecord::RecordNotFound
            render json: {error: "This user does not exist"} 
            return
        end
    end
end
