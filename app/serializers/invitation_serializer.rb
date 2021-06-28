class InvitationSerializer 
  include FastJsonapi::ObjectSerializer
  attributes :status, :sender_id, :receiver_id
end
