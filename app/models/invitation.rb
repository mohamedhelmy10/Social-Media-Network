class Invitation < ApplicationRecord
  belongs_to :sender, :class_name => 'User', :foreign_key => 'sender_id'
  belongs_to :receiver, :class_name => 'User', :foreign_key => 'receiver_id'

  #enum :status, [ :pending, :accepted, :declined ]
  enum status: {
    pending: 0,
    accepted: 1,
    declined: 2
  }

  def self.pending_invitation(user_id, friend_id)
    Invitation.where(sender_id: friend_id, receiver_id: user_id, status: :pending)
  end

  def self.not_declined_invitation(user_id, friend_id)
    Invitation.where(sender_id: friend_id, receiver_id: user_id, status: :pending).or(Invitation.where(sender_id: friend_id, receiver_id: user_id, status: :accepted))
  end
end
