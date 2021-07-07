class User < ApplicationRecord
    has_secure_password
    has_many :posts, :dependent => :destroy
    has_many :sent_requests, class_name: 'Invitation', foreign_key: 'sender_id', :dependent => :destroy
    has_many :received_requests, class_name: 'Invitation', foreign_key: 'receiver_id', :dependent => :destroy
    has_many :senders, class_name: 'User', through: :received_requests,  :dependent => :destroy
    has_many :receivers, class_name: 'User', through: :sent_requests,  :dependent => :destroy
    has_many :reactions, :dependent => :destroy
    has_many :comments, :dependent => :destroy
    has_many :notifications, :dependent => :destroy
    validates :email , presence: true, uniqueness: true
    validates :first_name , presence: true
    validates :last_name , presence: true

    def self.are_friends?(id1, id2)
        case1 = !Invitation.where(sender_id: id1, receiver_id: id2, status: :accepted).empty?
        case2 = !Invitation.where(sender_id: id2, receiver_id: id1, status: :accepted).empty?
        case3 = (id1==id2)
        case1 || case2 || case3
    end

    def self.pending_request?(id1, id2)
        !Invitation.where(sender_id: id1, receiver_id: id2, status: :pending).empty?
    end

    def create_friend_request(friend_id)
        @sent_request = Invitation.new(sender_id: id, receiver_id: friend_id)
        @sent_request.save
        @sent_request
    end 

    def my_friends
        friends1 = senders.where('status = ?', Invitation.statuses[:accepted])
        friends2 = receivers.where('status = ?', Invitation.statuses[:accepted])
        friends = friends1+friends2
    end

    def received_friend_requests
        friend_requests = senders.where("status = ?", Invitation.statuses[:pending])
    end

end
