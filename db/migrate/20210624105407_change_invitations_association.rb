class ChangeInvitationsAssociation < ActiveRecord::Migration[5.2]
  def up
    rename_column  :invitations, :user_id, :sender_id
  end
  
  def down
    change_column :invitations, :friend_id, :receiver_id
  end
end
