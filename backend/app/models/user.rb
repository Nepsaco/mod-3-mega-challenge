class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true
  validates :username, uniqueness: true
  validates :password, length: { minimum: 7 }
end
