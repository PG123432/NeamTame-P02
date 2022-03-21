from flask import Flask, render_template, redirect, request, url_for, session
from datetime import datetime
import sqlite3
import db

app = Flask(__name__) #create instance of class Flask

DB_FILE = "WackAMole.db"

db.setup()

@app.route("/", methods=["GET"])
@app.route("/index", methods=["GET"])
def index():
    if session.get('username') is not None:
        user_id = db.get_id(session["username"])
        user = session['username']
        return render_template("index.html", user=user)
    else:
        return render_template("index.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    if "username" in session:
        return redirect(url_for("index"))

    # GET request: display the form
    if request.method == "GET":
        return render_template("register.html")

    if request.method == "POST":

        # POST request: handle the form response and redirect
        username = request.form.get("name", default="")
        password = request.form.get("password", default="")
        password2 = request.form.get("password2", default="")

        error = db.signup(username, password)
        if password != password2:
            error = "Error: Passwords Must Match"

        if error:
            return render_template("register.html", error=error)
        else:
            db.signup(username, password)
            return redirect(url_for("login"))


@app.route("/login", methods=["GET", "POST"])
def login():
    if "username" in session:
        return redirect(url_for("index"))

    # GET request: display the form
    if request.method == "GET":
        return render_template("login.html")

    if request.method == "POST":

        # POST request: handle the form response and redirect
        username = request.form.get("name", default="")
        password = request.form.get("password", default="")

        error = db.login(username, password)
        if error:
            return render_template('login.html', error=error)
        else:
            session['username'] = username
            return redirect(url_for("index"))


@app.route('/logout', methods=['GET', 'POST'])
def logout():
    if "username" in session:
        del session["username"]
    return redirect(url_for("index"))


@app.route("/leaderboards")
def leaderboards():
	# db.addToLeaderboard("patrick", 69)
	return render_template("leaderboards.html", scores= db.getLeaderboard())

@app.route("/play")
def play():
	return render_template("play.html")

if __name__ == "__main__":  # true if this file NOT imported
    app.debug = True        # enable auto-reload upon code change
    app.run()

