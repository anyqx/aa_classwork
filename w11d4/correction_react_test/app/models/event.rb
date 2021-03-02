class Event < ApplicationRecord
  validates :description, :date, presence: true
end
