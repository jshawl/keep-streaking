class Streak < ActiveRecord::Base
  belongs_to :user
  def self.top_streak
    @streaks = Streak.all.sort_by{ |p| p.streak } 
    @streaks.length > 1 ? @streaks.last.streak : 0
  end
  def self.leaderboard
    @streaks = Streak.all.sort_by{ |p| p.streak }
    @streaks.reverse!
    @streaks.delete_if { |s| !s.user.setting.public || s.streak == 0 }
  end
end
