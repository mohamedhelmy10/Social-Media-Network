class ReactionSerializer 
  include FastJsonapi::ObjectSerializer
  attributes :reaction_type, :post_id
end
