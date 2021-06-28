class PostSerializer
  include FastJsonapi::ObjectSerializer
  attributes :caption, :image, :is_public
end
