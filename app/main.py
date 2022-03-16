# Neam Time - Pat Ging, Aaron Contreras, Deven Maheshwari, David Chong, Ryan Wang
# SoftDev
# P02 - Client-Side Shenanigans 
# 2022-03-10

from flask import Flask, render_template
app = Flask(__name__) #create instance of class Flask

@app.route("/")       #assign fxn to route
def index():
	return render_template("index.html")
if __name__ == "__main__":  # true if this file NOT imported
    app.debug = True        # enable auto-reload upon code change
    app.run()
