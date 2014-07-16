class Streak < ActiveRecord::Base
  belongs_to :user
  def self.top_streak
    Streak.all.sort_by{ |p| p.streak }.last.streak
  end
end
