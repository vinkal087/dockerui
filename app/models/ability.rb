class Ability
  include CanCan::Ability
  def initialize(user)
     if user[:role].eql?("ADMIN")
     else
     	cannot :users, :dashboard
     end
  end
end