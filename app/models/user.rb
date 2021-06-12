class User < ApplicationRecord
    has_secure_password
    has_many :posts, :dependent => :destroy
    has_many :invitations, :dependent => :destroy
    has_many :friends, class_name: 'Invitation', foreign_key: 'friend_id', :dependent => :destroy
    has_many :reactions, :dependent => :destroy
    has_many :comments, :dependent => :destroy
    has_many :notifications, :dependent => :destroy
    validates :email , presence: true, uniqueness: true
    validates :first_name , presence: true
    validates :last_name , presence: true

    def self.are_friends?(id1, id2)
        case1 = !Invitation.where(user_id: id1, friend_id: id2, status: "accepted").empty?
        case2 = !Invitation.where(user_id: id2, friend_id: id1, status: "accepted").empty?
        case3 = (id1==id2)
        case1 || case2 || case3
    end
    
    def self.my_friends(id)
        friends1 = Invitation.where(user_id: id, status: "accepted")
        friends2 = Invitation.where(friend_id: id, status: "accepted")
        friends = [friends1,friends2]
    end

end
