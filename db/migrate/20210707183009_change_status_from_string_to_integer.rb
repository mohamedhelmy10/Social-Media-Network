class ChangeStatusFromStringToInteger < ActiveRecord::Migration[5.2]
  def up
    change_column :invitations, :status, :integers, default: 0
  end
  
  def down
    change_column :invitations, :status, :string
  end
end
