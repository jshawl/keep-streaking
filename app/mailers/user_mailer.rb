class UserMailer < ActionMailer::Base
  default from: '"Keep Streaking" <notifications@keepstreaking.com>'
  def send_email(user)
    @days = user.streak.streak
    mail(:to => user.email, :subject => "You're about to lose your streak")
  end
end
