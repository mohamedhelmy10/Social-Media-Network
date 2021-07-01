class AddStatusToInvitations < ActiveRecord::Migration[5.2]
  def change
    add_column :invitations, :status, :integers, default: 0
  end
end
