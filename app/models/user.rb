class User < ApplicationRecord
    has_secure_password
    has_many :posts
    has_many :invitations
    has_many :friends, class_name: 'Invitation', foreign_key: 'friend_id'
    validates :email , presence: true
    validates :first_name , presence: true
    validates :last_name , presence: true
    validates :email , uniqueness: true

    def self.are_friends?(id1, id2)
        case1 = !Invitation.where(user_id: id1, friend_id: id2, status: "accepted").empty?
        case2 = !Invitation.where(user_id: id2, friend_id: id1, status: "accepted").empty?
        case1 || case2
    end
end
