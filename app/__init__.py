# Neam Time - Pat Ging, Aaron Contreras, Deven Maheshwari, David Chong, Ryan Wang
# SoftDev
# P02 - Client-Side Shenanigans 
# 2022-03-10

from flask import Flask, render_template
import db
#initializing stuffs
app = Flask(__name__) 
db.setup()

####

@app.route("/")       #assign fxn to route
def index():
	return render_template("index.html")


@app.route("/leaderboards")
def leaderboards():
	db.addToLeaderboard("patrick", 69)
	return render_template("leaderboards.html",
				scores= db.getLeaderboard())

if __name__ == "__main__":  # true if this file NOT imported
    app.debug = True        # enable auto-reload upon code change
    app.run()

