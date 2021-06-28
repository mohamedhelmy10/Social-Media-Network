class ChangeInvitationsAssociation < ActiveRecord::Migration[5.2]
  def change
    remove_column :invitations, :user_id, :integer
    remove_column :invitations, :friend_id, :integer
    add_column :invitations, :sender_id, :integer
    add_column :invitations, :receiver_id, :integer  
  end
end
