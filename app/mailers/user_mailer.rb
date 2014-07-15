class UserMailer < ActionMailer::Base
  default :from => "gitstreak@gmail.com"
  def send_email(user)
    mail(:to => user.id, :subject => "Commit Asap! You're about to lose your streak")
  end
end