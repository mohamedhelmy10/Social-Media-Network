class InvitationSerializer < ActiveModel::Serializer
  attributes :id, :status, :sender_id, :receiver_id
end
