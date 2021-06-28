class PostSerializer < ActiveModel::Serializer
  attributes :id, :caption, :image, :is_public
end
