class Ability
  include CanCan::Ability
  def initialize(user)
     if user[:role].eql?("ADMIN")
     	can :create_host, :dashboard
     	can :users, :dashboard
     else
     	cannot :users, :dashboard
     end
  end
end