# Neam Time - Pat Ging, Aaron Contreras, Deven Maheshwari, David Chong, Ryan Wang
# SoftDev
# P02 - Client-Side Shenanigans 
# 2022-03-10

import sqlite3

DB_FILE = "MWackAMole.db"

def setup():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    c.execute("DROP TABLE IF EXISTS leaderboard")
    command = "CREATE TABLE leaderboard (username TEXT, score INTEGER, timestamp DATETIME DEFAULT (datetime('now','localtime')))"
    c.execute(command)

    c.execute("DROP TABLE IF EXISTS users")
    command = "CREATE TABLE users (user_id INTEGER PRIMARY KEY AUTOINCREMENT, username PRIMARY KEY TEXT, password TEXT, topscore INTEGER DEFAULT 0, timestamp DATETIME DEFAULT (datetime('now','localtime')))"
    c.execute(command)

    db.commit()
    db.close()

# User Database Stuff

# add new user name and password to users database if availible
def signup(username, password):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    # checks if username already exists
    c.execute("""SELECT username FROM users WHERE username=?""",[username])
    result = c.fetchone()


    if result != None:
        return "Error: Username already in use"

    else:
        c.execute('INSERT INTO users VALUES (null, ?, ?)', (username, password))
        db.commit()
        db.close()
        return  False

# checks if username and password combination exists in database
def login(username, password):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    c.execute("""SELECT username FROM users WHERE username=? AND password=?""",[username, password])
    result = c.fetchone()

    if result:
        return False
    else:
        return "Error: Either username or password is invalid"

# gets the user_id from the user_name
def get_id(username):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    user_id = None
    c.execute("SELECT user_id FROM users WHERE username=?", [username])
    row = c.fetchone()
    if row is not None:
        user_id = row[0]

    return user_id

# gets the username from the user_id
desernamef get_username(user_id):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    username = None
    c.execute("SELECT user_id FROM users WHERE username=?", [user_id])
    row = c.fetchone()
    if row is not None:
        username = row[0]

    return username

# gets the topscore from the user_id
def get_topscore(user_id):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    topscore = None
    c.execute("SELECT user_id FROM users WHERE topscore=?", [user_id])
    row = c.fetchone()
    if row is not None:
        topscore = row[0]

    return topscore

# Leaderboard Database Stuff: 

def addToLeaderboard():
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    c.execute('INSERT INTO leaderboard (username, score) VALUES (?, ?)', (username, score))

    db.commit()
    db.close()























def new_search(movie, user_id, imdb_id):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    c.execute('INSERT INTO searches (movie, user_id, imdb_id) VALUES (?, ?, ?)', (movie, user_id, imdb_id))
    c.execute('SELECT * FROM searches')
    print(c.fetchall())

    db.commit()
    db.close()

def get_user_searches(user_id):
    db = sqlite3.connect(DB_FILE)
    c = db.cursor()

    all = []

    c.execute('SELECT movie, imdb_id, timestamp FROM searches WHERE user_id=? ORDER BY timestamp DESC', [user_id])
    searches = c.fetchall()

    for s in searches:
        all.append(s)

    dic = []
    keys = ('title', 'imdb_id', 'timestamp')
    for a in all:
        res = {}
        res = {keys[i] : a[i] for i, _ in enumerate(a)}
        dic.append(res)

    return dic
