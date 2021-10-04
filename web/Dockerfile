FROM ruby:2.6.3

RUN apt-get update && apt-get install -y nodejs
RUN gem install bundler:2.0.2

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY Gemfile /usr/src/app
COPY Gemfile.lock /usr/src/app
RUN bundle update --bundler



RUN bundle install

RUN echo "export PATH=/usr/src/app/bin:$PATH" > ~/.bash_profile
COPY . /usr/src/app

ENTRYPOINT ["./start_docker.sh"]
