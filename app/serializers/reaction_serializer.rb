class ReactionSerializer < ActiveModel::Serializer
  attributes :id, :reaction_type, :post_id
end
