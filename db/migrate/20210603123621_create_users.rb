class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :password_digest
      t.string :email
      t.string :phone_number
      t.boolean :gender
      t.date :birthdate
      t.string :profile_picture
      t.string :hometown
      t.boolean :marital_status
      t.text :about_me

      t.timestamps
    end
  end
end
