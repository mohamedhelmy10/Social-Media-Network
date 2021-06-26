class Invitation < ApplicationRecord
  #belongs_to :user
  belongs_to :sender, :class_name => 'User', :foreign_key => 'sender_id'
  belongs_to :receiver, :class_name => 'User', :foreign_key => 'receiver_id'


  def self.accepted_invitation(user_id, friend_id)  
    @accepted_invitation = Invitation.where(sender_id: user_id, receiver_id: friend_id, status: "accepted")
    if  @accepted_invitation.empty?
      @accepted_invitation = Invitation.where(sender_id: friend_id, receiver_id: user_id, status: "accepted")
    end
    @accepted_invitation
  end

  def self.pending_invitation(user_id, friend_id)
    Invitation.where(sender_id: friend_id, receiver_id: user_id, status: "pending")
  end
end
