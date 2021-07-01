class RemoveStatusFromInvitations < ActiveRecord::Migration[5.2]
  def change
    remove_column :invitations, :status, :string
  end
end
