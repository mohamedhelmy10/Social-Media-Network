class InvitationsController < ApplicationController

    def index
        if logged_in?
          @received_requests = current_user.friends.where("status = ?", "pending") # return all the friend requests sent to me
        else
          redirect_to new_session_path
        end  
    end

    def create
        if logged_in?
            @sent_request = Invitation.new(user_id: current_user.id, friend_id: params[:id], status: "pending")
            @sent_request.save # sent request because the current user who sent the request
        else
          redirect_to new_session_path
        end  
    end

    def update
        if logged_in?
            @friend_request = Invitation.find(params[:id])
            if @friend_request.update(status: "accepted" )
                redirect_to invitations_path
            end
        else
            redirect_to new_session_path
        end
    end

    def destroy
        if logged_in?
            @removed_request = Invitation.find(params[:id])
            if @removed_request.destroy
                redirect_to invitations_path
            end
        else
            redirect_to new_session_path
        end
    end

    def friends
        if logged_in?
            @friends1 = current_user.friends.where("status = ?", "accepted")
            @friends2 = current_user.invitations.where("status = ?", "accepted")
            @friends = @friends1+@friends2
        else
            redirect_to new_session_path
        end  
    end
end
