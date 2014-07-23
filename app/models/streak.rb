class Streak < ActiveRecord::Base
  belongs_to :user
  def self.top_streak
    Streak.all.sort_by{ |p| p.streak }.last.streak
  end
  def self.leaderboard
    @streaks = Streak.all.sort_by{ |p| p.streak }
    @streaks.reverse!
    @streaks.delete_if { |s| !s.user.setting.public || s.streak == 0 }
  end
end
