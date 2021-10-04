class StaticPagesController < ApplicationController
  def index
    render file: 'static/index.html'
  end
end
