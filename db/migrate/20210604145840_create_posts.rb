class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.text :caption
      t.string :image
      t.string :posted_time
      t.boolean :is_public
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
